import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import { useCrud } from "../../hooks/useCrud";
import { validateGrade } from "../../utils/validation";

const AddGrades = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "grade",
    listUrl: "/grade/list",
    getUrl: (id) => `/grade/${id}`,
    createUrl: "/grade/add",
    updateUrl: (id) => `/grade/update/${id}`,
    deleteUrl: (id) => `/grade/delete/${id}`,
  });

  const { data, isLoading } = useGetById(id);
  const [formData, setFormData] = useState({
    centreType: "",
    gradeBatch: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        centreType: data.centreType,
        gradeBatch: data.gradeBatch,
        status: data.status,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateGrade(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/superAdmin/manage-grades") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/superAdmin/manage-grades"),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  const isSchool = formData.centreType === 1;

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
            <h5 className="fw-bold mb-0">Grades/Skill Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all grades/skill
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/superAdmin/manage-grades"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Grades
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">{isEditMode ? "Edit Grades" : "Create Grades"}</h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* Center Type */}
              <div className="col-md-4">
                <FormSelect
                  label="Centre Type"
                  name="centreType"
                  value={formData.centreType}
                  onChange={handleChange}
                  mandatory
                  options={[
                    { label: "Skill Development", value: 1 },
                    { label: "AI & STEM Learning", value: 2 },
                    { label: "Education Development", value: 3 },
                    { label: "Innovation & Entrepreneurs", value: 4 },
                    { label: "Community Development", value: 5 },
                  ]}
                  error={errors.centreType}
                />
              </div>

              {/* Course / Grade */}
              <div className="col-md-4">
                <FormInput
                  label={isSchool ? "Grade " : "skill"}
                  name="gradeBatch"
                  value={formData.gradeBatch}
                  onChange={handleChange}
                  placeholder={`Enter ${isSchool ? "Grade" : "Skill"} Name`}
                  mandatory
                  error={errors.gradeBatch}
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
                onCancel={() => navigate("/superAdmin/manage-grades")}
                saveText={isLoading ? "Saving" : "Save"}
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

export default AddGrades;
