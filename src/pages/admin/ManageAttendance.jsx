import React, { useState } from "react";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import SearchInput from "../../components/SearchInput";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import TableWrapper from "../../components/TableWrapper";


const ManageAttendance = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const getToday = () => { return new Date().toISOString().split("T")[0]; };
    const [attendanceDate, setAttendanceDate] = useState(getToday());


    const { useList } = useCrud({
        entity: "trainer",
        listUrl: "/trainer/attendance/list",
    });

    const { data, isLoading } = useList({
        attendanceDate: formatDateToDDMMYYYY(attendanceDate),
        search: search,
        attendanceStatus: status
    });


    const trainers = data?.data || [];
    const perPage = data?.perPage || 15;

    const resetFilters = () => {
        setPage(1);
        setAttendanceDate(new Date());
        setStatus("");
        setSearch("");
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
                        <h5 className="fw-bold mb-0">Trainer Attendance Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all trainer's attendance</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">
                    <div className="col-lg-3">
                        <SearchInput
                            value={search}
                            placeholder="Search by trainer name"
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-3">
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

                    <div className="col-lg-3 col-md-6">
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
                                    <th>Trainer Name</th>
                                    <th>Trainer Code</th>
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
                                ) : trainers.length ? (
                                    trainers.map((t, i) => (
                                        <tr key={t.id}>
                                            <td>{(page - 1) * perPage + i + 1}</td>
                                            <td>{t.trainer?.fullName}</td>
                                            <td>{t.trainer?.trainerCode}</td>
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
                    </TableWrapper>

                </div>

            </div>
        </div>
    );
};

export default ManageAttendance;
