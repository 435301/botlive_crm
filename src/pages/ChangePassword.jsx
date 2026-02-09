import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleToggle = (field) => {
  //   setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Change Password Data:", formData);
    // Call API here
    navigate("/dashboard"); // Redirect after success
    showPassword((""));
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
            <h5 className="fw-bold mb-0">Change Password</h5>
            <p className="sub-text mb-0">
              Update your account password securely
            </p>
          </div>
        </div>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="card shadow-sm p-2">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Current Password */}
              <div className="col-md-4">
                <label className="form-label">Current Password<span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    className="form-control"
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleToggle("current")}
                  >
                    {showPassword.current ? "Hide" : "Show"}
                  </button> */}
                </div>
              </div>

              {/* New Password */}
              <div className="col-md-4">
                <label className="form-label">New Password<span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    className="form-control"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleToggle("new")}
                  >
                    {showPassword.new ? "Hide" : "Show"}
                  </button> */}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-md-4">
                <label className="form-label">Confirm Password<span className="text-danger">*</span></label>
                <div className="input-group">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleToggle("confirm")}
                  >
                    {showPassword.confirm ? "Hide" : "Show"}
                  </button> */}
                </div>
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <button type="reset" className="btn btn-outline-secondary me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
