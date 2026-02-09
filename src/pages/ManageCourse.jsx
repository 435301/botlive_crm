import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

/* ===== DUMMY DATA ===== */
const centers = [
  {
    id: 1,
    centerType: "School",
    centerName: "Green Valley School",
    courseOrGrade: "Grade 10",
    duration: "1 Year",
    status: "Active",
  },
  {
    id: 2,
    centerType: "Skill Center",
    centerName: "Hyderabad Skill Center",
    courseOrGrade: "Web Development",
    duration: "6 Months",
    status: "Active",
  },
  {
    id: 3,
    centerType: "Skill Center",
    centerName: "Tech Skill Hub",
    courseOrGrade: "Data Science",
    duration: "8 Months",
    status: "Inactive",
  },
  {
    id: 4,
    centerType: "School",
    centerName: "Bright Future School",
    courseOrGrade: "Grade 12",
    duration: "1 Year",
    status: "Active",
  },
];

const ManageCourse = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
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

  /* ===== FILTER LOGIC ===== */
  const filteredData = centers.filter((c) => {
    const matchSearch =
      c.centerName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseOrGrade.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? c.status === status : true;

    return matchSearch && matchStatus;
  });

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
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
            <h5 className="fw-bold mb-0">Course Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all skill centers
            </p>
          </div>
          {/* Right: Action Buttons */}
        </div>

        {/* Add Skill Center button */}
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
          <Link
            to="/add-course"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add Course
          </Link>
        </div>
      </div>
      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-4 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by center or course/grade"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-lg-5 col-md-12">
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
                  <th>Center Type</th>
                  <th>School / Skill Center</th>
                  <th>Course / Grade</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.centerType}</td>
                      <td>{item.centerName}</td>
                      <td>{item.courseOrGrade}</td>
                      <td>{item.duration}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "Active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status}
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
                    <td colSpan="7" className="text-center text-muted py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===== PAGINATION ===== */}
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

export default ManageCourse;
