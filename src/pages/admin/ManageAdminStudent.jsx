import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
// import BASE_URL_JOB from "../../config/config";
import useSchools from "../../hooks/useSchools";
import Cookies from "js-cookie";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import FormSelect from "../../components/FormSelect";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import TableWrapper from "../../components/TableWrapper";

const ManageAdminStudents = () => {
  const navigate = useNavigate();
  const schoolSkillCentreId = JSON.parse(Cookies.get("sub_admin") || "{}")?.id
  const centreType = JSON.parse(Cookies.get("sub_admin") || "{}")?.centerType;
  console.log('centreType', centreType, schoolSkillCentreId)
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    performanceTitle: "",
    fromDate: "",
    toDate: ""
  });

  const { useList, deleteMutation } = useCrud({
    entity: "student/school",
    listUrl: "/student/list",
    getUrl: (id) => `/student/${id}`,
    updateUrl: (id) => `/student/school/update/${id}`,
    deleteUrl: (id) => `/student/delete/${id}`,
  });

  const { data, isLoading } = useList({
    search,
    status,
    page,
    centreType: centreType,
    centreId: schoolSkillCentreId,
  });

  const { useGetAll, createMutation } = useCrud({
    entity: "performance",
    getAllUrl: "/student/get/performances",
    createUrl: "/student/updatePerformance",
  });

  const { data: performanceResponse } = useGetAll();
  const performances = performanceResponse?.data || [];

  const handlePerformanceSubmit = async () => {
    try {
      const payload = {
        studentId: selectedStudentId,
        performanceTitle: performanceData.performanceTitle,
        fromDate: performanceData.fromDate,
        toDate: performanceData.toDate,
      };
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowPerformanceModal(false);
          setSelectedStudentId(null);
          setPerformanceData({
            performanceTitle: "",
            fromDate: "",
            toDate: ""
          });
        }
      });

    } catch (error) {

    }
  };

  const schools = data?.data || [];
  const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
  const perPage = data?.perPage || 15;
  const { schoolsData } = useSchools();
  console.log('centerName', schoolsData)

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

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    deleteMutation.mutate(deleteId);
  };

  const handlePerformanceClick = (id) => {
    setSelectedStudentId(id);
    setShowPerformanceModal(true);
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
            to="/admin/add-student"
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
            <TableWrapper>
              <table className="table table-bordered table-striped align-middle student-modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Grade/Skill</th>
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
                        <td>{(page - 1) * perPage + index + 1}</td>
                        <td>{s.fullName || "-"}</td>
                        <td>{s.mobile || "-"}</td>
                        <td>{s.email || "-"}</td>
                        <td>{s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : s.gender === 3 ? "Other" : "-"}</td>
                        <td>{s.dob || "-"}</td>
                        <td>{s?.gradeBatch?.gradeBatch}</td>
                        <td>{s.enrolmentNumber || "-"}</td>
                        <td>{s.aadharNumber || "-"}</td>
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
                          <button
                            className="btn btn-outline-warning btn-sm me-2" onClick={() => handlePerformanceClick(s.id)} title="Update Performance"
                          >
                            <i className="bi bi-graph-up"></i>
                          </button>
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/admin/edit-student/${s.id}`)}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-outline-success btn-sm me-2" onClick={() => navigate(`/admin/view-student/${s.id}`)}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(s.id)} >
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
            </TableWrapper>

          </div>

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
          {showPerformanceModal && (
            <div className="modal show fade d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Performance</h5>
                    <button
                      className="btn-close"
                      onClick={() => setShowPerformanceModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <FormSelect
                        label="Performance Title"
                        name="performanceTitle"
                        value={performanceData.performanceTitle}
                        onChange={(e) =>
                          setPerformanceData({
                            ...performanceData,
                            performanceTitle: e.target.value
                          })
                        }
                        options={performances?.map((performance) => ({
                          label: performance.title,
                          value: String(performance.id)
                        }))}
                      />
                    </div>

                    <div className="mb-3">
                      <label>From Date</label>
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) =>
                          setPerformanceData({
                            ...performanceData,
                            fromDate: formatDateToDDMMYYYY(e.target.value)
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label>To Date</label>
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) =>
                          setPerformanceData({
                            ...performanceData,
                            toDate: formatDateToDDMMYYYY(e.target.value)
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowPerformanceModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handlePerformanceSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAdminStudents;
