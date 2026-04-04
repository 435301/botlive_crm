import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateSchoolStudent, validateSkillCentreStudent } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import StatusSelect from "../../components/StatusSelect";
import useGrades from "../../hooks/useGrades";
import PasswordInput from "../../components/PasswordInput";
import useQualification from "../../hooks/useQualification";
import useOccupation from "../../hooks/useOccupation";
import useStates from "../../hooks/useStates";
import useDistricts from "../../hooks/useDistricts";
import useCategory from "../../hooks/useCategory";
import Cookies from "js-cookie";
import BASE_URL_JOB from "../../config/config";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";

const AddTrainerStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const centreType = JSON.parse(Cookies.get("trainer") || "{}")?.trainerType;
  const schoolSkillCentreId = JSON.parse(Cookies.get("trainer") || "{}")?.centreId;
  console.log('schoolSkillCentreId', schoolSkillCentreId, centreType)

  const { useGetById } = useCrud({
    entity: "student/school",
    listUrl: "/student/school/list",
    getUrl: (id) => `/student/${id}`,
    createUrl: "/student/school/add",
    updateUrl: (id) => `/student/school/update/${id}`,
    deleteUrl: (id) => `/student/school/delete/${id}`,
  });

  const {
    createMutation: createSchoolStudent,
    updateMutation: updateSchoolStudent
  } = useCrud({
    entity: "student/school",
    getUrl: (id) => `/student/${id}`,
    createUrl: "/student/school/add",
    updateUrl: (id) => `/student/school/update/${id}`,
  });

  const {
    createMutation: createSkillStudent,
    updateMutation: updateSkillStudent
  } = useCrud({
    entity: "student/skillcenter",
    getUrl: (id) => `/student/${id}`,
    createUrl: "/student/skillcenter/add",
    updateUrl: (id) => `/student/skillcenter/update/${id}`,
  });

  const { data: studentData } = useGetById(id, {
    enabled: isEditMode,
  });

  console.log('studentData', studentData)
  useEffect(() => {
    if (studentData) {
      setFormData({
        schoolId: studentData.centreId || "",
        enrollmentNumber: studentData.enrolmentNumber || "",
        studentName: studentData.fullName || "",
        fatherName: studentData.fatherName || "",
        gender: studentData.gender || "",
        dob: studentData.dob || "",
        gradeId: studentData.gradeBatchId || "",
        aadharNumber: studentData.aadharNumber || "",
        mobile: studentData.mobile || "",
        email: studentData.email || "",
        password: "",
        studentPhoto: null,
        status: studentData.status
      });
      setSkillCentreFormData({
        skillcentreId: studentData.centreId || "",
        enrollmentNumber: studentData.enrolmentNumber || "",
        studentName: studentData.fullName || "",
        fatherName: studentData.fatherName || "",
        gender: studentData.gender || "",
        dob: studentData.dob || "",
        batchId: String(studentData.gradeBatchId) || "",
        aadharNumber: studentData.aadharNumber || "",
        mobile: studentData.mobile || "",
        email: studentData.email || "",
        password: "",
        alternateMobile: studentData.alternateMobile,
        qualificationId: String(studentData.qualificationId),
        occupationId: String(studentData.occupationId),
        categoryId: String(studentData.categoryId),
        stateId: String(studentData.state),
        districtId: String(studentData.district),
        wardVillage: studentData.wardVillage,
        pincode: studentData.pincode,
        maritalStatus: studentData.maritalStatus,
        fatherAadhar: studentData.fatherAadharNumber,
        fatherOccupationId: String(studentData.fatherOccupationId),
        motherName: studentData.motherName,
        motherOccupationId: String(studentData.motherOccupationId),
        annualFamilyIncome: studentData.annualFamilyIncome,
        noOfFamilyMembers: studentData.noOfFamilyMembers,
        aadharPhoto: null,
        sscCertificate: null,
        intermediateCertificate: null,
        ugCertificate: null,
        pgCertificate: null,
        studentPhoto: null,
        status: studentData.status
      });
    }
  }, [studentData]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    schoolId: schoolSkillCentreId,
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
    status: 1,
  });

  const [skillCentreFormData, setSkillCentreFormData] = useState({
    skillcentreId: schoolSkillCentreId,
    enrollmentNumber: "",
    studentName: "",
    gender: "",
    dob: "",
    batchId: "",
    aadharNumber: "",
    mobile: "",
    email: "",
    password: "",
    alternateMobile: "",
    qualificationId: "",
    occupationId: "",
    categoryId: "",
    stateId: "",
    districtId: "",
    wardVillage: "",
    pincode: "",
    maritalStatus: "",
    fatherAadhar: "",
    fatherName: "",
    fatherOccupationId: "",
    motherName: "",
    motherOccupationId: "",
    annualFamilyIncome: "",
    noOfFamilyMembers: "",
    studentPhoto: null,
    aadharPhoto: null,
    sscCertificate: null,
    intermediateCertificate: null,
    ugCertificate: null,
    pgCertificate: null,
    status: 1,
  })

  const { grades } = useGrades(centreType);
  const { qualifications } = useQualification();
  const { occupations } = useOccupation();
  const { states } = useStates();
  const { districts } = useDistricts();
  const filteredDistricts = skillCentreFormData.stateId ? districts.filter((district) => Number(district.stateId) === Number(skillCentreFormData.stateId)) : [];
  const { categories } = useCategory();


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      if (name === "centreType") {
        setFormData({
          ...formData, centreType: value, schoolId: ""
        });
      } if (name === "grade") {
        setFormData({
          ...formData, centreType: value, gradeId: ""
        });
      }
      // if (name === "dob") {
      //   const [year, month, day] = value.split("-");
      //   const formatted = `${day}-${month}-${year}`;
      //   setFormData({
      //     ...formData,
      //     [name]: formatted,
      //   });
      // }
      else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  const handleSkillChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setSkillCentreFormData({
        ...skillCentreFormData,
        [name]: files[0],
      });
    }
    //  else if (name === "dob") {
    //   const [year, month, day] = value.split("-");
    //   const formatted = `${day}-${month}-${year}`;

    //   setSkillCentreFormData((prev) => ({
    //     ...prev,
    //     dob: formatted,
    //   }));
    // } 
    else {
      setSkillCentreFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "stateId" && { districtId: "" }),
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (centreType === 2) {
      const validationErrors = validateSchoolStudent(formData, isEditMode);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          if (key === "dob") {
            dataToSend.append("dob", formatDateToDDMMYYYY(formData.dob));
          } else {
            dataToSend.append(key, formData[key]);
          }
        }
      });

      if (isEditMode) {
        updateSchoolStudent.mutate(
          { id, data: dataToSend },
          { onSuccess: () => navigate("/trainer/manage-students") }
        );
      } else {
        createSchoolStudent.mutate(dataToSend, {
          onSuccess: () => navigate("/trainer/manage-students"),
        });
      }

      return;
    }

    if (centreType === 1) {

      const validationErrors = validateSkillCentreStudent(
        skillCentreFormData,
        isEditMode
      );

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      const dataToSend = new FormData();

      Object.keys(skillCentreFormData).forEach((key) => {
        if (
          skillCentreFormData[key] !== null &&
          skillCentreFormData[key] !== ""
        ) {
          if (key === "dob") {
            dataToSend.append(
              "dob",
              formatDateToDDMMYYYY(skillCentreFormData.dob)
            );
          } else {
            dataToSend.append(key, skillCentreFormData[key]);
          }
        }
      });

      if (isEditMode) {
        updateSkillStudent.mutate(
          { id, data: dataToSend },
          { onSuccess: () => navigate("/trainer/manage-students") }
        );
      } else {
        createSkillStudent.mutate(dataToSend, {
          onSuccess: () => navigate("/trainer/manage-students"),
        });
      }

      return;
    }
  };

  const renderSchoolStudentForm = () => (
    <>

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
          value={formData.dob}
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
          mandatory={centreType === 1}
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
        // error={errors.studentPhoto}
        />
        {errors && <div className="text-danger small">{errors.studentPhoto}</div>}
        {studentData?.photo && (
          <img
            src={`${BASE_URL_JOB}${studentData?.photo}`}
            alt="Student"
            width="120"
            className="mb-2"
          />
        )}
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
    </>
  );

  const renderSkillCentreStudentForm = () => (
    <>

      {/* Enrollment Number */}
      <div className="col-md-4">
        <FormInput
          label="Enrollment Number"
          name="enrollmentNumber"
          value={skillCentreFormData.enrollmentNumber}
          onChange={handleSkillChange}
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
          value={skillCentreFormData.studentName}
          onChange={handleSkillChange}
          placeholder="Enter student name"
          error={errors.studentName}
          mandatory
        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Father Number"
          name="fatherName"
          value={skillCentreFormData.fatherName}
          onChange={handleSkillChange}
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
          value={skillCentreFormData.gender}
          onChange={handleSkillChange}
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
          value={skillCentreFormData.dob}
          onChange={handleSkillChange}
          error={errors.dob}
          mandatory
        />
      </div>

      {/* Adhar Number */}
      <div className="col-md-4">
        <FormSelect
          label="Skill"
          name="batchId"
          value={skillCentreFormData.batchId}
          onChange={handleSkillChange}
          options={grades.map((grade) => ({
            label: grade.gradeBatch,
            value: String(grade.id)
          }))}
          error={errors.batchId}
        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Aadhar Number"
          name="aadharNumber"
          value={skillCentreFormData.aadharNumber}
          onChange={handleSkillChange}
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
          mandatory={!isEditMode}
          onChange={handleSkillChange}
          error={errors.studentPhoto}
        />
        {!isEditMode && errors && <div className="text-danger small">{errors.studentPhoto}</div>}
        {studentData?.photo && (
          <img
            src={`${BASE_URL_JOB}${studentData?.photo}`}
            alt="Student"
            width="120"
            className="mb-2"
          />
        )}
      </div>

      {/* Mobile Number */}
      <div className="col-md-4">
        <FormInput
          label="Mobile"
          name="mobile"
          value={skillCentreFormData.mobile}
          onChange={handleSkillChange}
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
          value={skillCentreFormData.email}
          onChange={handleSkillChange}
          error={errors.email}
          placeholder="Enter email address"
          mandatory
        />
      </div>
      <div className="col-md-4">
        <PasswordInput
          label="Password"
          name="password"
          value={skillCentreFormData.password}
          onChange={handleSkillChange}
          placeholder={
            isEditMode
              ? "Leave blank to keep existing password"
              : "Create a password"
          }
          error={errors.password}
          mandatory={!isEditMode}
        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Alternate Mobile"
          name="alternateMobile"
          value={skillCentreFormData.alternateMobile}
          onChange={handleSkillChange}
          error={errors.alternateMobile}
          placeholder="Enter mobile number"
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Qualification"
          name="qualificationId"
          value={skillCentreFormData.qualificationId}
          onChange={handleSkillChange}
          options={qualifications.map((qualification) => ({
            label: qualification.qualification,
            value: String(qualification.id)
          }))}
          error={errors.qualificationId}
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Occupation"
          name="occupationId"
          value={skillCentreFormData.occupationId}
          onChange={handleSkillChange}
          options={occupations.map((occupation) => ({
            label: occupation.occupation,
            value: String(occupation.id)
          }))}
          error={errors.occupationId}
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Social Status"
          name="categoryId"
          value={skillCentreFormData.categoryId}
          onChange={handleSkillChange}
          options={categories.map((category) => ({
            label: category.category,
            value: String(category.id)
          }))}
          error={errors.categoryId}
        />
      </div>


      <div className="col-md-4">
        <FormSelect
          label="State"
          name="stateId"
          value={skillCentreFormData.stateId}
          onChange={handleSkillChange}
          options={states.map((state) => ({
            label: state.stateName,
            value: String(state.id)
          }))}
          error={errors.stateId}
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="District"
          name="districtId"
          value={skillCentreFormData.districtId}
          onChange={handleSkillChange}
          options={filteredDistricts.map((district) => ({
            label: district.districtName,
            value: String(district.id)
          }))}
          error={errors.districtId}
        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Ward Village"
          name="wardVillage"
          value={skillCentreFormData.wardVillage}
          onChange={handleSkillChange}
          error={errors.wardVillage}
          placeholder="Enter ward village"

        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Pincode"
          name="pincode"
          value={skillCentreFormData.pincode}
          onChange={handleSkillChange}
          error={errors.pincode}
          placeholder="Enter pincode"

        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Marital Status"
          name="maritalStatus"
          value={skillCentreFormData.maritalStatus}
          onChange={handleSkillChange}
          options={[
            { label: "Married", value: 1 },
            { label: "Unmarried", value: 2 },
            { label: "Divorced", value: 3 },

          ]}
          error={errors.maritalStatus}
        />
      </div>

      <div className="col-md-4">
        <FormInput
          label="Father Aadhar"
          name="fatherAadhar"
          value={skillCentreFormData.fatherAadhar}
          onChange={handleSkillChange}
          error={errors.fatherAadhar}
          placeholder="Enter father aadhar number"
          mandatory
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Father Occupation"
          name="fatherOccupationId"
          value={skillCentreFormData.fatherOccupationId}
          onChange={handleSkillChange}
          options={occupations.map((occupation) => ({
            label: occupation.occupation,
            value: String(occupation.id)
          }))}
          error={errors.fatherOccupationId}
          mandatory
        />
      </div>


      <div className="col-md-4">
        <FormInput
          label="Mother Name"
          name="motherName"
          value={skillCentreFormData.motherName}
          onChange={handleSkillChange}
          error={errors.motherName}
          placeholder="Enter mother number"
          mandatory
        />
      </div>

      <div className="col-md-4">
        <FormSelect
          label="Mother Occupation"
          name="motherOccupationId"
          value={skillCentreFormData.motherOccupationId}
          onChange={handleSkillChange}
          options={occupations.map((occupation) => ({
            label: occupation.occupation,
            value: String(occupation.id)
          }))}
          error={errors.motherOccupationId}

        />
      </div>


      <div className="col-md-4">
        <FormInput
          label="Annual Family Income"
          name="annualFamilyIncome"
          value={skillCentreFormData.annualFamilyIncome}
          onChange={handleSkillChange}
          error={errors.annualFamilyIncome}
          placeholder="Enter family income"
          mandatory
        />
      </div>

      <div className="col-md-4">
        <FormInput
          type="number"
          label="No of Family Members"
          name="noOfFamilyMembers"
          value={skillCentreFormData.noOfFamilyMembers}
          onChange={handleSkillChange}
          error={errors.noOfFamilyMembers}
          placeholder="Enter no of family numbers"
          mandatory
        />
      </div>

      <div className="col-md-4">
        <FormInput
          type="file"
          label="Aadhar Photo"
          name="aadharPhoto"
          onChange={handleSkillChange}
          mandatory={!isEditMode}
          accept="image/*"
          error={!isEditMode && errors.aadharPhoto}
        />
        {studentData?.aadharPhoto && (
          <img
            src={`${BASE_URL_JOB}${studentData?.aadharPhoto}`}
            alt="aadhar"
            width="120"
            className="mb-2"
          />
        )}
      </div>

      <div className="col-md-4">
        <FormInput
          label="SSC Certificates"
          name="sscCertificate"
          type="file"
          placeholder="sscCertificate"
          onChange={handleSkillChange}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.sscCertificate}
        />
        {studentData?.sscCertificate && (
          <iframe
            src={`${BASE_URL_JOB}${studentData.sscCertificate}`}
            width="120"
            height="150"
            title={studentData.sscCertificate.split("/").pop()}
          />
        )}
      </div>


      <div className="col-md-4">
        <FormInput
          label="Intermediate Certificates"
          name="intermediateCertificate"
          type="file"
          placeholder="intermediateCertificate"
          onChange={handleSkillChange}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.intermediateCertificate}
        />
        {studentData?.interCertificate && (
          <iframe
            src={`${BASE_URL_JOB}${studentData.interCertificate}`}
            width="120"
            height="150"
            title={studentData.interCertificate.split("/").pop()}
          />
        )}
      </div>


      <div className="col-md-4">
        <FormInput
          label="UG Certificates"
          name="ugCertificate"
          type="file"
          placeholder="ugCertificate"
          onChange={handleSkillChange}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.ugCertificate}
        />
        {studentData?.ugCertificate && (
          <iframe
            src={`${BASE_URL_JOB}${studentData.ugCertificate}`}
            width="120"
            height="150"
            title={studentData.ugCertificate.split("/").pop()}
          />
        )}
      </div>

      <div className="col-md-4">
        <FormInput
          label="PG Certificates"
          name="pgCertificate"
          type="file"
          placeholder="pgCertificate"
          onChange={handleSkillChange}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.pgCertificate}
        />
        {studentData?.pgCertificate && (
          <iframe
            src={`${BASE_URL_JOB}${studentData.pgCertificate}`}
            width="120"
            height="150"
            title={studentData.pgCertificate.split("/").pop()}
          />
        )}
      </div>

      <div className="col-md-4">
        <StatusSelect name="status" value={skillCentreFormData.status} handleChange={handleSkillChange} error={errors.status} />
      </div>
    </>
  );
  return (
    <div className="container-fluid">
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
          to="/trainer/manage-students"
          className="btn manage-skills-btn d-flex align-items-center"
        >
          <i className="ti ti-certificate me-2"></i>
          Manage Students
        </Link>
      </div>

      {/* ===== FORM ===== */}
      <div className="card shadow-sm p-1">
        <div className="card-body">
          <h5 className="fw-bold mb-4">{isEditMode ? "Edit Student" : "Create Student"}</h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {Number(centreType) === 2 && renderSchoolStudentForm()}
              {Number(centreType) === 1 && renderSkillCentreStudentForm()}
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/trainer/manage-students")}
                saveText={isEditMode ? updateSchoolStudent.isPending || updateSkillStudent.isPending ? "Saving..." : "Save" : createSchoolStudent.isPending || createSkillStudent.isPending ? "Saving..." : "Save"}
                cancelText="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainerStudent;
