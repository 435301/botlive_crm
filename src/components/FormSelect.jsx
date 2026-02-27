// import React from "react";

// const FormSelect = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   className = "",
//   error,
// }) => {
//   return (
//     <div className={className}>
//       {label && (
//         <label className="form-label">
//           {label}
//           <span className="text-danger"> *</span>
//         </label>
//       )}

//       <select
//         className="form-select"
//         name={name}
//         value={value}
//         onChange={onChange}
//       // required={required}
//       >
//         <option value="">Select</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <div className=" d-flex invalid-feedback">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormSelect;

import React from "react";
import Select from "react-select";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  className = "",
  error,
  isClearable = true,
}) => {
  // react-select expects value as full object
  const selectedOption =
    options.find((option) => option.value === value) || null;

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
  }

  return (
    <div className={className}>
      {label && (
        <label className="form-label">
          {label}
          <span className="text-danger"> *</span>
        </label>
      )}

      <Select
        name={name}
        value={selectedOption}
        onChange={(selected) =>
          onChange({
            target: { name, value: selected ? selected.value : "" },
          })
        }
        options={options}
        isSearchable
        isClearable={isClearable}
        classNamePrefix="react-select"
        styles={customStyles}
      />

      {error && (
        <div className="text-danger small">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
