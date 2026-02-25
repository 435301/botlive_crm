import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormActions from "../components/FormActions";
import StatusSelect from "../components/StatusSelect";

const AddCity = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city:"",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New City Data:", formData);
    navigate("/manage-cities");
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
            <h5 className="fw-bold mb-0">City Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all cities
            </p>
          </div>
        </div>

        <Link
          to="/manage-cities"
          className="btn manage-cities-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Cities
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create City </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
          
              <div className="col-md-4">
                <FormInput
                  label="City Name"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City Name"
                  required
                />
              </div>

              <div className="col-md-4">
                <StatusSelect formData={formData} handleChange={handleChange}  />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
                 <FormActions
                onCancel={() => navigate("/manage-cities")}
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

export default AddCity;
