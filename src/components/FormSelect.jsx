import React from "react";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div >
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;