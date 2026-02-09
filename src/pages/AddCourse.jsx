import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <div className="col-md-4">
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
              </div>

              {/* Center Type */}
              <div className="col-md-4">
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
              </div>

              {/* Course / Grade */}
              <div className="col-md-4">
                <label className="form-label">
                  {isSchool ? "Grade" : "Course"}{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="courseOrGrade"
                  value={formData.courseOrGrade}
                  onChange={handleChange}
                  required
                  disabled={!formData.centerType}
                >
                  <option value="">
                    Select <span className="text-danger">*</span>{" "}
                    {isSchool ? "Grade" : "Course"}
                  </option>

                  {isSchool ? (
                    <>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </>
                  ) : (
                    <>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="UI/UX">UI / UX</option>
                      <option value="Python">Python</option>
                    </>
                  )}
                </select>
              </div>

              {/* Course Duration */}
              <div className="col-md-4">
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
              </div>

              {/* Status */}
              <div className="col-md-4">
                <label className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate("/manage-course")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillCenter;
