import React, { useState } from "react";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import SearchInput from "../../components/SearchInput";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import Cookies from "js-cookie";
import useGrades from "../../hooks/useGrades";
import useSchools from "../../hooks/useSchools";


const ManageSuperAdminStudentAttendance = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(1);
    const [gradeBatchId, setGradeBatchId] = useState("");
    const [centreType, setCentreType] = useState("");
    const [centreId, setCentreId] = useState("");
    const getToday = () => { return new Date().toISOString().split("T")[0]; };
    const [attendanceDate, setAttendanceDate] = useState(getToday());

    const schoolSkillCentreId = JSON.parse(Cookies.get("trainer") || "{}")?.centreId;

    const { useList } = useCrud({
        entity: "admin",
        listUrl: "/admin/attendance/list",
    });

    const { data, isLoading } = useList({
        attendanceDate: formatDateToDDMMYYYY(attendanceDate),
        search: search,
        attendanceStatus: status,
        gradeBatchId: gradeBatchId,
        centreId: schoolSkillCentreId
    });

    const students = data?.data || [];
      console.log('students', students)
    const perPage = data?.perPage || 100;

    const { grades } = useGrades(centreType);

    const { schoolsData } = useSchools();

    const filteredCentres = centreType
        ? schoolsData?.filter((school) => school.centerType === centreType)
        : schoolsData;

    const resetFilters = () => {
        setPage(1);
        setAttendanceDate(new Date());
        setStatus("");
        setSearch("");
        setGradeBatchId("");
        setCentreId("");
        setCentreType("");
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
                        <h5 className="fw-bold mb-0">Student Attendance Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all students's attendance</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">
                    <div className="col-lg-2">
                        <SearchInput
                            value={search}
                            placeholder="Search by student name"
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
                    <div className="col-md-2">
                        <SelectFilter
                            value={gradeBatchId}
                            name="gradeBatchId"
                            placeholder="All Grades"
                            options={grades.map((grade) => ({
                                label: grade.gradeBatch,
                                value: String(grade.id)
                            }))}
                            onChange={(value) => {
                                setGradeBatchId(value);
                            }}
                        />
                    </div>

                    <div className="col-lg-2">
                        <input
                            type="date"
                            className="form-control"
                            value={attendanceDate}
                            onChange={(e) => {
                                setAttendanceDate(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-2">
                        <SelectFilter
                            value={status}
                            placeholder="All Status"
                            options={[
                                { label: "Present", value: 1 },
                                { label: "Absent", value: 2 },
                            ]}
                            onChange={(value) => {
                                setStatus(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-1">
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
                                <th>Student Name</th>
                                <th>Student Enrollment Number</th>
                                <th>Centre Name</th>
                                <th>Grade</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : students.length ? (
                                students.map((t, i) => (
                                    <tr key={t.id}>
                                        <td>{(page - 1) * perPage + i + 1}</td>
                                        <td>{t.student?.fullName}</td>
                                        <td>{t.student?.enrolmentNumber}</td>
                                        <td>{t?.student?.centre?.centerName || "-"}</td>
                                        <td>{t?.student?.gradeBatch?.gradeBatch || "-"}</td>
                                        <td>{t.attendanceDate}</td>
                                        <td>
                                            <span
                                                className={`badge ${t.attendanceStatus === 1
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                    }`}
                                            >
                                                {t.attendanceStatus === 1 ? "Present" : "Absent"}
                                            </span>
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

            </div>
        </div>
    );
};

export default ManageSuperAdminStudentAttendance;
