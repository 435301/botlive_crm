import React from "react";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  className = "",
  error,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label">
          {label}
          <span className="text-danger"> *</span>
        </label>
      )}

      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      // required={required}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className=" d-flex invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;