import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateState } from "../../utils/validation";

const AddState = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "state",
    listUrl: "/state/list",
    getUrl: (id) => `/state/${id}`,
    createUrl: "/state/add",
    updateUrl: (id) => `/state/update/${id}`,
    deleteUrl: (id) => `/state/delete/${id}`,
  });

  const { data, isLoading } = useGetById(id);

  const [formData, setFormData] = useState({
    stateName: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        stateName: data.stateName,
        status: data.status,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateState(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/superAdmin/manage-states") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/superAdmin/manage-states"),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
     setErrors((prev) => ({...prev,[name]: "", }));
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
            <h5 className="fw-bold mb-0">State Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all states
            </p>
          </div>
        </div>

        <Link
          to="/superAdmin/manage-states"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage States
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4"> {isEditMode ? "Edit State" : "Create State"} </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <FormInput
                  label="State Name"
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleChange}
                  placeholder="Enter State Name"
                  error={errors.stateName}
                  mandatory
                />
              </div>

              <div className="col-md-4">
                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/superAdmin/manage-states")}
                saveText= {createMutation.isPending ? "Saving...": "Save"}
                cancelText="Cancel"
                disableSave={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddState;
