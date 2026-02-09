import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseType: "",
    centerName: "",
    trainer: "",
    course: "",
    enrollmentNumber: "",
    studentName: "",
    gender: "",
    dob: "",
    adharNumber: "",
    studentPhoto: null,
    mobile: "",
    email: "",
    password: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Student Data:", formData);

    // Redirect after save
    navigate("/manage-students");
  };

  return (
    <div className="container-fluid">
      {/* ===== HEADER ===== */}
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Left: Modern Heading */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Student Management</h5>
            <p className="sub-text mb-0">View, edit and manage all students</p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/manage-students"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Students
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Student </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Course Type */}
              <div className="col-md-4">
                <label className="form-label">Course Type</label>
                <select
                  className="form-select"
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              {/* Center Name */}
              <div className="col-md-4">
                <label className="form-label">Skill Center / School</label>
                <select
                  className="form-select"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Center</option>
                  <option value="Center A">Center A</option>
                  <option value="Center B">Center B</option>
                  <option value="Center C">Center C</option>
                </select>
              </div>

              {/* Trainer */}
              <div className="col-md-4">
                <label className="form-label">Trainer</label>
                <select
                  className="form-select"
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Trainer</option>
                  <option value="Trainer 1">Trainer 1</option>
                  <option value="Trainer 2">Trainer 2</option>
                </select>
              </div>

              {/* Course */}
              <div className="col-md-4">
                <label className="form-label">Course</label>
                <select
                  className="form-select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Python">Python</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>

              {/* Enrollment Number */}
              <div className="col-md-4">
                <label className="form-label">Student Enrollment Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="enrollmentNumber"
                  placeholder="Enter enrollment number"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Student Name */}
              <div className="col-md-4">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="studentName"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="col-md-4">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Adhar Number */}
              <div className="col-md-4">
                <label className="form-label">Adhar Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="adharNumber"
                  placeholder="Enter Adhar number"
                  value={formData.adharNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Student Photograph */}
              <div className="col-md-4">
                <label className="form-label">Student Photograph</label>
                <input
                  type="file"
                  className="form-control"
                  name="studentPhoto"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="col-md-4">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="col-md-4">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="col-md-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status */}
              <div className="col-md-4">
                <label className="form-label">Status</label>
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
                onClick={() => navigate("/manage-students")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
