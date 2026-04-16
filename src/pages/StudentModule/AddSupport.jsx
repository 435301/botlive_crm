import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateSupport } from "../../utils/validation";
import { FormSelect } from "react-bootstrap";

const AddSupport = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "support",
        listUrl: "/support/list",
        getUrl: (id) => `/support/${id}`,
        createUrl: "/support/add",
        updateUrl: (id) => `/support/update/${id}`,
        deleteUrl: (id) => `/support/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    const [formData, setFormData] = useState({
        message: "",
        priority: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                message: data.message,
                priority: data.priority,
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateSupport(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isEditMode) {
            updateMutation.mutate(
                { id, data: formData },
                { onSuccess: () => navigate("/student/manage-support") }
            );
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate("/student/manage-support"),
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
                        <h5 className="fw-bold mb-0">Support Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all support tickets
                        </p>
                    </div>
                </div>

                <Link
                    to="/student/manage-support"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Support
                </Link>
            </div>

            {/* ===== FORM ===== */}
            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4"> {isEditMode ? "Edit Support" : "Create Support"} </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormInput
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter Message"
                                    error={errors.message}
                                    mandatory
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    type="number"
                                    label="Priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    options={[
                                        { label: "High", value: 1 },
                                        { label: "Medium", value: 2 },
                                        { label: "Low", value: 3 },
                                    ]}
                                    error={errors.priority}
                                    mandatory
                                />
                            </div>
                        </div>

                        {/* ===== ACTION BUTTONS ===== */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/student/manage-support")}
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

export default AddSupport;
