import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import FormInput from "../../components/FormInput";
import { useCrud } from "../../hooks/useCrud";
import { validateActivity } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import useSchools from "../../hooks/useSchools";
import BASE_URL_JOB from "../../config/config";

const AddActivity = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "activity",
        listUrl: "/activity/list",
        getUrl: (id) => `/activity/${id}`,
        createUrl: "/activity/add",
        updateUrl: (id) => `/activity/update/${id}`,
        deleteUrl: (id) => `/activity/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    const [formData, setFormData] = useState({
        activityTitle: "",
        description: "",
        centreId: "",
        centreType: "",
        photos: [],
        videos: [],
        status: 1,
    });
    const [existingFiles, setExistingFiles] = useState({
        photos: [],
        videos: []
    });

    const { schoolsData } = useSchools();
    const filteredCentres = formData.centreType ? schoolsData.filter((school) => school.centerType === Number(formData.centreType)) : schoolsData;
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                activityTitle: String(data.activityTitle),
                description: data.description,
                centreId: String(data.centreId),
                centreType: data.centreType,
                status: data.status,
            });
            setExistingFiles({
                photos: data.photos || [],
                videos: data.videos || []
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: Array.from(files),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "centreType" ? Number(value) : value,
                ...(name === "centreType" && { centreId: "" })
            }));

        }
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // FINAL SAVE
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateActivity(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const payload = new FormData();
        payload.append("activityTitle", formData.activityTitle);
        payload.append("description", formData.description);
        payload.append("centreId", formData.centreId);
        payload.append("centreType", formData.centreType);
        payload.append("status", formData.status);

        if (formData.photos?.length > 0) {
            for (let i = 0; i < formData.photos.length; i++) {
                payload.append("photos", formData.photos[i]);
            }
        }

        // Multiple videos
        if (formData.videos?.length > 0) {
            for (let i = 0; i < formData.videos.length; i++) {
                payload.append("videos", formData.videos[i]);
            }
        }
        if (isEditMode) {
            updateMutation.mutate(
                { id, data: payload },
                { onSuccess: () => navigate("/superAdmin/manage-activities") }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => navigate("/superAdmin/manage-activities"),
            });
        }
    };

    return (
        <div className="container-fluid">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Activities Management</h5>
                    <p className="mb-0">View, edit and manage all activities</p>
                </div>

                <Link to="/superAdmin/manage-activities" className="btn btn-outline-primary">
                    Manage Activities
                </Link>
            </div>

            {/* FORM */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">Create Activitiy</h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormSelect
                                    label="Project Type"
                                    name="centreType"
                                    value={formData.centreType}
                                    onChange={handleChange}
                                    mandatory
                                    options={[
                                        { label: "Skill Development", value: 1 },
                                        { label: "AI & STEM Learning", value: 2 },
                                        { label: "School Education", value: 3 },
                                        { label: "Innovation & Entrepreneurship", value: 4 },
                                        { label: "Community Development", value: 5 },
                                    ]}
                                    error={errors.centreType}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Centre"
                                    name="centreId"
                                    value={formData.centreId}
                                    onChange={handleChange}
                                    options={filteredCentres?.map((centre) => ({
                                        label: centre.centerName,
                                        value: String(centre.id),
                                    }))}
                                    error={errors.centreId}
                                />
                            </div>


                            <div className="col-md-4">
                                <FormInput
                                    label="Activity Title"
                                    name="activityTitle"
                                    value={formData.activityTitle}
                                    onChange={handleChange}
                                    placeholder="Enter Activity Title"
                                    mandatory
                                    error={errors.activityTitle}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Description<span className="text-danger"> *</span></label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="description"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                                {errors && <div className="text-danger small">{errors.description}</div>}
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="file"
                                    label="Photos"
                                    name="photos"
                                    onChange={handleChange}
                                    mandatory
                                    multiple
                                    accept="image/*"
                                    error={!isEditMode && errors.photos}
                                />
                                {isEditMode && existingFiles.photos?.length > 0 && (
                                    <div className="mt-2 d-flex gap-2 flex-wrap">
                                        {existingFiles.photos.map((photo, index) => (
                                            <a
                                                key={index}
                                                href={`${BASE_URL_JOB}${photo.videoPhoto}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={`${BASE_URL_JOB}${photo.videoPhoto}`}
                                                    alt="activity"
                                                    width="80"
                                                    height="80"
                                                    style={{ objectFit: "cover", borderRadius: "5px", cursor: "pointer" }}
                                                />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="file"
                                    label="Videos"
                                    name="videos"
                                    onChange={handleChange}
                                    mandatory
                                    accept="video/*"
                                    multiple
                                    error={!isEditMode && errors.videos}
                                />
                                {isEditMode && existingFiles.videos?.length > 0 && (
                                    <div className="mt-2">
                                        {existingFiles.videos.map((video, index) => (
                                             <a
                                                key={index}
                                                href={`${BASE_URL_JOB}${video.videoPhoto}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                            <video key={index} width="120" controls>
                                                <source
                                                    src={`${BASE_URL_JOB}${video.videoPhoto}`}
                                                    type="video/mp4"
                                                />
                                            </video>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-4">
                                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/superAdmin/manage-activities")}
                                saveText={isEditMode ? updateMutation.isPending ? "Saving..." : "Save" : createMutation.isPending ? "Saving..." : "Save" }
                                cancelText="Cancel"
                                disabled={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddActivity;
