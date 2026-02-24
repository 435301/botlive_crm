import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SelectFilter from "../components/SelectFilter";

/* ===== SAMPLE MODULE DATA ===== */
const modulesData = [
    {
        id: 1,
        centerType: "Skill Center",
        centerName: "Hyderabad Skill Center",
        course: "Frontend Development",
        moduleName: "React Basics",
        chapterName: "Introduction to React",
        videos: ["intro.mp4", "components.mp4"],
        pdfs: ["react-basics.pdf"],
        status: "Active",
        priority: "Low"
    },
    {
        id: 2,
        centerType: "School",
        centerName: "Green Valley School",
        course: "Web Development",
        moduleName: "Python Fundamentals",
        chapterName: "DOM Manipulation",
        videos: ["syntax.mp4"],
        pdfs: ["python-notes.pdf", "examples.pdf"],
        status: "Inactive",
        priority: "Medium"
    },
    {
        id: 3,
        centerType: "Skill Center",
        centerName: "Tech Skill Hub",
        course: "Data Science",
        moduleName: "JS DOM Manipulation",
        chapterName: "Data Structures",
        videos: ["dom.mp4"],
        pdfs: ["js-dom.pdf"],
        status: "Active",
        priority: "High"
    },
];

const ManageAssignedChapters = () => {
    const [search, setSearch] = useState("");
    const [centerType, setCenterType] = useState("");
    const [course, setCourse] = useState("");
    const [module, setModule] = useState("");
    const [chapterName, setChapterName] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    /* ===== FILTER MODULES ===== */
    const filteredData = modulesData.filter((t) => {
        const matchSearch = t.moduleName
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchCenterType = centerType ? t.centerType === centerType : true;
        const matchStatus = status ? t.status === status : true;

        return matchSearch && matchCenterType && matchStatus;
    });

    /* ===== PAGINATION ===== */
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );
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
        setCenterType("");
        setStatus("");
        setPage(1);
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
                        <h5 className="fw-bold mb-0">Assigned Chapters Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all assigned chapters</p>
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
                        to="/add-assigned-chapter"
                        className="btn add-skill-btn d-flex align-items-center"
                    >
                        <i className="ti ti-graduation-cap me-2"></i>
                        Add Assign Chapters
                    </Link>
                    {/* Add Skill Center */}
                </div>
            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">

                    <div className="col-md-2">
                         <SelectFilter
                            value={course}
                            placeholder="All Courses"
                            options={[
                                { label: "Web Development", value: "Web Development" },
                                { label: "Frontend Development", value: "Frontend Development" },
                                { label: "Data Science", value: "Data Science" },
                            ]}
                            onChange={(value) => {
                                setCourse(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                          <SelectFilter
                            value={module}
                            placeholder="All Modules"
                            options={[
                                { label: "React Basics", value: "React Basics" },
                                { label: "Python Fundamentals", value: "Python Fundamentals" },
                                { label: "JS DOM Manipulation", value: "JS DOM Manipulation" },
                            ]}
                            onChange={(value) => {
                                setModule(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                         <SelectFilter
                            value={chapterName}
                            placeholder="All Chapters"
                            options={[
                                { label: "Introduction to React", value: "Introduction to React" },
                                { label: "Data Structures", value: "Data Structures" },
                                { label: "DOM Manipulation", value: "DOM Manipulation" },
                            ]}
                            onChange={(value) => {
                                setChapterName(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                       <SelectFilter
                            value={status}
                            placeholder="All Status"
                            options={[
                                { label: "Active", value: "Active" },
                                { label: "Inactive", value: "Inactive" },
                            ]}
                            onChange={(value) => {
                                setStatus(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-12">
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

            {/* ===== TABLE ===== */}
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle student-modern-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                {/* <th>Center Type</th> */}

                                <th>Course Name</th>
                                <th>Module Name</th>
                                <th>Chapter Name</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length ? (
                                paginatedData.map((t, i) => (
                                    <tr key={t.id}>
                                        <td>{startIndex + i + 1}</td>
                                        {/* <td>{t.centerType}</td> */}

                                        <td>{t.course}</td>
                                        <td>{t.moduleName}</td>
                                        <td> {t.chapterName}</td>
                                        <td>
                                            <span
                                                className={`badge ${t.status === "Active" ? "bg-success" : "bg-secondary"
                                                    }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <button className="btn btn-outline-primary btn-sm me-2">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
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
            </div>
        </div>
    );
};

export default ManageAssignedChapters;
