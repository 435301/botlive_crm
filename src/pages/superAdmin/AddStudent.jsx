import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateSchoolStudent } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import StatusSelect from "../../components/StatusSelect";
import useSchools from "../../hooks/useSchools";
import useGrades from "../../hooks/useGrades";
import PasswordInput from "../../components/PasswordInput";
import { formatToInputDate } from "../../utils/formatDateInput";

const AddStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "student/school",
    listUrl: "/student/school/list",
    getUrl: (id) => `/student/school/${id}`,
    createUrl: "/student/school/add",
    updateUrl: (id) => `/student/school/update/${id}`,
    deleteUrl: (id) => `/student/school/delete/${id}`,
  });

  const { data: studentData } = useGetById(id, {
    enabled: isEditMode,
  });

  useEffect(() => {
    if (studentData?.data) {
      setFormData({
        schoolId: studentData.data.schoolId || "",
        enrollmentNumber: studentData.data.enrollmentNumber || "",
        studentName: studentData.data.studentName || "",
        fatherName: studentData.data.fatherName || "",
        gender: studentData.data.gender || "",
        dob: studentData.data.dob || "",
        gradeId: studentData.data.gradeId || "",
        aadharNumber: studentData.data.aadharNumber || "",
        mobile: studentData.data.mobile || "",
        email: studentData.data.email || "",
        password: "",
        studentPhoto: null,
        status: studentData.status
      });
    }
  }, [studentData]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    centreType: "",
    schoolId: "",
    enrollmentNumber: "",
    studentName: "",
    gender: "",
    dob: "",
    gradeId: "",
    aadharNumber: "",
    mobile: "",
    email: "",
    password: "",
    fatherName: "",
    studentPhoto: null,
    status: 1
  });

  const { schools } = useSchools();
  const { grades } = useGrades();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      if (name === "centreType") {
        setFormData({
          ...formData,
          centreType: value,
          schoolId: ""   // reset school when type changes
        });

      } if (name === "grade") {
        setFormData({
          ...formData,
          centreType: value,
          gradeId: ""   // reset grade when type changes
        });

      }
      if (name === "dob") {
        const [year, month, day] = value.split("-");
        const formatted = `${day}-${month}-${year}`;

        setFormData({
          ...formData,
          [name]: formatted,
        });
      }
      else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSchoolStudent(formData, isEditMode);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const dataToSend = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   if (formData[key]) {
      //     dataToSend.append(key, formData[key]);
      //   }
      // });
      // // Append all text fields
      dataToSend.append("centreType", formData.centreType);
      dataToSend.append("schoolId", formData.schoolId);
      dataToSend.append("enrollmentNumber", formData.enrollmentNumber);
      dataToSend.append("studentName", formData.studentName);
      dataToSend.append("fatherName", formData.fatherName);
      dataToSend.append("gender", formData.gender);
      dataToSend.append("gradeId", formData.gradeId);
      dataToSend.append("dob", formData.dob);
      dataToSend.append("aadharNumber", formData.aadharNumber);
      dataToSend.append("mobile", formData.mobile);
      dataToSend.append("email", formData.email);
      dataToSend.append("status", formData.status);
      if (formData.studentPhoto) {
        dataToSend.append("studentPhoto", formData.studentPhoto);
      }

      if (formData.password) {
        dataToSend.append("password", formData.password);
      }

      if (isEditMode) {
        updateMutation.mutate(
          { id, data: dataToSend },
          { onSuccess: () => navigate("/superAdmin/manage-students") }
        );
      } else {
        createMutation.mutate(dataToSend, {
          onSuccess: () => navigate("/superAdmin/manage-students"),
        });
      }
      setErrors("");
    } catch (error) {
      console.error("Student save error:", error);
    }

  };

  return (
    <div className="container-fluid">
      {/* ===== HEADER ===== */}
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Left: Modern Heading */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Student Management</h5>
            <p className="sub-text mb-0">View, edit and manage all students</p>
          </div>
        </div>

        {/* Right: Manage Skills Button */}
        <Link
          to="/superAdmin/manage-students"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Students
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Student </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Course Type */}
              <div className="col-md-4">
                <FormSelect
                  label="Centre Type"
                  name="centreType"
                  value={formData.centreType}
                  onChange={handleChange}
                  mandatory
                  options={[
                    { label: "Skill Center", value: 1 },
                    { label: "School", value: 2 },
                  ]}
                  error={errors.centreType}
                />
              </div>

              {/* {formData.centreType === 2 && ( */}
              <div className="col-md-4">
                <FormSelect
                  label="School"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleChange}
                  options={schools.map((school) => ({
                    label: school.centerName,
                    value: school.id,
                  }))}
                  error={errors.schoolId}
                  mandatory
                />
              </div>
              {/* )} */}

              {/* Enrollment Number */}
              <div className="col-md-4">
                <FormInput
                  label="Enrollment Number"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  placeholder="Enter enrollment number"
                  error={errors.enrollmentNumber}
                  mandatory
                />
              </div>


              {/* Student Name */}
              <div className="col-md-4">
                <FormInput
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  error={errors.studentName}
                  mandatory
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Father Number"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father name"
                  error={errors.fatherName}
                  mandatory
                />
              </div>

              {/* Gender */}
              <div className="col-md-4">
                <FormSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={[
                    { label: "Male", value: 1 },
                    { label: "Female", value: 2 },
                    { label: "Other", value: 3 },
                  ]}
                  error={errors.gender}
                  mandatory
                />
              </div>

              {/* Date of Birth */}
              <div className="col-md-4">
                <FormInput
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={formatToInputDate(formData.dob)}
                  onChange={handleChange}
                  error={errors.dob}
                  mandatory
                />
              </div>

              {/* Adhar Number */}
              <div className="col-md-4">
                <FormSelect
                  label="Grade"
                  name="gradeId"
                  value={formData.gradeId}
                  onChange={handleChange}
                  options={grades.map((grade) => ({
                    label: grade.gradeBatch,
                    value: grade.id
                  }))}
                  error={errors.gradeId}
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  error={errors.aadharNumber}
                  placeholder="Enter Aadhar number"
                  mandatory
                />
              </div>

              {/* Student Photograph */}
              <div className="col-md-4">
                <label className="form-label">Student Photograph<span className="text-danger"> *</span></label>
                <input
                  type="file"
                  className="form-control"
                  name="studentPhoto"
                  accept="image/*"
                  onChange={handleChange}
                  error={errors.studentPhoto}
                />
              </div>

              {/* Mobile Number */}
              <div className="col-md-4">
                <FormInput
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  placeholder="Enter mobile number"
                  mandatory
                />
              </div>

              {/* Email Address */}
              <div className="col-md-4">
                <FormInput
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter email address"
                  mandatory
                />
              </div>
              <div className="col-md-4">
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    isEditMode
                      ? "Leave blank to keep existing password"
                      : "Create a password"
                  }
                  error={errors.password}
                  mandatory={!isEditMode}
                />
              </div>

              {/* Status */}
              <div className="col-md-4">
                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/superAdmin/manage-students")}
                saveText="Save"
                cancelText="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
