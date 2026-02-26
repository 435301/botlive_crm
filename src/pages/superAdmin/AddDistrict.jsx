import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import { validateDistrict } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";

const AddDistrict = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "district",
    listUrl: "/district/list",
    getUrl: (id) => `/district/${id}`,
    createUrl: "/district/add",
    updateUrl: (id) => `/district/update/${id}`,
    deleteUrl: (id) => `/district/delete/${id}`,
  });

  const { useList: stateListQuery } = useCrud({
    entity: "state",
    listUrl: "/state/list",
  });

  const { data: stateList } = stateListQuery({ page: 1, search: "", status: 1, });
  const states = stateList?.data || []
  const { data, isLoading } = useGetById(id);

  const [formData, setFormData] = useState({
    stateId: "",
    districtName: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        stateId: String(data.stateId),
        districtName: data.districtName,
        status: data.status,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateDistrict(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/manage-districts") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/manage-districts"),
      });
    }
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
            <h5 className="fw-bold mb-0">District Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all districts
            </p>
          </div>
        </div>

        <Link
          to="/manage-districts"
          className="btn manage-cities-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Districts
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create District </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <FormSelect
                  label="State Name"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  options={states.map((state) => ({
                    label: state.stateName,
                    value: String(state.id),
                  }))}
                  error={errors.stateId}
                />
              </div>


              <div className="col-md-4">
                <FormInput
                  label="District Name"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleChange}
                  placeholder="Enter District Name"
                  error={errors.districtName}
                />
              </div>

              <div className="col-md-4">
                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/manage-districts")}
                saveText="Save"
                cancelText="Cancel"
                disable={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDistrict;
