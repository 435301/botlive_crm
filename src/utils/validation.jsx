
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

export const validateGrade = (formData) => {
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

export const validateSkillCentreStudent = (formData, isEditMode = false) => {
  const errors = {};
  if (!formData.enrollmentNumber) errors.enrollmentNumber = "Enrollment number is required";
  if (!formData.studentName) errors.studentName = "Student name is required";
  if (!formData.gender) errors.gender = "Gender is required";
  if (!formData.dob) errors.dob = "Date of birth is required";
  if (!formData.batchId) errors.batchId = "Batch is required";
  if (!formData.aadharNumber) errors.aadharNumber = "Aadhar number is required";
  if (!formData.mobile) errors.mobile = "Mobile number is required";
  if (!formData.email) errors.email = "Email is required";

  if (!isEditMode && !formData.password) {
    errors.password = "Password is required";
  }
  if (!formData.qualificationId) errors.qualificationId = "Qualification is required";
  if (!formData.occupationId) errors.occupationId = "Occupation is required";
  if (!formData.categoryId) errors.categoryId = "Category is required";
  if (!formData.stateId) errors.stateId = "State is required";
  if (!formData.districtId) errors.districtId = "District is required";
  if (!formData.wardVillage) errors.wardVillage = "Ward/Village is required";
  if (!formData.pincode) errors.pincode = "Pincode is required";
  if (!formData.maritalStatus) errors.maritalStatus = "Marital status is required";

  if (!formData.fatherName) errors.fatherName = "Father name is required";
  if (!formData.fatherAadhar) errors.fatherAadhar = "Father Aadhar is required";
  if (!formData.motherName) errors.motherName = "Mother name is required";
  if (!formData.fatherOccupationId) errors.fatherOccupationId = "Father occupation is required";
  if (!formData.motherOccupationId) errors.motherOccupationId = "Mother occupation is required";
  if (!formData.annualFamilyIncome) errors.annualFamilyIncome = "Family income is required";
  if (!formData.noOfFamilyMembers) errors.noOfFamilyMembers = "Number of family members is required";

  if (!isEditMode && !formData.studentPhoto) errors.studentPhoto = "Student photo is required";
  if (!isEditMode && !formData.aadharPhoto) errors.aadharPhoto = "Aadhar photo is required";
  if (!isEditMode && !formData.sscCertificate) errors.sscCertificate = "SSC certificate is required";
  if (!isEditMode && !formData.intermediateCertificate) errors.intermediateCertificate = "Intermediate certificate is required";

  return errors;
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

export const validateQualification = (formData) => {
  const errors = {};

  if (!formData.qualification?.trim()) {
    errors.qualification = "Qualification is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateOccupation = (formData) => {
  const errors = {};

  if (!formData.occupation?.trim()) {
    errors.occupation = "Occupation is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateActivity = (formData, isEditMode) => {
  const errors = {};

  if (!formData.centreId) {
    errors.centreId = "Centre is required";
  }

  if (!formData.activityTitle?.trim()) {
    errors.activityTitle = "Activity Title is required";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.centreType) {
    errors.centreType = "Project Type is required";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  if (!isEditMode && !formData.photos)
    errors.photos = "Photo is required";

  if (!isEditMode && !formData.videos)
    errors.videos = "Video is required";

  return errors;
};

export const validateAssignChapters = (formData) => {
  const errors = {};

  if (!formData.courseId) {
    errors.courseId = "course is required";
  }

  if (!formData.gradeBatchId) {
    errors.gradeBatchId = "Grade/Batch is required";
  }

  if (!formData.moduleId) {
    errors.moduleId = "Module is required";
  }

  if (!formData.chapterIds || formData.chapterIds.length === 0) {
    errors.chapterIds = "Please select at least one chapter";
  }

  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }

  return errors;
};

export const validateTrainerForm = (formData, isEditMode) => {
  const errors = {};

  if (!formData.trainerType) {
    errors.trainerType = "Trainer type is required";
  }
  if (!formData.trainerCode) {
    errors.trainerCode = "Trainer Code is required";
  }
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }
  if (!formData.qualificationId) {
    errors.qualificationId = "Qualification is required";
  }
  if (!formData.gradeId) {
    errors.gradeId = "Grade is required";
  }
  if (!formData.stateId) {
    errors.stateId = "State is required";
  }
  if (!formData.districtId) {
    errors.districtId = "District is required";
  }
  if (!formData.area.trim()) {
    errors.area = "Area is required";
  }
  if (!isEditMode && (!formData.certificates || formData.certificates.length === 0)) {
    errors.certificates = "At least one certificate is required";
  }
  if (!formData.bloodGroup) {
    errors.bloodGroup = " Blood Group is required";
  }
  // Full Name validation
  if (!formData.fullName || formData.fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  // Mobile validation (Indian 10-digit)
  if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
    errors.mobile = "Enter valid 10-digit mobile number";
  }


  // Email validation
  if (
    !formData.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Enter valid email address";
  }

  // Password validation (min 6 chars)
  if (isEditMode && formData.password && formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Aadhar validation (12 digits)
  if (!formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
    errors.aadharNumber = "Aadhar must be 12 digits";
  }

  // PAN validation (ABCDE1234F format)
  if (
    !formData.panNumber &&
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
  ) {
    errors.panNumber = "Enter valid PAN number";
  }

  // Pincode validation (6 digits)
  if (!formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = "Enter valid 6-digit pincode";
  }

  // Date of Birth validation (must be 18+)
  if (!formData.dob) {
    errors.dob = "DOB is required";
  }

  // Date of Joining (cannot be future)
  if (!formData.dateOfJoining) {
    errors.dateOfJoining = "Date of Joining is required";
  }

  // Trainer Photo validation
  if (!isEditMode && (!formData.trainerPhoto || formData.trainerPhoto.length === 0)) {
    errors.trainerPhoto = "At least one photo is required";
  }
  if (!formData.fatherName) {
    errors.fatherName = " Father Name is required";
  }
  if (!formData.motherName) {
    errors.motherName = " Mother Name is required";
  }
  if (!formData.residentialAddress) {
    errors.residentialAddress = " Residential Address is required";
  }
  if (!formData.permanentAddress) {
    errors.permanentAddress = " Permanent Address is required";
  }
  if (formData.status === undefined || formData.status === "") {
    errors.status = "Status is required";
  }
  return errors;
};
