import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormActions from "../components/FormActions";
import StatusSelect from "../components/StatusSelect";

const AddSkillCenter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centerCode: "",
    centerType: "",
    courseOrGrade: "",
    duration: "",
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

  const isSchool = formData.centerType === "School";

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
          to="/manage-course"
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
              {/* Center Code */}
              {/* <div className="col-md-4">
                <label className="form-label">
                  Center Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="centerCode"
                  placeholder="CEN-005"
                  value={formData.centerCode}
                  onChange={handleChange}
                  required
                />
              </div> */}

              {/* Center Type */}
              {/* <div className="col-md-4">
                <label className="form-label">
                  Center Type<span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="centerType"
                  value={formData.centerType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="School">School</option>
                  <option value="Skill Center">Skill Center</option>
                </select>
              </div> */}

              {/* Course / Grade */}
              <div className="col-md-4">
                <FormInput
                  label="Course Title"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  placeholder="Enter Course Title"
                  required
                />
              </div>

              {/* Course Duration */}
              {/* <div className="col-md-4">
                <label className="form-label">
                  Course Duration <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="duration"
                  placeholder="e.g. 6 Months"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div> */}

              {/* Status */}
              <div className="col-md-4">
                <StatusSelect formData={formData} handleChange={handleChange}  />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
                 <FormActions
                onCancel={() => navigate("/manage-course")}
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

export default AddSkillCenter;
