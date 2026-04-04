import React, { useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";

const StudentAttendance= () => {
    const currentDate = new Date();

    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [year, setYear] = useState(currentDate.getFullYear());

    const { useList } = useCrud({
        entity: "student",
        listUrl: "/student/getAttendance",
    });

    const { data, isLoading } = useList({
        month: month,
        year: year,
    });


    const students = data?.data || [];
    const resetFilters = () => {
        setMonth(currentDate.getMonth() + 1)
        setYear(currentDate.getFullYear());
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
                        <h5 className="fw-bold mb-0"> Monthly Attendance Report</h5>
                        <p className="sub-text mb-0">View attendance report</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">


                    <div className="col-lg-2">
                        <select
                            className="form-select"
                            value={month}
                            onChange={(e) => {
                                setMonth(Number(e.target.value));
                            }}
                        >
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((m, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-lg-2">
                        <select
                            className="form-select"
                            value={year}
                            onChange={(e) => {
                                setYear(Number(e.target.value));
                            }}
                        >
                            {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i)
                                .map((yr) => (
                                    <option key={yr} value={yr}>
                                        {yr}
                                    </option>
                                ))}
                        </select>
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
                    <TableWrapper>
                        <table className="table table-bordered table-striped align-middle student-modern-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Status </th>
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
                                            <td>{t?.attendanceDate}</td>
                                            <td>{t?.attendanceStatus === 1 ? "Present" : "Absent"}</td>
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

            </div>
        </div>
    );
};

export default StudentAttendance;
