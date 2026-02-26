
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

export const validateSkills = (formData) => {
  const errors = {};

  if (!formData.centerCode) {
    errors.centerCode = "Centre Code is required";
  }

  if (!formData.centerName?.trim()) {
    errors.centerName = "Centre name is required";
  }

  if (!formData.founderId) {
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

  if (!formData.address?.trim()) {
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

  if (!formData.password) {
    errors.password = " Passwrod is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

