import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateVolunteer } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import useQualification from "../../hooks/useQualification";
import useOccupation from "../../hooks/useOccupation";
import useDistricts from "../../hooks/useDistricts";
import useStates from "../../hooks/useStates";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import useVolunteerSkills from "../../hooks/useVolunteerSkills";
import useAreaOfInterest from "../../hooks/useAreaOfInterests";
import MultiSelectWithCheckbox from "../../components/MultiSelectWithCheckbox";
import BASE_URL_JOB from "../../config/config";

const AddVolunteer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "volunteer",
        listUrl: "/volunteer/list",
        getUrl: (id) => `/volunteer/${id}`,
        createUrl: "/volunteer/add",
        updateUrl: (id) => `/volunteer/update/${id}`,
        deleteUrl: (id) => `/volunteer/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);
    const [formData, setFormData] = useState({
        volunteerName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        volunteerPhoto: "",
        qualificationId: "",
        occupationId: "",
        aadharNumber: "",
        stateId: "",
        districtId: "",
        area: "",
        volunteerSkillIds: "",
        areaOfInterestIds: "",
        experience: "",
        status: 1,
    });
    const [errors, setErrors] = useState({});

    const { qualifications } = useQualification();
    const { occupations } = useOccupation();
    const { districts } = useDistricts();
    const { states } = useStates();
    const filteredDistricts = formData.stateId ? districts.filter((district) => Number(district.stateId) === Number(formData.stateId)) : [];
    const { volunteerSkills } = useVolunteerSkills();
    const { areaOfInterest } = useAreaOfInterest();

    useEffect(() => {
        if (data) {
            setFormData({
                volunteerName: data.volunteerName,
                email: data.email,
                mobile: data.volunteerMobile,
                gender: data.gender,
                dob: data.dob,
                volunteerPhoto: data.photo,
                qualificationId: data.qualificationId ? String(data.qualificationId) : "",
                occupationId: data.occupationId ? String(data.occupationId) : "",
                aadharNumber: data.aadharNumber || "",
                stateId: data.stateId ? String(data.stateId) : "",
                districtId: data.districtId ? String(data.districtId) : "",
                area: data.area,
                volunteerSkillIds: data.volunteerSkillsIds ? data.volunteerSkillsIds.split(",").map(Number) : [],
                areaOfInterestIds: data.areaOfInterestIds ? data.areaOfInterestIds.split(",").map(Number) : [],
                experience: data.experience,
                status: data.status
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateVolunteer(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const dataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                if (key === "dob") {
                    dataToSend.append("dob", formatDateToDDMMYYYY(formData.dob));
                } else {
                    dataToSend.append(key, formData[key]);
                }
            }
        });

        if (isEditMode) {
            updateMutation.mutate(
                { id, data: dataToSend },
                { onSuccess: () => navigate("/superAdmin/manage-volunteer") }
            );
        } else {
            createMutation.mutate(dataToSend, {
                onSuccess: () => navigate("/superAdmin/manage-volunteer"),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "volunteerPhoto") {
            setFormData((prev) => ({
                ...prev,
                volunteerPhoto: e.target.files[0],
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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
                        <h5 className="fw-bold mb-0">Volunteer Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all volunteers
                        </p>
                    </div>
                </div>

                {/* Right: Manage Skills Button */}
                <Link
                    to="/superAdmin/manage-volunteer"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Volunteer
                </Link>
            </div>

            {/* ===== FORM ===== */}
            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">{isEditMode ? "Edit Volunteer" : "Create Volunteer"} </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormInput
                                    label="Vounteer Name"
                                    name="volunteerName"
                                    value={formData.volunteerName}
                                    onChange={handleChange}
                                    placeholder="Enter the volunteer name"
                                    error={errors.volunteerName}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter the email"
                                    error={errors.email}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="number"
                                    label="Mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter the mobile"
                                    error={errors.mobile}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Male", value: 1 },
                                        { label: "Female", value: 2 },
                                        { label: "Other", value: 3 },
                                    ]}
                                    error={errors.gender}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    type="date"
                                    label="Date of Birth"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    error={errors.dob}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label"> Photograph Upload</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="volunteerPhoto"
                                    accept="image/*"
                                    onChange={handleChange}
                                    error={errors.volunteerPhoto}
                                />
                                {errors && <div className="text-danger small">{errors.volunteerPhoto}</div>}
                                {formData.volunteerPhoto && typeof formData.volunteerPhoto === "string" && (
                                    <img
                                        src={`${BASE_URL_JOB}${formData.volunteerPhoto}`}
                                        width="120"
                                        className="mb-2"
                                        alt="volunteerPhoto"
                                    />
                                )}
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    label="Aadhar Number"
                                    name="aadharNumber"
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    error={errors.aadharNumber}
                                    placeholder="Enter Aadhar number"
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Qualification"
                                    name="qualificationId"
                                    value={formData.qualificationId}
                                    onChange={handleChange}
                                    options={qualifications.map((qualification) => ({
                                        label: qualification.qualification,
                                        value: String(qualification.id)
                                    }))}
                                    error={errors.qualificationId}
                                />

                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Occupation"
                                    name="occupationId"
                                    value={formData.occupationId}
                                    onChange={handleChange}
                                    options={occupations.map((occupation) => ({
                                        label: occupation.occupation,
                                        value: String(occupation.id)
                                    }))}
                                    error={errors.occupationId}
                                />
                            </div>


                            <div className="col-md-4">
                                <FormSelect
                                    label="State"
                                    name="stateId"
                                    value={formData.stateId}
                                    onChange={handleChange}
                                    options={states.map((state) => ({
                                        label: state.stateName,
                                        value: String(state.id)
                                    }))}
                                    error={errors.stateId}
                                    mandatory
                                />
                            </div>


                            <div className="col-md-4">
                                <FormSelect
                                    label="District"
                                    name="districtId"
                                    value={formData.districtId}
                                    onChange={handleChange}
                                    options={filteredDistricts.map((district) => ({
                                        label: district.districtName,
                                        value: String(district.id)
                                    }))}
                                    error={errors.districtId}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormInput
                                    label="Village/Town"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    error={errors.area}
                                    placeholder="Enter village/town"
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <MultiSelectWithCheckbox
                                    label="Volunteer Skill"
                                    name="volunteerSkillIds"
                                    value={formData.volunteerSkillIds}
                                    onChange={handleChange}
                                    options={volunteerSkills.map((skill) => ({
                                        label: skill.skill,
                                        value: skill.id
                                    }))}
                                    error={errors.volunteerSkillIds}
                                    required
                                />
                            </div>


                            <div className="col-md-4">
                                <MultiSelectWithCheckbox
                                    label="Area of Interest"
                                    name="areaOfInterestIds"
                                    value={formData.areaOfInterestIds}
                                    onChange={handleChange}
                                    options={areaOfInterest.map((interest) => ({
                                        label: interest.title,
                                        value: interest.id
                                    }))}
                                    error={errors.areaOfInterestIds}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    options={[
                                        { label: "1", value: "1" },
                                        { label: "2", value: "2" },
                                        { label: "2", value: "3" },
                                        { label: "4", value: "4" },
                                        { label: "5", value: "5" },
                                        { label: "6", value: "6" },
                                        { label: "7", value: "7" },
                                        { label: "8", value: "8" },
                                        { label: "9", value: "9" },
                                        { label: "10", value: "10" },
                                    ]}
                                    error={errors.gender}
                                />
                            </div>

                            {/* Status */}
                            <div className="col-md-4">
                                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
                            </div>
                        </div>

                        {/* ===== ACTION BUTTONS ===== */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/superAdmin/manage-volunteer")}
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

export default AddVolunteer;
