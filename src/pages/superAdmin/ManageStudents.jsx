import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";

/* ===== SAMPLE STUDENT DATA ===== */
const studentsData = [
  {
    id: 1,
    courseType: "Full-time",
    centerName: "Hyderabad Skill Center",
    trainer: "Ramesh Kumar",
    course: "Web Development",
    enrollmentNumber: "ENR-001",
    studentName: "Amit Kumar",
    gender: "Male",
    dob: "2002-03-15",
    adharNumber: "123456789012",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9876543210",
    email: "amit@gmail.com",
    password: "********",
    status: "Active",
  },
  {
    id: 2,
    courseType: "Part-time",
    centerName: "Green Valley School",
    trainer: "Anita Sharma",
    course: "Python",
    enrollmentNumber: "ENR-002",
    studentName: "Neha Sharma",
    gender: "Female",
    dob: "2003-06-20",
    adharNumber: "987654321012",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9123456789",
    email: "neha@gmail.com",
    password: "********",
    status: "Inactive",
  },
  {
    id: 3,
    courseType: "Full-time",
    centerName: "Tech Skill Hub",
    trainer: "Suresh Rao",
    course: "Data Science",
    enrollmentNumber: "ENR-003",
    studentName: "Rahul Singh",
    gender: "Male",
    dob: "2001-11-05",
    adharNumber: "112233445566",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9988776655",
    email: "rahul@gmail.com",
    password: "********",
    status: "Active",
  },
  {
    id: 1,
    courseType: "Full-time",
    centerName: "Hyderabad Skill Center",
    trainer: "Ramesh Kumar",
    course: "Web Development",
    enrollmentNumber: "ENR-001",
    studentName: "Amit Kumar",
    gender: "Male",
    dob: "2002-03-15",
    adharNumber: "123456789012",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9876543210",
    email: "amit@gmail.com",
    password: "********",
    status: "Active",
  },
  {
    id: 2,
    courseType: "Part-time",
    centerName: "Green Valley School",
    trainer: "Anita Sharma",
    course: "Python",
    enrollmentNumber: "ENR-002",
    studentName: "Neha Sharma",
    gender: "Female",
    dob: "2003-06-20",
    adharNumber: "987654321012",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9123456789",
    email: "neha@gmail.com",
    password: "********",
    status: "Inactive",
  },
  {
    id: 3,
    courseType: "Full-time",
    centerName: "Tech Skill Hub",
    trainer: "Suresh Rao",
    course: "Data Science",
    enrollmentNumber: "ENR-003",
    studentName: "Rahul Singh",
    gender: "Male",
    dob: "2001-11-05",
    adharNumber: "112233445566",
    studentPhoto: "https://via.placeholder.com/50",
    mobile: "9988776655",
    email: "rahul@gmail.com",
    password: "********",
    status: "Active",
  },
];

const ManageStudents = () => {
  const [search, setSearch] = useState("");
  const [courseType, setCourseType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  /* ===== FILTER ===== */
  const filteredStudents = studentsData.filter((s) => {
    const matchSearch =
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.enrollmentNumber.toLowerCase().includes(search.toLowerCase());

    const matchCourseType = courseType ? s.courseType === courseType : true;
    const matchStatus = status ? s.status === status : true;

    return matchSearch && matchCourseType && matchStatus;
  });

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearch("");
    setCourseType("");
    setStatus("");
    setPage(1);
  };
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Imported file:", file);
      // later you can parse using XLSX library
    }
  };

  const handleExportExcel = () => {
    console.log("Export Excel clicked");
    // later you can generate excel using XLSX
  };

  return (
    <div className="container-fluid">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Modern heading with skill icon */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Manage Students</h5>
            <p className="sub-text mb-0">View, edit and manage all students</p>
          </div>
        </div>
        {/* Right: Action Buttons */}
        <div className="d-flex gap-2">
          {/* Import Excel */}
          <label className="btn btn-outline-success d-flex align-items-center mb-0">
            <i className="ti ti-upload me-2"></i>
            Import Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              hidden
              onChange={handleImportExcel}
            />
          </label>

          {/* Export Excel */}
          <button
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={handleExportExcel}
          >
            <i className="ti ti-download me-2"></i>
            Export Excel
          </button>

          {/* Add Skill Center button */}
          <Link
            to="/add-student"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add Student
          </Link>
        </div>

      </div>

      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-3 col-md-6">
            <SearchInput
              value={search}
              placeholder="Search by location"
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <SelectFilter
              value={courseType}
              placeholder="All Course Types"
              options={[
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
              ]}
              onChange={(value) => {
                setCourseType(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <SelectFilter
              value={status}
              placeholder="All Status"
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-3 col-md-12">
            <div className="d-flex gap-2">
              <button className="btn filter-btn">
                <i className="bi bi-search me-1"></i>
              </button>

              <button
                className="btn reset-btn"
                onClick={resetFilters}
                title="Reset"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card shadow-sm rounded-3 p-2">
        <div className="card-body p-1">
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle student-modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Type</th>
                  <th>Center Name</th>
                  <th>Trainer</th>
                  <th>Course</th>
                  <th>Enrollment Number</th>
                  <th>Student Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Aadhar Number</th>
                  <th>Photo</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((s, index) => (
                    <tr key={s.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{s.courseType}</td>
                      <td>{s.centerName}</td>
                      <td>{s.trainer}</td>
                      <td>{s.course}</td>
                      <td>{s.enrollmentNumber}</td>
                      <td>{s.studentName}</td>
                      <td>{s.gender}</td>
                      <td>{s.dob}</td>
                      <td>{s.adharNumber}</td>
                      <td>
                        <img
                          src={s.studentPhoto}
                          alt={s.studentName}
                          style={{ width: "50px", borderRadius: "50%" }}
                        />
                      </td>
                      <td>{s.mobile}</td>
                      <td>{s.email}</td>
                      <td>
                        <span
                          className={`badge ${s.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center text-muted py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
