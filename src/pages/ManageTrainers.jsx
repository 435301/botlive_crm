import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const trainers = [
  {
    trainerCode: "TRN-001",
    fullName: "Ramesh Kumar",
    centerType: "Skill Center",
    centerName: "Hyderabad Skill Center",
    mobile: "9876543210",
    email: "ramesh@gmail.com",
    qualification: "B.Tech",
    joiningDate: "2023-01-10",
    status: "Working",
  },
  {
    trainerCode: "TRN-002",
    fullName: "Anita Sharma",
    centerType: "School",
    centerName: "Green Valley School",
    mobile: "9123456789",
    email: "anita@gmail.com",
    qualification: "M.Sc",
    joiningDate: "2022-06-15",
    status: "Resigned",
  },
  {
    trainerCode: "TRN-003",
    fullName: "Suresh Rao",
    centerType: "Skill Center",
    centerName: "Tech Skill Hub",
    mobile: "9988776655",
    email: "suresh@gmail.com",
    qualification: "BCA",
    joiningDate: "2024-02-01",
    status: "Working",
  },
  {
    trainerCode: "TRN-001",
    fullName: "Ramesh Kumar",
    centerType: "Skill Center",
    centerName: "Hyderabad Skill Center",
    mobile: "9876543210",
    email: "ramesh@gmail.com",
    qualification: "B.Tech",
    joiningDate: "2023-01-10",
    status: "Working",
  },
  {
    trainerCode: "TRN-002",
    fullName: "Anita Sharma",
    centerType: "School",
    centerName: "Green Valley School",
    mobile: "9123456789",
    email: "anita@gmail.com",
    qualification: "M.Sc",
    joiningDate: "2022-06-15",
    status: "Resigned",
  },
  {
    trainerCode: "TRN-003",
    fullName: "Suresh Rao",
    centerType: "Skill Center",
    centerName: "Tech Skill Hub",
    mobile: "9988776655",
    email: "suresh@gmail.com",
    qualification: "BCA",
    joiningDate: "2024-02-01",
    status: "Working",
  },
];

const ManageTrainers = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  /* ===== FILTER ===== */
  const filteredTrainers = trainers.filter((t) => {
    const matchSearch =
      t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.trainerCode.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? t.status === status : true;

    return matchSearch && matchStatus;
  });

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredTrainers.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredTrainers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearch("");
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
            <h5 className="fw-bold mb-0">Manage Trainers</h5>
            <p className="sub-text mb-0">
              View, edit and manage all skill centers
            </p>
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
            to="/add-trainers"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add Trainer
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
              placeholder="Search by trainer name or code"
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
              <option value="Working">Working</option>
              <option value="Resigned">Resigned</option>
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
                  <th>Trainer Code</th>
                  <th>Trainer Name</th>
                  <th>Center Type</th>
                  <th>Center Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((t, index) => (
                    <tr key={t.trainerCode}>
                      <td>{startIndex + index + 1}</td>
                      <td>{t.trainerCode}</td>
                      <td>{t.fullName}</td>
                      <td>{t.centerType}</td>
                      <td>{t.centerName}</td>
                      <td>{t.mobile}</td>
                      <td>{t.email}</td>
                      <td>{t.qualification}</td>
                      <td>{t.joiningDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            t.status === "Working"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {t.status}
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
                    <td colSpan="11" className="text-center text-muted py-4">
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

export default ManageTrainers;
