import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateFeedback } from "../../utils/validation";

const AddTrainerFeedback= () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "feedback",
        listUrl: "/feedback/list",
        getUrl: (id) => `/feedback/${id}`,
        createUrl: "/feedback/add",
        updateUrl: (id) => `/feedback/update/${id}`,
        deleteUrl: (id) => `/feedback/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    const [formData, setFormData] = useState({
        message: "",
        subject: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                message: data.message,
                subject: data.subject,
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFeedback(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isEditMode) {
            updateMutation.mutate(
                { id, data: formData },
                { onSuccess: () => navigate("/trainer/manage-feedback") }
            );
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate("/trainer/manage-feedback"),
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
                        <h5 className="fw-bold mb-0">Feedback Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all feedbacks
                        </p>
                    </div>
                </div>

                <Link
                    to="/trainer/manage-feedback"
                    className="btn manage-skills-btn d-flex align-items-center"
                >
                    <i className="ti ti-certificate me-2"></i>
                    Manage Feedback
                </Link>
            </div>

            {/* ===== FORM ===== */}
            <div className="card shadow-sm p-1">
                <div className="card-body">
                    <h5 className="fw-bold mb-4"> {isEditMode ? "Edit Feedback" : "Create Feedback"} </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-4">
                                <FormInput
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter Subject"
                                    error={errors.subject}
                                    mandatory
                                />
                            </div>

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
                        </div>

                        {/* ===== ACTION BUTTONS ===== */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/trainer/manage-feedback")}
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

export default AddTrainerFeedback;
