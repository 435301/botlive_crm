import React, { useState } from "react";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";


const ManageStudentAttendanceReport = () => {

    const [centreType, setCentreType] = useState("");
    // const [centreId, setCentreId] = useState("");
    const getToday = () => { return new Date().toISOString().split("T")[0]; };
    const [attendanceDate, setAttendanceDate] = useState(getToday());

    const { useList } = useCrud({
        entity: "reports",
        listUrl: "/admin/getAttendanceReportsByType",
    });

    const { data, isLoading } = useList({
        centreType,
        attendanceDate: formatDateToDDMMYYYY(attendanceDate),
    });

    const reports = data?.data || [];

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
        setCentreType("")
    };
    // const { schoolsData } = useSchools();
    // const filteredCentres = centreType ? schoolsData?.filter((school) => school.centerType === centreType) : schoolsData;

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
                        <h5 className="fw-bold mb-0"> Students Attendance Report</h5>
                        <p className="sub-text mb-0">View all students attendance records</p>
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

                </div>
            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">


                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={centreType}
                            placeholder="All Centre Types"
                            options={[
                                { label: "Skill Development", value: 1 },
                                { label: "AI & STEM Learning", value: 2 },
                                { label: "School Education", value: 3 },
                                { label: "Innovation & Entrepreneurship", value: 4 },
                                { label: "Community Development", value: 5 },
                            ]}
                            onChange={(value) => {
                                setCentreType(value);
                                // setCentreId(null);
                            }}
                        />
                    </div>

                    {/* <div className="col-lg-2 col-md-6">
                        <SelectFilter
                            value={centreId}
                            placeholder="All Centre Names"
                            options={filteredCentres?.map((school) => ({
                                label: school.centerName,
                                value: school.id
                            }))}
                            onChange={(value) => {
                                setCentreId(value);
                            }}
                        />
                    </div> */}

                    <div className="col-lg-3">
                        <input
                            type="date"
                            className="form-control"
                            value={attendanceDate}
                            onChange={(e) => {
                                setAttendanceDate(e.target.value);
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
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <TableWrapper>
                        <table className="table table-bordered table-striped align-middle student-modern-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Centre Name</th>
                                    <th>Area</th>
                                    <th>Total Students</th>
                                    <th>Total Enrolled</th>
                                    <th>Total Male</th>
                                    <th>Total Female</th>
                                    <th>Total Absent</th>
                                    <th>Total Present</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5">Loading...</td>
                                    </tr>
                                ) : reports.length ? (
                                    reports.map((t, i) => (
                                        <tr key={t.id}>
                                            <td>{i + 1}</td>
                                            <td>{t.centerName}</td>
                                            <td>{t.area}</td>
                                            <td>{t.totalStudents}</td>
                                            <td>{t.totalEnrolled}</td>
                                            <td>{t.totalMale}</td>
                                            <td>{t.totalFemale}</td>
                                            <td>{t.totalAbsent}</td>
                                            <td>{t.totalPresent}</td>
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
                    </TableWrapper>

                </div>

            </div>
        </div>
    );
};

export default ManageStudentAttendanceReport;
