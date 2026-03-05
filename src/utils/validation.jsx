
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
    errors.founderId = "Administrator is required";
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
  if (!formData.area) {
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

export const validateFounder = (formData, isEditMode) => {
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
  if (!isEditMode && !formData.password) {
    errors.password = "Password is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateCourse = (formData) => {
  const errors = {};

  if (!formData.courseTitle?.trim()) {
    errors.courseTitle = "Course Title is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateModule = (formData) => {
  const errors = {};

  if (!formData.courseId) {
    errors.courseId = "Course is required";
  }

  if (!formData.moduleTitle?.trim()) {
    errors.moduleTitle = "Module Title is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateGrade= (formData) => {
  const errors = {};

  if (!formData.centreType) {
    errors.centreType = "Centre Type is required";
  }

  if (!formData.gradeBatch?.trim()) {
    errors.gradeBatch = "Grade/Batch is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateSchoolStudent = (formData, isEditMode) => {
  let newErrors = {};

  if(!formData.centreType) newErrors.centreType = "Centre Type is required"
  if (!formData.schoolId) newErrors.schoolId = "School is required";

  if (!formData.enrollmentNumber)
    newErrors.enrollmentNumber = "Enrollment number required";

  if (!formData.studentName)
    newErrors.studentName = "Student name required";

  if (!formData.gender) newErrors.gender = "Gender required";

  if (!formData.gradeId) newErrors.gradeId = "Grade required";

  if (!formData.mobile || formData.mobile.length !== 10)
    newErrors.mobile = "Valid mobile number required";

  if (!formData.email)
    newErrors.email = "Email required";

   if (!formData.dob)
    newErrors.dob = "DOB required";

  if (!isEditMode && !formData.password)
    newErrors.password = "Password required";

  if (!formData.aadharNumber || formData.aadharNumber.length !== 12)
    newErrors.aadharNumber = "Valid Aadhar required";

  if (!formData.fatherName)
    newErrors.fatherName = "Father name required";

  if (!isEditMode && !formData.studentPhoto)
    newErrors.studentPhoto = "Student photo required";

  return newErrors;
};

export const validateCategory = (formData) => {
  const errors = {};

  if (!formData.category?.trim()) {
    errors.category = "Category is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};