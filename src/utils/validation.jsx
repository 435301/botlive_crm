
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

export const validateSkills = (formData, isEditMode) => {
  const errors = {};

  if (!formData.centerCode) {
    errors.centerCode = "Centre Code is required";
  }

  if (!formData.centerName?.trim()) {
    errors.centerName = "Centre name is required";
  }

  if (!formData.founderId || formData.founderId === "") {
    errors.founderId = "Founder is required";
  }
  if (!formData.centerType) {
    errors.centerType = "Centre Type is required";
  }
  if (!formData.stateId) {
    errors.stateId = " State is required";
  }
  if (!formData.districtId) {
    errors.districtId = "District is required";
  }
  if (!formData.area?.trim()) {
    errors.area = " Area is required";
  }

  if (!formData.address) {
    errors.address = " Address is required";
  }
  if (!formData.contactPerson) {
    errors.contactPerson = " Contact Person is required";
  }
  if (!formData.mobile) {
    errors.mobile = " Mobile is required";
  }
  if (!formData.email) {
    errors.email = " Email is required";
  }

  if (!isEditMode && !formData.password) {
    errors.password = "Password is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateSettingsCode = (formData) => {
  const errors = {};

  if (!formData.prefix) {
    errors.prefix = "Prefix is required";
  }

  if (formData.startNumber) {
    errors.startNumber = "Start Number is required";
  }

  return errors;
};

export const validateFounder = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }
  if (!formData.email) {
    errors.email = "Email is required";
  }
  if (!formData.mobile) {
    errors.mobile = "Mobile is required";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};