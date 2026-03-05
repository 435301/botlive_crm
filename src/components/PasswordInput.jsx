import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  mandatory = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3 position-relative">
      {label && (
        <label className="form-label">
          {label} {mandatory && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control pe-5 ${error ? "is-invalid" : ""} ${className}`}
        />

        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default PasswordInput;