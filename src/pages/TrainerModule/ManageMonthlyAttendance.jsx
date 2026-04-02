import React, { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import SearchInput from "../../components/SearchInput";
import Cookies from "js-cookie";
import useGradesByTrainerId from "../../hooks/UseGradesByTrainerId";
import SelectFilter from "../../components/SelectFilter";
import TableWrapper from "../../components/TableWrapper";


const ManageMonthlyAttendance = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [gradeBatchId, setGradeBatchId] = useState("");
    const currentDate = new Date();

    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [year, setYear] = useState(currentDate.getFullYear());

    const schoolSkillCentreId = JSON.parse(Cookies.get("trainer") || "{}")?.centreId;
    const id = JSON.parse(Cookies.get("trainer") || "{}")?.id;

    const { useList } = useCrud({
        entity: "trainer",
        listUrl: "/trainerAdmin/monthly/attendance/list",
    });

    const { data, isLoading } = useList({
        month: month,
        year: year,
        search,
        gradeBatchId: gradeBatchId,
        centreId: schoolSkillCentreId
    });

    const { gradesByTrainerId } = useGradesByTrainerId(id);

    const students = data?.data || [];
    const dates = data?.dates || [];
    const perPage = data?.perPage || 100;

    const resetFilters = () => {
        setPage(1);
        setMonth(currentDate.getMonth() + 1)
        setYear(currentDate.getFullYear());
        setSearch("");
        setGradeBatchId("");
    };

    useEffect(() => {
        if (gradesByTrainerId?.length > 0 && !gradeBatchId) {
            setGradeBatchId(String(gradesByTrainerId[0].gradeBatchId));
        }
    }, [gradesByTrainerId, gradeBatchId]);

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
                        <h5 className="fw-bold mb-0">Student Monthly Attendance Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all students's monthly attendance</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">
                    <div className="col-lg-3">
                        <SearchInput
                            value={search}
                            placeholder="Search by student name"
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-2">
                        <select
                            className="form-select"
                            value={month}
                            onChange={(e) => {
                                setMonth(Number(e.target.value));
                                setPage(1);
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
                                setPage(1);
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

                    <div className="col-md-2">
                        <SelectFilter
                            value={gradeBatchId}
                            name="gradeBatchId"
                            placeholder="All Grades"
                            options={gradesByTrainerId.map((grade) => ({
                                label: grade.gradeName,
                                value: String(grade.gradeBatchId)
                            }))}
                            onChange={(value) => {
                                setGradeBatchId(value);
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
                                    <th> Name</th>
                                    <th> Enrollment </th>
                                    {dates.map((date) => (
                                        <th key={date}>{date.split("-")[0]}</th>
                                    ))}

                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Working</th>
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
                                        <tr key={t.studentId}>
                                            <td>{(page - 1) * perPage + i + 1}</td>
                                            <td>{t?.name}</td>
                                            <td>{t?.enrolmentNumber}</td>
                                            {dates.map((date) => (
                                                <td key={date}>
                                                    {t.attendance[date] === "P" ? (
                                                        <span className="text-success fw-bold">P</span>
                                                    ) : t.attendance[date] === "A" ? (
                                                        <span className="text-danger fw-bold">A</span>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            ))}

                                            <td className="text-success fw-bold">{t.presentDays}</td>
                                            <td className="text-danger fw-bold">{t.absentDays}</td>
                                            <td>{t.workingDays}</td>
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

export default ManageMonthlyAttendance;
