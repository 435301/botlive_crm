import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import useStates from "../../hooks/useStates";
import useDistricts from "../../hooks/useDistricts";
import useGrades from "../../hooks/useGrades";
import useQualification from "../../hooks/useQualification";
import { validateSuperAdminTrainerForm } from "../../utils/validation";
import FormActions from "../../components/FormActions";
import StatusSelectTrainer from "../../components/StatusSelectTrainer";
import BASE_URL_JOB from "../../config/config";
import useSchools from "../../hooks/useSchools";
import MultiSelectWithCheckbox from "../../components/MultiSelectWithCheckbox";

const AddSuperAdminTrainer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);


    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "trainerInCampass",
        listUrl: "/trainerInCampass/list",
        createUrl: "/trainerInCampass/add",
        getUrl: (id) => `/trainerInCampass/${id}`,
        updateUrl: (id) => `/trainerInCampass/update/${id}`,
        deleteUrl: (id) => `/trainerInCampass/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);
    const [activeTab, setActiveTab] = useState("trainer");

    const [formData, setFormData] = useState({
        centreId: "",
        trainerType: "",
        trainerCode: "",
        fullName: "",
        gender: "",
        dob: "",
        mobile: "",
        email: "",
        password: "",
        qualificationId: "",
        aadharNumber: "",
        panNumber: "",
        stateId: "",
        districtId: "",
        pincode: "",
        area: "",
        dateOfJoining: "",
        bloodGroup: "",
        certificates: [],
        gradeBatchIds: [],
        trainerPhoto: null,
        fatherName: "",
        motherName: "",
        altMobile: "",
        residentialAddress: "",
        permanentAddress: "",
        status: 1,
    });

    const { schoolsData } = useSchools();
    const filteredCentres = formData.trainerType ? schoolsData.filter((school) => school.centerType === Number(formData.trainerType)) : schoolsData;

    useEffect(() => {
        if (data) {
            setFormData({
                centreId: String(data.centreId),
                trainerType: data.trainerType,
                trainerCode: data.trainerCode,
                fullName: data.fullName,
                gender: data.gender,
                dob: String(data.dob),
                mobile: data.mobile,
                email: data.email,
                password: "",
                qualificationId: String(data.qualificationId),
                aadharNumber: data.aadharNumber,
                panNumber: data.panNumber,
                stateId: String(data.state),
                districtId: String(data.district),
                pincode: data.pincode,
                area: data.area,
                dateOfJoining: String(data.dateOfJoining),
                bloodGroup: data.bloodGroup,
                certificates: [],
                gradeBatchIds: String(data.trainerGrades?.map(g => g.gradeBatchId) || []),
                trainerPhoto: [],
                fatherName: data.fatherName,
                motherName: data.motherName,
                altMobile: data.alternateMobile,
                residentialAddress: data.residentialAddress,
                permanentAddress: data.permanentAddress,
                status: data.status
            });
        }
    }, [data]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        let newValue = value;

        if (files) {
            newValue = files;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
            ...(name === "stateId" && { districtId: "" })
        }));
        setErrors((prev) => ({ ...prev, [name]: "", }));
    };

    const convertDate = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateSuperAdminTrainerForm(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "dob" || key === "dateOfJoining") {
                form.append(key, convertDate(value));
            }
            else if (key === "gradeBatchIds") {
                const ids = Array.isArray(value)
                    ? value
                    : typeof value === "string"
                        ? value.split(",")
                        : [];

                ids.forEach((id) => {
                    form.append("gradeBatchIds[]", id);
                });
            }
            else if (key === "certificates" && value) {
                Array.from(value).forEach((file) => {
                    form.append("certificates", file);
                });
            }
            // else if (key === "trainerPhoto" && value) {
            //   Array.from(value).forEach((file) => {
            //     form.append("trainerPhoto", file);
            //   });
            // }
            else if (key === "trainerPhoto" && value instanceof FileList) {
                form.append("trainerPhoto", value[0]);
            }
            else {
                form.append(key, value);
            }
        });


        if (isEditMode) {
            console.log("edit clicked");
            updateMutation.mutate(
                { id, data: form },
                { onSuccess: () => navigate("/superAdmin/manage-trainers") }
            );
        } else {
            createMutation.mutate(form, {
                onSuccess: () => navigate("/superAdmin/manage-trainers"),
            });
        }
    };

    const { states } = useStates();
    const { districts } = useDistricts();
    const { grades } = useGrades(formData.centreType);
    const { qualifications } = useQualification();
    const filteredDistricts = formData.stateId ? districts.filter((district) => Number(district.stateId) === Number(formData.stateId)) : [];


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
                        <h5 className="fw-bold mb-0">Trainer Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all Trainer Management
                        </p>
                    </div>
                </div>

                {/* Right: Manage Skills Button */}
                <Link
                    to="/superAdmin/manage-trainers"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Trainers
                </Link>
            </div>

            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">{isEditMode ? "Edit Trainer" : "Create Trainer"}</h5>
                    {/* ===== TABS ===== */}
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item me-5">
                            <button
                                className={`nav-link ${activeTab === "trainer" ? "active" : ""}`}
                                onClick={() => setActiveTab("trainer")}
                            >
                                Trainer Details
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "other" ? "active" : ""}`}
                                onClick={() => setActiveTab("other")}
                            >
                                Other Details
                            </button>
                        </li>
                    </ul>

                    <form onSubmit={handleSubmit}>
                        {/* ================= TRAINER DETAILS TAB ================= */}
                        {activeTab === "trainer" && (
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <FormSelect
                                        label="Project Type"
                                        name="trainerType"
                                        value={formData.trainerType}
                                        onChange={handleChange}
                                        mandatory
                                        options={[
                                            { label: "Skill Development", value: 1 },
                                            { label: "AI & STEM Learning", value: 2 },
                                            { label: "Education Development", value: 3 },
                                            { label: "Innovation & Entrepreneurs", value: 4 },
                                            { label: "Community Development", value: 5 },
                                        ]}
                                        error={errors.trainerType}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormSelect
                                        label="Centre Id"
                                        name="centreId"
                                        value={formData.centreId}
                                        onChange={handleChange}
                                        options={filteredCentres?.map((school) => ({
                                            label: school.centerName,
                                            value: String(school.id),
                                        }))}
                                        error={errors.centreId}
                                        mandatory
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Trainer Code"
                                        name="trainerCode"
                                        placeholder="TRN-001"
                                        value={formData.trainerCode}
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.trainerCode}
                                    />

                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Trainer Full Name"
                                        name="fullName"
                                        placeholder="Enter full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.fullName}
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
                                        // value={formatToInputDate(formData.dob)}
                                        value={formData.dob}
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.dob}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Aadhaar Number"
                                        name="aadharNumber"
                                        value={formData.aadharNumber}
                                        placeholder="12-digit Aadhaar"
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.aadharNumber}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="PAN Number"
                                        name="panNumber"
                                        value={formData.panNumber}
                                        placeholder="ABCDE1234F"
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.panNumber}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        type="tel"
                                        label="Mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        placeholder="Mobile number"
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.mobile}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Email address"
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.email}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="password"
                                        onChange={handleChange}
                                        mandatory={!isEditMode}
                                        error={!isEditMode && errors.password}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormSelect
                                        label="Qualification"
                                        name="qualificationId"
                                        value={formData.qualificationId}
                                        onChange={handleChange}
                                        options={
                                            qualifications.map((qualification) => ({
                                                label: qualification.qualification,
                                                value: String(qualification.id),
                                            }))
                                        }
                                        error={errors.qualificationId}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <MultiSelectWithCheckbox
                                        label="Grade"
                                        name="gradeBatchIds"
                                        value={formData.gradeBatchIds}
                                        onChange={handleChange}
                                        options={grades.map((grade) => ({
                                            label: grade.gradeBatch,
                                            value: grade.id
                                        }))}
                                        error={errors.gradeBatchIds}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        type="date"
                                        label="Date of Joining"
                                        name="dateOfJoining"
                                        // value={formatToInputDate(formData.dateOfJoining)}
                                        value={formData.dateOfJoining}
                                        onChange={handleChange}
                                        mandatory
                                        error={errors.dateOfJoining}
                                    />
                                </div>


                                <div className="col-md-4">
                                    <FormSelect
                                        label="Blood Group"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        mandatory
                                        options={[
                                            { label: "A+", value: "A+" },
                                            { label: "A-", value: "A-" },
                                            { label: "B+", value: "B+" },
                                            { label: "B-", value: "B-" },
                                            { label: "O+", value: "O+" },
                                            { label: "O-", value: "O-" },
                                            { label: "AB+", value: "AB+" },
                                            { label: "AB-", value: "AB-" },

                                        ]}
                                        error={errors.bloodGroup}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormSelect
                                        label="State"
                                        name="stateId"
                                        value={formData.stateId}
                                        onChange={handleChange}
                                        options={
                                            states.map((state) => ({
                                                label: state.stateName,
                                                value: String(state.id),
                                            }))
                                        }
                                        error={errors.stateId}
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
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Area "
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="Enter Area"
                                        error={errors.area}
                                        mandatory
                                    />
                                </div>


                                <div className="col-md-4">
                                    <FormInput
                                        label="Pincode "
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Enter Pincode"
                                        error={errors.pincode}
                                        mandatory
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        type="file"
                                        label="Trainer Photo"
                                        name="trainerPhoto"
                                        onChange={handleChange}
                                        mandatory={!isEditMode}
                                        multiple
                                        accept="image/*"
                                        error={!isEditMode && errors.trainerPhoto}
                                    />
                                    {isEditMode && data?.photo && (
                                        <img
                                            src={`${BASE_URL_JOB}${data.photo}`}
                                            width="80"
                                            alt="trainer"
                                        />
                                    )}

                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Certificates"
                                        name="certificates"
                                        type="file"
                                        placeholder="certificates"
                                        onChange={handleChange}
                                        mandatory={!isEditMode}
                                        multiple
                                        accept="application/pdf"
                                        error={!isEditMode && errors?.certificates}
                                    />
                                    {isEditMode && data?.certificates?.length > 0 && (
                                        <div className="mt-2 d-flex gap-2 flex-wrap">
                                            {data.certificates.map((cert, index) => (
                                                <a
                                                    key={index}
                                                    href={`${BASE_URL_JOB}${cert.certificate}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View certificates
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}

                        {/* ================= OTHER DETAILS TAB ================= */}
                        {activeTab === "other" && (
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <FormInput
                                        label="Father Name "
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleChange}
                                        placeholder="Enter father name"
                                        error={errors.fatherName}
                                        mandatory
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Mother Name "
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleChange}
                                        placeholder="Enter mother name"
                                        error={errors.motherName}
                                        mandatory
                                    />
                                </div>

                                <div className="col-md-4">
                                    <FormInput
                                        label="Alternate Mobile "
                                        name="altMobile"
                                        value={formData.altMobile}
                                        onChange={handleChange}
                                        placeholder="Alternate Mobile"
                                        error={errors.altMobile}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Residential Address<span className="text-danger"> *</span></label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        name="residentialAddress"
                                        placeholder="Residential Address"
                                        value={formData.residentialAddress}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors && <div className="text-danger small">{errors.residentialAddress}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Permanent Address<span className="text-danger"> *</span></label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        name="permanentAddress"
                                        placeholder="Permanent Address"
                                        value={formData.permanentAddress}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors && <div className="text-danger small">{errors.permanentAddress}</div>}
                                </div>

                                <div className="col-md-4">
                                    <StatusSelectTrainer name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
                                </div>
                            </div>
                        )}

                        {/* ===== ACTIONS ===== */}
                        <div className="mt-4 text-center">
                            {activeTab === "trainer" ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-primary me-2"
                                        onClick={() => setActiveTab("other")}
                                    >
                                        Next
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2y"
                                        onClick={() => navigate("/superAdmin/manage-trainers")}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <FormActions
                                    onCancel={() => navigate("/superAdmin/manage-trainers")}
                                    saveText={isEditMode ? updateMutation.isPending ? "Saving..." : "Save" : createMutation.isPending ? "Saving..." : "Save"}
                                    cancelText="Cancel"
                                    disabled={isLoading}
                                />
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSuperAdminTrainer;
