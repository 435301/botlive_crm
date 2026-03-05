import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useCrud } from "../../hooks/useCrud";

import DeleteConfirmationModal from "../../Modals/deleteModal";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link } from "react-router-dom";

const ManageSkillCenters = () => {
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

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDistrict("");
    setState("");
    setType("");
    setPage(1);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    deleteMutation.mutate(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="admin-main flex-grow-1">
        <AdminHeader />

        <div className="container-fluid">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center heading-with-icon">
              <div className="icon-badge">
                <i className="ti ti-certificate fs-16"></i>
              </div>

              <div>
                <h5 className="fw-bold mb-0">Report Skills</h5>
                <p className="sub-text mb-0">View and manage skill centers</p>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="filter-wrapper mb-3">
            <div className="row g-2">
              <div className="col-lg-3">
                <SearchInput
                  value={search}
                  placeholder="Search by school name"
                  onChange={(value) => {
                    setSearch(value);
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

          {/* TABLE */}
          <div className="card shadow-sm rounded-3">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "80px" }}>Sl No</th>
                      <th>Batch Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="2" className="text-center py-4">
                          Loading...
                        </td>
                      </tr>
                    ) : skills.length > 0 ? (
                      skills.map((center, index) => (
                        <tr key={center.id}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>
                            <Link
                              to={`/admin/skill-details`}
                              className="text-primary text-decoration-none fw-semibold"
                            >
                              {center.centerName}
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center text-muted py-4">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
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
      </div>
    </div>
  );
};

export default ManageSkillCenters;
