import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";


const ManageModule = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  const { useList, deleteMutation } = useCrud({
    entity: "module",
    listUrl: "/module/list",
    getUrl: (id) => `/module/${id}`,
    updateUrl: (id) => `/module/update/${id}`,
    deleteUrl: (id) => `/module/delete/${id}`,
  });

  const { data, isLoading } = useList({
    search,
    status,
    page,
    courseId,
  });

  const modules = data?.data || [];
  const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
  const perPage = data?.perPage || 15;
  const { useList: CourseListQuery } = useCrud({
    entity: "course",
    listUrl: "/course/list",
  });

  const { data: courseList } = CourseListQuery({ page: "", search: "", status: 1, courseId: courseId });
  const courses = courseList?.data || []
  console.log('courses', courses)

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
    setCourseId("");
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
            <h5 className="fw-bold mb-0">Modules Management</h5>
            <p className="sub-text mb-0">View, edit and manage all modules</p>
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
            to="/superAdmin/add-module"
            className="btn add-skill-btn d-flex align-items-center"
          >
            <i className="ti ti-graduation-cap me-2"></i>
            Add Module
          </Link>
          {/* Add Skill Center */}
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="filter-wrapper mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <SearchInput
              value={search}
              placeholder="Search by module name"
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-md-3">
            <SelectFilter
              value={courseId}
              placeholder="All Courses"
              options={courses?.map((course) => ({
                label: course.courseTitle,
                value: String(course.id)
              }))}
              onChange={(value) => {
                setCourseId(value);
                setPage(1);
              }}
            />
          </div>

          <div className="col-md-3">
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
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle student-modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Module Name</th>
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
              ) : modules.length ? (
                modules.map((t, i) => (
                  <tr key={t.id}>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{t.course.courseTitle}</td>
                    <td>{t.moduleTitle}</td>
                    <td>
                      <span
                        className={`badge ${t.status === 1 ? "bg-success" : "bg-secondary"
                          }`}
                      >
                        {t.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-module/${t.id}`)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(t.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
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
  );
};

export default ManageModule;
