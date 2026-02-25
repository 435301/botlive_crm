import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className,
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

      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      // required={required}
      />
      {error && (
        <div className=" d-flex invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;