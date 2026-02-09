import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddSkillCenter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centerCode: "",
    name: "",
    centerType: "",
    address: "",
    contactPerson: "",
    mobile: "",
    email: "",
    password: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Skill Center Data:", formData);
    navigate("/manage-skill-centers");
  };

  return (
    <div className="container-fluid">
      {/* ===== HEADER ===== */}
      {/* Modern heading with skill icon */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Left: Modern Heading */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Skill Center Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all skill centers
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/manage-skills"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Skill Center
        </Link>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Skill Center Management</h5>
       
      </div> */}

      {/* ===== FORM CARD ===== */}
      <div className="card shadow-sm p-2">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Skill Center </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Center Code */}
              <div className="col-md-4">
                <label className="form-label">
                  Center Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="centerCode"
                  placeholder="Enter center code (e.g. CEN-005)"
                  value={formData.centerCode}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Center Name */}
              <div className="col-md-4">
                <label className="form-label">
                  Skill Center Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter skill center name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Center Type */}
              <div className="col-md-4">
                <label className="form-label">
                  Skill  Center Type{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="centerType"
                  value={formData.centerType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select center type
                  </option>
                  <option value="Skill Center">Skill Center </option>
                  <option value="School">School</option>
                </select>
              </div>

              {/* Contact Person */}
              <div className="col-md-4">
                <label className="form-label">
              Skill Center     Contact Person Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactPerson"
                  placeholder="Enter contact person name"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Mobile */}
              <div className="col-md-4">
                <label className="form-label">
               Skill Center    Mobile <span className="text-danger">*</span>
                </label>
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

              {/* Email */}
              <div className="col-md-4">
                <label className="form-label">
                Skill Center   Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email address"
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
                  placeholder="Create a password"
                  value={formData.password}
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
            {/* Address */}
            <div className="col-md-12 mt-3">
              <label className="form-label"> Skill Center Address</label>
              <textarea
                className="form-control"
                rows="2"
                name="address"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <button type="reset" className="btn btn-outline-secondary me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>
                Save Skill Center
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillCenter;
