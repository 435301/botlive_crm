import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  className ,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;