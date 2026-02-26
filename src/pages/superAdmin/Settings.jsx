import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    prefix: "",
    code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Data:", formData);
    // Call API here
  };

  return (
    <div className="container-fluid">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-settings fs-16"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-0">Settings</h5>
            <p className="sub-text mb-0">Skill Center / School Configuration</p>
          </div>
        </div>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="card shadow-sm p-3">
        <div className="card-body">
          <h4 className="mb-4"> Skill Center / School Configuration</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Prefix */}
              <div className="col-md-5">
                <label className="form-label">
                  Prefix <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="prefix"
                  placeholder="Enter Prefix (Eg: SC, SCH)"
                  value={formData.prefix}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Code */}
              <div className="col-md-5">
                <label className="form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Enter Code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="col-lg-2 mt-5">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
            <div className="row g-3 mt-4">
              <h4 className="mb-4"> Founder</h4>

              {/* Prefix */}
              <div className="col-md-5">
                <label className="form-label">
                  Prefix <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="prefix"
                  placeholder="Enter Prefix (Eg: SC, SCH)"
                  value={formData.prefix}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Code */}
              <div className="col-md-5">
                <label className="form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Enter Code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="col-lg-2 mt-5">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>

            <div className="row g-3 mt-4">
              <h4 className="mb-4"> Trainer</h4>

              {/* Prefix */}
              <div className="col-md-5">
                <label className="form-label">
                  Prefix <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="prefix"
                  placeholder="Enter Prefix (Eg: SC, SCH)"
                  value={formData.prefix}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Code */}
              <div className="col-md-5">
                <label className="form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Enter Code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="col-lg-2 mt-5">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>

            <div className="row g-3 mt-4">
              <h4 className="mb-4"> Student</h4>

              {/* Prefix */}
              <div className="col-md-5">
                <label className="form-label">
                  Prefix <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="prefix"
                  placeholder="Enter Prefix (Eg: SC, SCH)"
                  value={formData.prefix}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Code */}
              <div className="col-md-5">
                <label className="form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Enter Code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="col-lg-2 mt-5">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
