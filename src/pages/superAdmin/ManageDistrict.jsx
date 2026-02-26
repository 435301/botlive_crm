import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";


const ManageDistrict = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [stateId, setStateId] = useState("")

  const { useList, deleteMutation } = useCrud({
    entity: "district",
    listUrl: "/district/list",
    getUrl: (id) => `/district/${id}`,
    createUrl: "/district/add",
    updateUrl: (id) => `/district/update/${id}`,
    deleteUrl: (id) => `/district/delete/${id}`,
  });

  const { useList: stateListQuery } = useCrud({
    entity: "state",
    listUrl: "/state/list",
  });

  const { data: stateList } = stateListQuery({ page: 1, search: "", status: 1, });
  const states = stateList?.data || []

  const { data, isLoading } = useList({
    search,
    status,
    page,
  });

  const districts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    deleteMutation.mutate(deleteId);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
    setStateId("");
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
            <h5 className="fw-bold mb-0">District Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all districts
            </p>
          </div>
          {/* Right: Action Buttons */}
        </div>

        {/* Add Skill Center button */}
        <div className="d-flex gap-2">
          <Link
            to="/add-district"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add district
          </Link>
        </div>
      </div>
      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-3 col-md-6">
            <SearchInput
              value={search}
              placeholder="Search by district name"
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>
          <div className="col-md-2">
            <SelectFilter
              value={stateId}
              placeholder="All States"
              options={states.map((state) => ({
                label: state.stateName,
                value: String(state.id),
              }))}
              onChange={(value) => {
                setStateId(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-3 col-md-6">
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
                  <th>State Name</th>
                  <th>District Name</th>
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
                ) : districts?.length > 0 ? (
                  districts?.map((item, index) => (
                    <tr key={item?.id}>
                      <td>{index + 1}</td>
                      <td>{item?.state?.stateName}</td>
                      <td>{item?.districtName}</td>
                      <td>
                        <span
                          className={`badge ${item.status === 1
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                        >
                          {item.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/edit-district/${item.id}`)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item.id)}>
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

export default ManageDistrict;
