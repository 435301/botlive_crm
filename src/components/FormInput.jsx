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
  mandatory,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label">
          {label}
          {mandatory && <span className="text-danger"> *</span>}
        </label>
      )}

      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        mandatory={mandatory}
      />
      {error && (
        <div className="text-danger small">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;