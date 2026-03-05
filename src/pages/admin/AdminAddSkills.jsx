import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import StatusSelect from "../../components/StatusSelect";

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
    district: "",
    state: "",
    area: "",
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
            <h5 className="fw-bold mb-0">School/Skill Center Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all school/skill centers
            </p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/manage-skills"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage School/Skill Center
        </Link>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Skill Center Management</h5>
       
      </div> */}

      {/* ===== FORM CARD ===== */}
      <div className="card shadow-sm p-2">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create School/Skill Center </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Center Code */}
              <div className="col-md-4">
                 <FormInput
                  label="Center Code"
                  name="centerCode"
                  value={formData.centerCode}
                  onChange={handleChange}
                  placeholder="Enter center code (e.g. CEN-005)"
                  required
                />
              </div>

              {/* Center Name */}
              <div className="col-md-4">
                 <FormInput
                  label=" School/Skill Center Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter school/skill center name"
                  required
                />
              </div>

              {/* Center Type */}
              <div className="col-md-4">
                <FormSelect
                  label=" School/Skill Center Type"
                  name="course"
                  value={formData.centerType}
                  onChange={handleChange}
                  required
                  options={[
                    { label: "Skill Center", value: "Skill Center" },
                    { label: "School", value: "School" },
                  ]}
                />
              </div>

              {/* Contact Person */}
              <div className="col-md-4"> 
                <FormInput
                  label="School/Skill Center Contact Person Name"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="col-md-4">
                  <FormInput
                  type="tel"
                  label="School/Skill Center Contact Person Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-4">
                  <FormInput
                  type="email"
                  label=" School/Skill Center Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Password */}
              <div className="col-md-4">
                <FormInput
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="col-md-4">
                <FormSelect
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  options={[
                    { label: "State 1", value: "State 1" },
                    { label: "State 2", value: "State 2" },
                  ]}
                />
              </div>

              <div className="col-md-4">
                <FormSelect
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  options={[
                    { label: "District 1", value: "District 1" },
                    { label: "District 2", value: "District 2" },
                  ]}
                />
              </div>
              <div className="col-md-4">
                <FormInput
                  label="Area "
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter Area"
                  required
                />
              </div>
              
              {/* Status */}
              <div className="col-md-4">
                <StatusSelect formData={formData} handleChange={handleChange} />
              </div>
            </div>
            {/* Address */}
            <div className="col-md-12 mt-3">
              <label className="form-label"> School/Skill Center Address</label>
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
                Save School/Skill Center
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillCenter;
