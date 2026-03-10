import React from "react";
import Select, { components } from "react-select";

// Custom Option with Checkbox
const Option = (props) => {
    return (
        <components.Option {...props}>
            <div className="d-flex align-items-center">
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                    className="me-2"
                />
                <label className="mb-0">{props.label}</label>
            </div>
        </components.Option>
    );
};

const MultiSelectWithCheckbox = ({
    label,
    name,
    options = [],
    value = [],
    onChange,
    required = false,
    placeholder = "Select options",
    isDisabled = false,
    error,
}) => {
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
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                placeholder={placeholder}
                isDisabled={isDisabled}
                components={{ Option }}
            />
            {error && (
            <div className="text-danger small">
                {error}
            </div>
            )}
        </div>
    );
};

export default MultiSelectWithCheckbox;