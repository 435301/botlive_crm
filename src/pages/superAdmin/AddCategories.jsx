import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateCategory, validateCourse } from "../../utils/validation";

const AddCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "category",
    listUrl: "/category/list",
    getUrl: (id) => `/category/${id}`,
    createUrl: "/category/add",
    updateUrl: (id) => `/category/update/${id}`,
    deleteUrl: (id) => `/category/delete/${id}`,
  });

  const { data, isLoading } = useGetById(id);

  const [formData, setFormData] = useState({
    category: "",
    status: 1,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        category: data.category,
        status: data.status
      });
    }
  }, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCategory(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/superAdmin/manage-category") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/superAdmin/manage-category"),
      });
    }
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
            <h5 className="fw-bold mb-0">Course Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all skill centers
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/superAdmin/manage-course"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Course
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Course </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Course / Grade */}
              <div className="col-md-4">
                <FormInput
                  label="Course Title"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  placeholder="Enter Course Title"
                  mandatory
                  error={errors.courseTitle}
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
                onCancel={() => navigate("/superAdmin/manage-course")}
                saveText="Save"
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

export default AddCategories;
