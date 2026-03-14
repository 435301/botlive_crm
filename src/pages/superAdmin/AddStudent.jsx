import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormActions from "../../components/FormActions";
import { useCrud } from "../../hooks/useCrud";
import { validateSchoolStudent, validateSkillCentreStudent } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import FormInput from "../../components/FormInput";
import StatusSelect from "../../components/StatusSelect";
import useSchools from "../../hooks/useSchools";
import useGrades from "../../hooks/useGrades";
import PasswordInput from "../../components/PasswordInput";
import { formatToInputDate } from "../../utils/formatDateInput";
import useQualification from "../../hooks/useQualification";
import useOccupation from "../../hooks/useOccupation";
import useStates from "../../hooks/useStates";
import useDistricts from "../../hooks/useDistricts";
import useCategory from "../../hooks/useCategory";
import BASE_URL_JOB from "../../config/config";

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
      setSkillCentreFormData({
        skillCentreId: studentData.data.skillCentreId || "",
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
        alternateMobile: studentData.data.alternateMobile,
        qualificationId: studentData.data.qualificationId,
        occupationId: studentData.data.occupationId,
        categoryId: studentData.data.categoryId,
        stateId: studentData.data.stateId,
        districtId: studentData.data.districtId,
        wardVillage: studentData.data.wardVillage,
        pincode: studentData.data.pincode,
        maritalStatus: studentData.data.maritalStatus,
        fatherAadhar: studentData.data.fatherAadhar,
        fatherName: studentData.data.fatherName,
        fatherOccupationId: studentData.data.fatherOccupationId,
        motherName: studentData.data.motherName,
        motherOccupationId: studentData.data.motherOccupationId,
        annualFamilyIncome: studentData.data.annualFamilyIncome,
        noOfFamilyMembers: studentData.data.noOfFamilyMembers,
        studentPhoto: null,
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
    status: 1,
  });

  console.log('formdata', formData.centreType)

  const [skillCentreFormData, setSkillCentreFormData] = useState({
    centreType: "",
    skillCentreId: "",
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
    // status: 1,
  })

  const { schoolsData } = useSchools();
  const filteredCentres = formData.centreType ? schoolsData.filter((school) => school.centerType === Number(formData.centreType)) : schoolsData;
  const { grades } = useGrades();
  const { qualifications } = useQualification();
  const { occupations } = useOccupation();
  const { states } = useStates();
  const { districts } = useDistricts();
  const filteredDistricts = formData.stateId ? districts.filter((district) => Number(district.stateId) === Number(formData.stateId)) : [];
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

  const handleSkillChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setSkillCentreFormData({ ...skillCentreFormData, [name]: files[0] });
    } else {
      setSkillCentreFormData({ ...skillCentreFormData, [name]: value });
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.centreType) === 2) {

      const validationErrors = validateSchoolStudent(formData, isEditMode);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          dataToSend.append(key, formData[key]);
        }
      });

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

      return;
    }

    if (Number(formData.centreType) === 1) {

      // const validationErrors = validateSkillCentreStudent(
      //   skillCentreFormData,
      //   isEditMode
      // );

      // if (Object.keys(validationErrors).length > 0) {
      //   setErrors(validationErrors);
      //   return;
      // }

      const dataToSend = new FormData();

      Object.keys(skillCentreFormData).forEach((key) => {
        if (
          skillCentreFormData[key] !== null &&
          skillCentreFormData[key] !== ""
        ) {
          dataToSend.append(key, skillCentreFormData[key]);
        }
      });

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

      return;
    }
  };

  const renderSchoolStudentForm = () => (
    <>
      <div className="col-md-4">
        <FormSelect
          label="School"
          name="schoolId"
          value={formData.schoolId}
          onChange={handleChange}
          options={filteredCentres?.map((school) => ({
            label: school.centerName,
            value: school.id,
          }))}
          error={errors.schoolId}
          mandatory
        />
      </div>

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
    </>
  );

  const renderSkillCentreStudentForm = () => (
    <>

      {/* {formData.centreType === 2 && ( */}
      <div className="col-md-4">
        <FormSelect
          label="Skill Centre"
          name="skillCentreId"
          value={skillCentreFormData.skillCentreId}
          onChange={handleSkillChange}
          options={filteredCentres?.map((school) => ({
            label: school.centerName,
            value: school.id,
          }))}
          error={errors.skillCentreId}
          mandatory
        />
      </div>
      {/* )} */}

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
          value={formatToInputDate(skillCentreFormData.dob)}
          onChange={handleSkillChange}
          error={errors.dob}
          mandatory
        />
      </div>

      {/* Adhar Number */}
      <div className="col-md-4">
        <FormSelect
          label="Batch"
          name="batchId"
          value={skillCentreFormData.batchId}
          onChange={handleSkillChange}
          options={grades.map((grade) => ({
            label: grade.gradeBatch,
            value: grade.id
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
          onChange={handleSkillChange}
          error={errors.studentPhoto}
        />
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
          label="Category"
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
        <FormInput
          label="Marital Status"
          name="maritalStatus"
          value={skillCentreFormData.maritalStatus}
          onChange={handleSkillChange}
          error={errors.maritalStatus}
          placeholder="Enter marital status"
          mandatory
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
        {/* {isEditMode && data?.photo && (
                    <img
                      src={`${BASE_URL_JOB}${data.photo}`}
                      width="80"
                      alt="trainer"
                    />
                  )} */}
      </div>

      <div className="col-md-4">
        <FormInput
          label="SSC Certificates"
          name="sscCertificate"
          type="file"
          placeholder="sscCertificate"
          onChange={handleSkillChange}
          mandatory={!isEditMode}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.sscCertificate}
        />
        {/* {isEditMode && data?.certificates?.length > 0 && (
                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      {data.certificates.map((cert, index) => (
                        <a
                          key={index}
                          href={`${BASE_URL_JOB}${cert.certificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View certificates
                        </a>
                      ))}
                    </div>
                  )} */}
      </div>


      <div className="col-md-4">
        <FormInput
          label="Intermediate Certificates"
          name="intermediateCertificate"
          type="file"
          placeholder="intermediateCertificate"
          onChange={handleSkillChange}
          mandatory={!isEditMode}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.intermediateCertificate}
        />
        {/* {isEditMode && data?.certificates?.length > 0 && (
                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      {data.certificates.map((cert, index) => (
                        <a
                          key={index}
                          href={`${BASE_URL_JOB}${cert.certificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View certificates
                        </a>
                      ))}
                    </div>
                  )} */}
      </div>


      <div className="col-md-4">
        <FormInput
          label="UG Certificates"
          name="ugCertificate"
          type="file"
          placeholder="ugCertificate"
          onChange={handleSkillChange}
          // mandatory={!isEditMode}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.ugCertificate}
        />
        {/* {isEditMode && data?.certificates?.length > 0 && (
                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      {data.certificates.map((cert, index) => (
                        <a
                          key={index}
                          href={`${BASE_URL_JOB}${cert.certificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View certificates
                        </a>
                      ))}
                    </div>
                  )} */}
      </div>

      <div className="col-md-4">
        <FormInput
          label="PG Certificates"
          name="pgCertificate"
          type="file"
          placeholder="pgCertificate"
          onChange={handleSkillChange}
          // mandatory={!isEditMode}
          multiple
          accept="application/pdf"
          error={!isEditMode && errors?.pgCertificate}
        />
        {/* {isEditMode && data?.certificates?.length > 0 && (
                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      {data.certificates.map((cert, index) => (
                        <a
                          key={index}
                          href={`${BASE_URL_JOB}${cert.certificate}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View certificates
                        </a>
                      ))}
                    </div>
                  )} */}
      </div>

      {/* <div className="col-md-4">
        <StatusSelect name="status" value={formData.status} handleChange={handleSkillChange} error={errors.status} />
      </div> */}
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
              <div className="col-md-4">
                <FormSelect
                  label="Project Type"
                  name="centreType"
                  value={formData.centreType}
                  onChange={handleChange}
                  mandatory
                  options={[
                    { label: "Skill Development", value: 1 },
                    { label: "AI & STEM Learning", value: 2 },
                    { label: "Education Development", value: 3 },
                    { label: "Innovation & Entrepreneurs", value: 4 },
                    { label: "Community Development", value: 5 },
                  ]}
                  error={errors.centreType}
                />
              </div>
              {Number(formData.centreType) === 2 && renderSchoolStudentForm()}
              {Number(formData.centreType) === 1 && renderSkillCentreStudentForm()}
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/superAdmin/manage-students")}
                saveText={createMutation.isPending ? "Saving..." : "Save"}
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
