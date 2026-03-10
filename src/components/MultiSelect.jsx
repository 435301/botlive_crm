import React from "react";
import Select from "react-select";

const MultiSelect = ({
  label,
  name,
  options = [],
  value = [],
  onChange,
  required = false,
  placeholder = "Select options",
  isDisabled = false,
}) => {
  // Convert normal array value -> react-select format
  const formattedValue = options.filter((option) =>
    value?.includes(option.value)
  );

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    onChange({
      target: {
        name,
        value: values,
      },
    });
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Select
        isMulti
        name={name}
        options={options}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default MultiSelect;