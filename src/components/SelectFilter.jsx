import React from "react";

const SelectFilter = ({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className ,
}) => {
  return (
    <div className={className}>
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;