import React from "react";

const SearchInput = ({
    value,
    onChange,
    placeholder = "",
    type = "text",
    className,
}) => {
    return (
        <div className={className}>
            <input
                type={type}
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>
    );
};

export default SearchInput;
