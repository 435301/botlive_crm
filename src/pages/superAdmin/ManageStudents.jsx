import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
// import BASE_URL_JOB from "../../config/config";
import useSchools from "../../hooks/useSchools";


const ManageStudents = () => {
  const [search, setSearch] = useState("");
  const [centreType, setCentreType] = useState("");
  const [centreId, setCentreId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { useList } = useCrud({
    entity: "student/school",
    listUrl: "/student/list",
    getUrl: (id) => `/student/school/${id}`,
    updateUrl: (id) => `/student/school/update/${id}`,
    deleteUrl: (id) => `/student/school/delete/${id}`,
  });

  const { data, isLoading } = useList({
    search,
    status,
    page,
    centreType,
    centreId,
  });

  const schools = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const { schoolsData } = useSchools();

  const resetFilters = () => {
    setSearch("");
    setCentreType("");
    setCentreId("");
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
            to="/superAdmin/add-student"
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
          <div className="col-lg-4 col-md-6">
            <SearchInput
              value={search}
              placeholder="Search by student, mobile, enrollment no.. "
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={centreType}
              placeholder="All Centre Types"
              options={[
                { label: "Skill Centre", value: 1 },
                { label: "School", value: 2 },
              ]}
              onChange={(value) => {
                setCentreType(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={centreId}
              placeholder="All Centre Names"
              options={schoolsData?.map((school) => ({
                label: school.centerName,
                value: school.id
              }))}
              onChange={(value) => {
                setCentreType(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={status}
              placeholder="All Status"
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-12">
            <div className="d-flex gap-2">
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
                  <th>Centre Type</th>
                  <th>Center Name</th>
                  <th>Student Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  {/* <th>Grade/Batch</th> */}
                  <th>Enrollment Number</th>
                  <th>Aadhar Number</th>
                  {/* <th>Photo</th> */}
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="12" className="text-center py-5">Loading...</td>
                  </tr>
                ) : schools.length > 0 ? (
                  schools.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>{s.centerType === 2 ? "School" : "Skill Centre"}</td>
                      <td>{s.centre.centerName}</td>
                      <td>{s.fullName}</td>
                      <td>{s.mobile}</td>
                      <td>{s.email}</td>
                      <td>{s.gender === 1 ? "Male" : 2 ? "Female" : 3 ? "Other" : ""}</td>
                      <td>{s.dob}</td>
                      {/* <td>{s.gradeBatchId}</td> */}
                      <td>{s.enrolmentNumber}</td>
                      <td>{s.aadharNumber}</td>
                      {/* <td>
                        <img
                          src={`${BASE_URL_JOB}${s.studentPhoto}`}
                          alt={s.studentName}
                          style={{ width: "50px", borderRadius: "50%" }}
                        />
                      </td> */}
                      <td>
                        <span
                          className={`badge ${s.status === 1
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {s.status === 1 ? "Active" : "Inactive"}
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
