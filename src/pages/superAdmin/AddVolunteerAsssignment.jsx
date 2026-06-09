import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateVolunteerActivity } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import useVolunteer from "../../hooks/useVolunteer";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";

const AddVolunteerAssignment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "volunteerActivity",
        listUrl: "/volunteerActivity/list",
        getUrl: (id) => `/volunteerActivity/${id}`,
        createUrl: "/volunteerActivity/add",
        updateUrl: (id) => `/volunteerActivity/update/${id}`,
        deleteUrl: (id) => `/volunteerActivity/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);
    const [formData, setFormData] = useState({
        volunteerId: "",
        activityName: "",
        projectType: "",
        assignedDate: "",
        location: "",
        coordinator: "",
        startDate: "",
        endDate: "",
        remarks: "",
        status: 1,
    });
    const [errors, setErrors] = useState({});

    const { volunteer } = useVolunteer();

    useEffect(() => {
        if (data) {
            setFormData({
                volunteerId: data.volunteerId,
                activityName: data.activityName,
                projectType: data.projectType,
                assignedDate: data.assignedDate,
                location: data.location,
                coordinator: data.coordinator,
                startDate: data.startDate,
                endDate: data.endDate,
                remarks: data.remarks,
                status: data.status,
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateVolunteerActivity(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const payload = {
            ...formData,
            assignedDate: formatDateToDDMMYYYY(formData.assignedDate),
            startDate: formatDateToDDMMYYYY(formData.startDate),
            endDate: formatDateToDDMMYYYY(formData.endDate),
        };

        if (isEditMode) {
            updateMutation.mutate(
                { id, data: payload },
                { onSuccess: () => navigate("/superAdmin/manage-volunteer-assignment") }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => navigate("/superAdmin/manage-volunteer-assignment"),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "", }));
    };

    return (
        <div className="container-fluid">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Left: Modern Heading */}
                <div className="d-flex align-items-center heading-with-icon">
                    <div className="icon-badge">
                        <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
                    </div>
                    <div>
                        <h5 className="fw-bold mb-0">Volunteer Activity Assignment</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all volunteer activities
                        </p>
                    </div>
                </div>

                {/* Right: Manage Skills Button */}
                <Link
                    to="/superAdmin/manage-volunteer-assignment"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Volunteer Activity
                </Link>
            </div>

            {/* ===== FORM ===== */}
            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">{isEditMode ? "Edit Volunteer Activity" : "Create Volunteer Activity"} </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormSelect
                                    label="Vounteer Name"
                                    name="volunteerId"
                                    value={formData.volunteerId}
                                    options={volunteer.map((volunteer) => ({
                                        label: volunteer.volunteerName,
                                        value: volunteer.id
                                    })
                                    )}
                                    onChange={handleChange}
                                    error={errors.volunteerId}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    label="Activity Name"
                                    name="activityName"
                                    value={formData.activityName}
                                    onChange={handleChange}
                                    placeholder="Enter the Activity Name"
                                    error={errors.activityName}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label=" Project Type"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    error={errors.projectType}
                                    options={[
                                        { label: "Skill Development", value: 1 },
                                        { label: "AI & STEM Learning", value: 2 },
                                        { label: "School Education ", value: 3 },
                                        { label: "Innovation & Entrepreneurship", value: 4 },
                                        { label: "Community Development", value: 5 },
                                    ]}
                                    mandatory
                                />
                            </div>


                            <div className="col-md-4">
                                <FormInput
                                    type="date"
                                    label="Assigned Date"
                                    name="assignedDate"
                                    value={formData.assignedDate}
                                    onChange={handleChange}
                                    error={errors.assignedDate}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    error={errors.location}
                                    placeholder="Enter the location"
                                    mandatory
                                />
                            </div>


                            <div className="col-md-4">
                                <FormInput
                                    label="Coordinator"
                                    name="coordinator"
                                    value={formData.coordinator}
                                    onChange={handleChange}
                                    error={errors.coordinator}
                                    placeholder="Enter coordinator "
                                    mandatory
                                />
                            </div>


                            <div className="col-md-4">
                                <FormInput
                                    type="date"
                                    label="Start Date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    error={errors.startDate}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="date"
                                    label="End Date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    error={errors.endDate}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    label="Remarks"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    error={errors.remarks}
                                />
                            </div>

                            {/* Status */}
                            <div className="col-md-4">
                                <FormSelect
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    error={errors.status}
                                    options={[
                                        { label: "Select Status", value: 0 },
                                        { label: "New", value: 1 },
                                        { label: "In Progress", value: 2 },
                                        { label: "Completed", value: 3 },
                                    ]}
                                    mandatory
                                />
                            </div>
                        </div>

                        {/* ===== ACTION BUTTONS ===== */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/superAdmin/manage-volunteer-assignment")}
                                saveText={createMutation.isPending ? "Saving..." : "Save"}
                                cancelText="Cancel"
                                disableSave={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteerAssignment;
