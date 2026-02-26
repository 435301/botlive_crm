import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddTrainer = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("trainer");

  const [formData, setFormData] = useState({
    centerType: "",
    centerId: "",
    trainerCode: "",
    fullName: "",
    gender: "",
    dob: "",
    aadhaar: "",
    pan: "",
    photo: null,
    mobile: "",
    email: "",
    password: "",
    location: "",
    qualification: "",
    certificates: [],
    joiningDate: "",
    resignDate: "",
    bloodGroup: "",
    status: "Working",

    fatherName: "",
    motherName: "",
    altMobile: "",
    residentialAddress: "",
    permanentAddress: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trainer Data:", formData);
    navigate("/manage-trainers");
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
            <h5 className="fw-bold mb-0">Trainer Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all Trainer Management
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/manage-trainers"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Trainers
        </Link>
      </div>

      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Trainer</h5>
          {/* ===== TABS ===== */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item me-5">
              <button
                className={`nav-link ${activeTab === "trainer" ? "active" : ""}`}
                onClick={() => setActiveTab("trainer")}
              >
                Trainer Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "other" ? "active" : ""}`}
                onClick={() => setActiveTab("other")}
              >
                Other Details
              </button>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            {/* ================= TRAINER DETAILS TAB ================= */}
            {activeTab === "trainer" && (
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Center Type</label>
                  <select
                    className="form-select"
                    name="centerType"
                    value={formData.centerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Center Type</option>
                    <option value="Skill Center">Skill Center</option>
                    <option value="School">School</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">School / Skill Center</label>
                  <select
                    className="form-select"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Center</option>
                    <option value="CEN001">Hyderabad Skill Center</option>
                    <option value="SCH001">Green Valley School</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Trainer Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trainerCode"
                    placeholder="TRN-001"
                    value={formData.trainerCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Trainer Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="aadhaar"
                    placeholder="12-digit Aadhaar"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">PAN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pan"
                    placeholder="ABCDE1234F"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Trainer Photo</label>
                  <input type="file" className="form-control" name="photo" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    placeholder="Mobile number"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qualification"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Certificates</label>
                  <input
                    type="file"
                    className="form-control"
                    name="certificates"
                    multiple
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Date of Joining</label>
                  <input
                    type="date"
                    className="form-control"
                    name="joiningDate"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Date of Resigning</label>
                  <input
                    type="date"
                    className="form-control"
                    name="resignDate"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Blood Group</label>
                  <select className="form-select" name="bloodGroup">
                    <option value="">Select</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status">
                    <option value="Working">Working</option>
                    <option value="Resigned">Resigned</option>
                  </select>
                </div>
              </div>
            )}

            {/* ================= OTHER DETAILS TAB ================= */}
            {activeTab === "other" && (
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Father Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fatherName"
                    placeholder="Father Name"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Mother Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="motherName"
                    placeholder="Mother Name"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Alternate Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="altMobile"
                    placeholder="Alternate Mobile"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Residential Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="residentialAddress"
                    placeholder="Residential Address"
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Permanent Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="permanentAddress"
                    placeholder="Permanent Address"
                  ></textarea>
                </div>
              </div>
            )}

            {/* ===== ACTIONS ===== */}
            <div className="mt-4 text-center">
              <button type="reset" className="btn btn-outline-secondary me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>
                Save Trainer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainer;
