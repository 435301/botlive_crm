import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormActions from "../components/FormActions";
import StatusSelect from "../components/StatusSelect";
import FormSelect from "../components/FormSelect";
import FormInput from "../components/FormInput";

const AddGrades = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centerType: "",
    batch: "",
    grade: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Course Data:", formData);
    navigate("/manage-course");
  };

  const isSchool = formData.centerType === "1";

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
            <h5 className="fw-bold mb-0">Grades/Batches Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all grades/batches
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/manage-grades"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Grades
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Grades </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">


              {/* Center Type */}
              <div className="col-md-4">
                <FormSelect
                  label="Center Type"
                  name="centerType"
                  value={formData.centerType}
                  onChange={handleChange}
                  required
                  options={[
                    { label: "1", value: "School" },
                    { label: "2", value: "Skill Center" },
                  ]}
                />
              </div>

              {/* Course / Grade */}
              <div className="col-md-4">
                <FormInput
                  label={isSchool ? "School Name" : "Skill Center Name"}
                  name={isSchool ? "grade" : "batch"}
                  value={isSchool ? formData.grade : formData.batch}
                  onChange={handleChange}
                  placeholder={`Enter ${isSchool ? "School" : "Skill Center"} Name`}
                  required
                />

              </div>

              {/* Status */}
              <div className="col-md-4">
                <StatusSelect formData={formData} handleChange={handleChange} />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">

              <FormActions
                onCancel={() => navigate("/manage-grades")}
                saveText="Save"
                cancelText="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGrades;
