import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
// import BASE_URL_JOB from "../../config/config";
import useSchools from "../../hooks/useSchools";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import FormSelect from "../../components/FormSelect";


const ManageStudents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [centreType, setCentreType] = useState("");
  const [centreId, setCentreId] = useState("");
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
  }

  const { data, isLoading } = useList({
    search,
    status,
    page,
    centreType,
    centreId,
  });

  const schools = data?.data || [];
  console.log('schools', schools)
  const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
  const perPage = data?.perPage || 15;

  const statistics = data.statistics || [];
  console.log('statistics', statistics)

  const { schoolsData } = useSchools();
  console.log('centerName', schoolsData)


  const resetFilters = () => {
    setSearch("");
    setCentreType("");
    setCentreId("");
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
  const filteredCentres = centreType
    ? schoolsData?.filter((school) => school.centerType === centreType)
    : schoolsData;

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

  const centreStats = [
    {
      title: "Skill Development Centres",
      icon: "bi-building",
      iconColor: "text-success",
      total: statistics[0]?.totalStudents || 0,
      male: statistics[0]?.totalMale || 0,
      female: statistics[0]?.totalFemale || 0,
    },
    {
      title: "AI & STEM Learning",
      icon: "bi-mortarboard",
      iconColor: "text-primary",
      total: statistics[1]?.totalStudents || 0,
      male: statistics[1]?.totalMale || 0,
      female: statistics[1]?.totalFemale || 0,
    },
    {
      title: "Educational Development",
      icon: "bi-journal-bookmark",
      iconColor: "text-warning",
      total: statistics[2]?.totalStudents || 0,
      male: statistics[2]?.totalMale || 0,
      female: statistics[2]?.totalFemale || 0,

    },
    {
      title: "Innovation and Entrepreneurs Centres",
      icon: "bi-lightbulb",
      iconColor: "text-info",
      total: statistics[3]?.totalStudents || 0,
      male: statistics[3]?.totalMale || 0,
      female: statistics[3]?.totalFemale || 0,
    },
    {
      title: "Community Development Centres",
      icon: "bi-people",
      iconColor: "text-secondary",
      total: statistics[4]?.totalStudents || 0,
      male: statistics[4]?.totalMale || 0,
      female: statistics[4]?.totalFemale || 0,

    }
  ];
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
            to="/superAdmin/add-student"
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
              value={centreType}
              placeholder="All Centre Types"
              options={[
                { label: "Skill Development", value: 1 },
                { label: "AI & STEM Learning", value: 2 },
                { label: "Education Development", value: 3 },
                { label: "Innovation & Entrepreneurs", value: 4 },
                { label: "Community Development", value: 5 },
              ]}
              onChange={(value) => {
                setCentreType(value);
                setCentreId(null);
                setPage(1);
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <SelectFilter
              value={centreId}
              placeholder="All Centre Names"
              options={filteredCentres?.map((school) => ({
                label: school.centerName,
                value: school.id
              }))}
              onChange={(value) => {
                setCentreId(value);
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
      <div className="container my-3">
        <div className="row g-3">

          {/* Cards */}
          {centreStats.map((item, index) => (
            <div className="col-12 col-md-4" key={index}>
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body d-flex align-items-center py-2 px-3">

                  {/* Icon */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-2 manageCardsIcon"
                  >
                    <i className={`bi ${item.icon} fs-6 ${item.iconColor}`}></i>
                  </div>

                  {/* Content */}
                  <div className="flex-grow-1">

                    <strong>{item.title}</strong>

                    <div className="d-flex gap-3 mt-1 flex-wrap">
                      <div>
                        <small className="text-muted me-1">Enrolled:</small>
                        <span className="fw-bold manageCardsTitle">
                          {item.total}
                        </span>
                      </div>

                      <div>
                        <small className="text-muted me-1">Male:</small>
                        <span className="fw-bold manageCardsTitle">
                          {item.male}
                        </span>
                      </div>

                      <div>
                        <small className="text-muted me-1">Female:</small>
                        <span className="fw-bold manageCardsTitle">
                          {item.female}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}


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
                  <th>Project Type</th>
                  <th>Center Name</th>
                  <th>Student Name</th>
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
                      <td>
                        {s.centre.centerType === 1
                          ? "Skill Development"
                          : s.centre.centerType === 2
                            ? "AI & STEM Learning"
                            : s.centre.centerType === 3
                              ? "Education Development"
                              : s.centre.centerType === 4
                                ? "Innovation & Entrepreneurs"
                                : s.centre.centerType === 5 ?
                                  "Community Development" : ""}
                      </td>
                      <td>{s?.centre?.centerName || "-"}</td>
                      <td>{s.fullName || "-"}</td>
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
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-student/${s.id}`)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-success btn-sm me-2" onClick={() => navigate(`/superAdmin/view-student/${s.id}`)}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(s.id)}>
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

export default ManageStudents;
