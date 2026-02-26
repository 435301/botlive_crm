import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";

const skillCenters = [
  {
    centerCode: "CEN-001",
    name: "Hyderabad Skill Center",
    centerType: "Skill Center",
    address: "Madhapur, Hyderabad",
    contactPerson: "Ramesh Kumar",
    mobile: "9876543210",
    email: "hyd@center.com",
    password: "********",
    state: "Telangana",
    district: "Hyderabad",
    area: "Madhapur",
    status: "Active",
  },
  {
    centerCode: "CEN-002",
    name: "Green Valley School",
    centerType: "School",
    address: "Whitefield, Bangalore",
    contactPerson: "Anita Sharma",
    mobile: "9123456789",
    email: "gvs@school.com",
    password: "********",
    state: "Karnataka",
    district: "Bangalore",
    area: "Whitefield",
    status: "Inactive",
  },
  {
    centerCode: "CEN-003",
    name: "Tech Skill Hub",
    centerType: "Skill Center",
    address: "Gachibowli, Hyderabad",
    contactPerson: "Suresh Rao",
    mobile: "9988776655",
    email: "tech@hub.com",
    password: "********",
    state: "Telangana",
    district: "Hyderabad",
    area: "Gachibowli",
    status: "Active",
  },
  {
    centerCode: "CEN-004",
    name: "Bright Future School",
    centerType: "School",
    address: "HSR Layout, Bangalore",
    contactPerson: "Kavya Nair",
    mobile: "9090909090",
    email: "bright@school.com",
    password: "********",
    state: "Karnataka",
    district: "Bangalore",
    area: "HSR Layout",
    status: "Inactive",
  },
  {
    centerCode: "CEN-001",
    name: "Hyderabad Skill Center",
    centerType: "Skill Center",
    address: "Madhapur, Hyderabad",
    contactPerson: "Ramesh Kumar",
    mobile: "9876543210",
    email: "hyd@center.com",
    password: "********",
    state: "Telangana",
    district: "Hyderabad",
    area: "Madhapur",
    status: "Active",
  },
  {
    centerCode: "CEN-002",
    name: "Green Valley School",
    centerType: "School",
    address: "Whitefield, Bangalore",
    contactPerson: "Anita Sharma",
    mobile: "9123456789",
    email: "gvs@school.com",
    password: "********",
    status: "Inactive",
  },
  {
    centerCode: "CEN-003",
    name: "Tech Skill Hub",
    centerType: "Skill Center",
    address: "Gachibowli, Hyderabad",
    contactPerson: "Suresh Rao",
    mobile: "9988776655",
    email: "tech@hub.com",
    password: "********",
    status: "Active",
  },
  {
    centerCode: "CEN-004",
    name: "Bright Future School",
    centerType: "School",
    address: "HSR Layout, Bangalore",
    contactPerson: "Kavya Nair",
    mobile: "9090909090",
    email: "bright@school.com",
    password: "********",
    status: "Inactive",
  },
];

const ManageSkillCenters = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
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

  const ITEMS_PER_PAGE = 5;

  /* ===== FILTER LOGIC ===== */
  const filteredCenters = skillCenters.filter((center) => {
    const matchSearch =
      center.name.toLowerCase().includes(search.toLowerCase()) ||
      center.address.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? center.status === status : true;

    return matchSearch && matchStatus;
  });

  /* ===== PAGINATION LOGIC ===== */
  const totalPages = Math.ceil(filteredCenters.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCenters = filteredCenters.slice(
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
        {/* Left: Heading */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-0">Manage School/Skill Centers</h5>
            <p className="sub-text mb-0">
              View, edit and manage all school/skill centers
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

          {/* Add Skill Center */}
          <Link
            to="/add-skills"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add School/Skill Center
          </Link>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-2 col-md-4">
            <SearchInput
              value={search}
              placeholder="Search by name"
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={state}
              placeholder="All States"
              options={[
                { label: "Telangana", value: "Telangana" },
                { label: "Karnataka", value: "Karnataka" },
              ]}
              onChange={(value) => {
                setState(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={district}
              placeholder="All Districts"
              options={[
                { label: "Hyderabad", value: "Hyderabad" },
                { label: "Bangalore", value: "Bangalore" },
              ]}
              onChange={(value) => {
                setDistrict(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
             <SelectFilter
              value={type}
              placeholder="All Types"
              options={[
                { label: "School", value: "School" },
                { label: "Skill Center", value: "Skill Center" },
              ]}
              onChange={(value) => {
                setType(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
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

          <div className="col-lg-2 col-md-12">
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
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Center Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Area</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedCenters.length > 0 ? (
                  paginatedCenters.map((center, index) => (
                    <tr key={center.centerCode}>
                      <td>{startIndex + index + 1}</td>
                      <td className="">{center.centerCode}</td>
                      <td>{center.name}</td>
                      <td>{center.centerType}</td>
                      <td>{center.address}</td>
                      <td>{center.contactPerson}</td>
                      <td>{center.mobile}</td>
                      <td>{center.email}</td>
                      <td>{center.password}</td>
                      <td>{center.state}</td>
                      <td>{center.district}</td>
                      <td>{center.area}</td>
                      <td>
                        <span
                          className={`badge ${center.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {center.status}
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

export default ManageSkillCenters;
