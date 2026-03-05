

// const SelectFilter = ({
//   value,
//   onChange,
//   options = [],
//   placeholder = "Select",
//   className ,
// }) => {
//   return (
//     <div className={className}>
//       <select
//         className="form-select"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

import React from "react";
import Select from "react-select";

const SelectFilter = ({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className,
}) => {
  // Convert value to react-select format
  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  ) || null;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
      height: "44px",
      borderColor: "#019aa8",
      fontSize: "13px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "44px",
      padding: "0 10px",
    }),
  };

  return (
    <div className={className}>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        placeholder={placeholder}
        isSearchable
        classNamePrefix="react-select"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectFilter;