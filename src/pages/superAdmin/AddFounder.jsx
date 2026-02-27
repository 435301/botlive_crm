import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateFounder } from "../../utils/validation";

const AddFounder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "founder",
        listUrl: "/founder/list",
        getUrl: (id) => `/founder/${id}`,
        createUrl: "/founder/add",
        updateUrl: (id) => `/founder/update/${id}`,
        deleteUrl: (id) => `/founder/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        status: 1,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                password: "",
                status: data.status,
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFounder(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isEditMode) {
            updateMutation.mutate(
                { id, data: formData },
                { onSuccess: () => navigate("/superAdmin/manage-founders") }
            );
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate("/superAdmin/manage-founders"),
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
                        <h5 className="fw-bold mb-0">Founder Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all founders
                        </p>
                    </div>
                </div>

                {/* Right: Manage Skills Button */}
                <Link
                    to="/superAdmin/manage-founders"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Founder
                </Link>
            </div>

            {/* ===== FORM ===== */}
            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">{isEditMode ? "Edit Founder" : "Create Founder"} </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter the name"
                                    error={errors.name}
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
                                <FormInput
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={
                                        isEditMode
                                            ? "Leave blank to keep existing password"
                                            : "Create a password"
                                    }
                                    error={errors.password}
                                    mandatory={!isEditMode}
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
                                onCancel={() => navigate("/superAdmin/manage-founders")}
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

export default AddFounder;
