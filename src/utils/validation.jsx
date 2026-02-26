
export const validateState = (formData) => {
  const errors = {};

  if (!formData.stateName?.trim()) {
    errors.stateName = "State name is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateDistrict = (formData) => {
  const errors = {};

  if (!formData.districtName?.trim()) {
    errors.districtName = "District name is required";
  }

  if (!formData.stateId?.trim()) {
    errors.stateId = "State name is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};