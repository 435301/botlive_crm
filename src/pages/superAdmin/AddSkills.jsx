import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateSkills } from "../../utils/validation";
import useStates from "../../hooks/useStates";
import useDistricts from "../../hooks/useDistricts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

const AddSkillCenter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "skillCenter",
    listUrl: "/skillCenter/list",
    getUrl: (id) => `/skillCenter/${id}`,
    createUrl: "/skillCenter/add",
    updateUrl: (id) => `/skillCenter/update/${id}`,
    deleteUrl: (id) => `/skillCenter/delete/${id}`,
  });

  const { data: nextCodeData } = useQuery({
    queryKey: ["nextCode", 1],
    queryFn: async () => {
      const res = await axiosInstance.get("/setting/getNextCode/1");
      return res.data.data;
    },
  });

  const { data, isLoading } = useGetById(id);
  const { states } = useStates();
  const { districts } = useDistricts();

  const [formData, setFormData] = useState({
    centerCode: "",
    centerName: "",
    centerType: "",
    address: "",
    contactPerson: "",
    mobile: "",
    email: "",
    password: "",
    districtId: "",
    stateId: "",
    area: "",
    status: 1,
    founderId: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        centerCode: data.centerCode,
        centerName: data.centerName,
        centerType: data.centerType,
        address: data.address,
        contactPerson: data.contactPerson,
        mobile: data.mobile,
        email: data.email,
        password: data.password,
        districtId: data.district?.id ? String(data.district.id) : "",
        stateId: data.state?.id ? String(data.state.id) : "",
        area: data.area,
        status: data.status,
        founderId: 1,
      });
    }
  }, [data]);

  useEffect(() => {
    if (nextCodeData?.code) {
      setFormData(prev => ({
        ...prev,
        centerCode: nextCodeData.code
      }));
    }
  }, [nextCodeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('dsfvgbdc')
    const validationErrors = validateSkills(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/superAdmin/manage-skills") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/superAdmin/manage-skills"),
      });
    }
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
          to="/superAdmin/manage-skills"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage School/Skill Center
        </Link>
      </div>


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
                  value={isEditMode ? formData.centerCode : nextCodeData?.code || ""}
                  onChange={handleChange}
                  placeholder="Enter center code (e.g. CEN-005)"
                  error={errors.centerCode}
                />
              </div>

              {/* Center Name */}
              <div className="col-md-4">
                <FormInput
                  label=" School/Skill Center Name"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleChange}
                  placeholder="Enter school/skill center name"
                  error={errors.centerName}
                />
              </div>

              {/* Center Type */}
              <div className="col-md-4">
                <FormSelect
                  label=" School/Skill Center Type"
                  name="centerType"
                  value={formData.centerType}
                  onChange={handleChange}
                  error={errors.centerType}
                  options={[
                    { label: "Skill Center", value: 1 },
                    { label: "School", value: 2 },
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
                  error={errors.contactPerson}
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
                  error={errors.mobile}
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
                  error={errors.email}
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
                  error={errors.password}
                />
              </div>

              <div className="col-md-4">
                <FormSelect
                  label="State"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  options={
                    states.map((state) => ({
                      label: state.stateName,
                      value: String(state.id),
                    }))
                  }
                  error={errors.stateId}
                />

              </div>

              <div className="col-md-4">
                <FormSelect
                  label="District"
                  name="districtId"
                  value={formData.districtId}
                  onChange={handleChange}
                  options={districts.map((district) => ({
                    label: district.districtName,
                    value: String(district.id)
                  }))}
                  error={errors.districtId}
                />
              </div>
              <div className="col-md-4">
                <FormInput
                  label="Area "
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter Area"
                  error={errors.area}
                />
              </div>

              {/* Status */}
              <div className="col-md-4">
                <StatusSelect value={formData.status} name="status" handleChange={handleChange} error={errors.status} />
              </div>
            </div>
            {/* Address */}
            <div className="col-md-12 mt-3">
              <label className="form-label"> School/Skill Center Address<span className="text-danger"> *</span></label>
              <textarea
                className="form-control"
                rows="2"
                name="address"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
              ></textarea>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <button type="reset" className="btn btn-outline-secondary me-2">
                Reset
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
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
