import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import SelectFilter from "../components/SelectFilter";

/* ===== DUMMY DATA ===== */
const cities = [
  {
    id: 1,
    cityName: "Los Angeles",
    status: "Active",
  },
  {
    id: 2,
    cityName: "Houston",
    status: "Active",
  },
  {
    id: 3,
    cityName: "Miami",
    status: "Inactive",
  },
];
   

const ManageCity = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

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
            <h5 className="fw-bold mb-0">City Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all cities
            </p>
          </div>
          {/* Right: Action Buttons */}
        </div>

        {/* Add Skill Center button */}
        <div className="d-flex gap-2">
          <Link
            to="/add-city"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add City
          </Link>
        </div>
      </div>
      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-4 col-md-6">
            <SearchInput
              value={search}
              placeholder="Search by city name"
              onChange={(value) => {
                setSearch(value);
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
                  <th>City Name</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cities.length > 0 ? (
                  cities.map((item, index) => (
                    <tr key={item.id}>
                      <td>{ index + 1}</td>
                      <td>{item.cityName}</td>
                      <td>
                        <span
                          className={`badge ${item.status === "Active"
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
          {/* {totalPages > 1 && ( */}
            <Pagination
              currentPage={page}
            //   totalPages={totalPages}
              onPageChange={setPage}
            />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ManageCity;
