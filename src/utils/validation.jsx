
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