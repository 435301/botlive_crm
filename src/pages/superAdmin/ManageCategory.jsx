import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import TableWrapper from "../../components/TableWrapper";

const ManageCategory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { useList, deleteMutation } = useCrud({
    entity: "category",
    listUrl: "/category/list",
    getUrl: (id) => `/category/${id}`,
    createUrl: "/category/add",
    updateUrl: (id) => `/category/update/${id}`,
    deleteUrl: (id) => `/category/delete/${id}`,
  });

  const { data, isLoading } = useList({
    search,
    status,
    page,
  });

  const category = data?.data || [];
  const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));

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
        {/* Modern heading with skill icon */}
        <div className="d-flex align-items-center heading-with-icon">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Social Status Management</h5>
            <p className="sub-text mb-0">
              View, edit and manage all social statuses in the system
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
            to="/superAdmin/add-social-status"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add Social Status
          </Link>
        </div>
      </div>
      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-lg-4 col-md-6">
            <SearchInput
              value={search}
              placeholder="Search by social status"
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
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-5 col-md-12">
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
            <TableWrapper>
              <table className="table table-bordered table-striped align-middle student-modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Social Status Id</th>
                    <th>Social Status</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="text-centre py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : category.length > 0 ? (
                    category.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.category}</td>
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
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-social-status/${item?.id}`)}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item?.id)}>
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
            </TableWrapper>

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

export default ManageCategory;
