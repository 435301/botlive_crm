import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import useStates from "../../hooks/useStates";
import useDistricts from "../../hooks/useDistricts";
import DeleteConfirmationModal from "../../Modals/deleteModal";


const ManageSkillCenters = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { useList, deleteMutation } = useCrud({
    entity: "skillCenter",
    listUrl: "/skillCenter/list",
    deleteUrl: (id) => `/skillCenter/delete/${id}`,
  });

  const { data, isLoading } = useList({
    search,
    status,
    page,
    stateId: state,
    districtId: district,
    centerType: type,
  });
  const skills = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const { states } = useStates();
  const { districts } = useDistricts();

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

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDistrict("");
    setState("");
    setType("")
    setPage(1);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    deleteMutation.mutate(deleteId);
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
            to="/superAdmin/add-skills"
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
              options={states.map((state) => ({
                label: state.stateName,
                value: state.id
              }))}
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
              options={districts.map((district) => ({
                label: district.districtName,
                value: district.id
              }))}
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
                { label: "Skill Centre", value: 1 },
                { label: "School", value: 2 },
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
                  <th>Founder</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : skills?.length > 0 ? (
                  skills?.map((center, index) => (
                    <tr key={center.centerCode}>
                      <td>{index + 1}</td>
                      <td className="">{center.centerCode}</td>
                      <td>{center.centerName}</td>
                      <td>{center.centerType === 1 ? "Skill Centre" : "School"}</td>
                      <td>{center.address}</td>
                      <td>{center.contactPerson}</td>
                      <td>{center.mobile}</td>
                      <td>{center.email}</td>
                      <td>{center.password}</td>
                      <td>{center.state?.stateName}</td>
                      <td>{center.district?.districtName}</td>
                      <td>{center.area}</td>
                      <td>{center.founder?.name}</td>

                      <td>
                        <span
                          className={`badge ${center.status === 1
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {center.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-skills/${center.id}`)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(center.id)}>
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

          <DeleteConfirmationModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSkillCenters;
