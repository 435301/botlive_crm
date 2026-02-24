import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";

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

const ManageChaptersModule = () => {
    const [search, setSearch] = useState("");
    const [centerType, setCenterType] = useState("");
    const [course, setCourse] = useState("");
    const [module, setModule] = useState("");
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
                        <h5 className="fw-bold mb-0">Chapters Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all chapters</p>
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
                        to="/add-chapters"
                        className="btn add-skill-btn d-flex align-items-center"
                    >
                        <i className="ti ti-graduation-cap me-2"></i>
                        Add Chapters
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
                        placeholder="Search by chapter name"
                        onChange={(value) => {
                            setSearch(value);
                            setPage(1);
                        }}
                    />
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Courses</option>
                            <option value="School">Web Development</option>
                            <option value="Skill Center">Frontend Development</option>
                            <option value="Skill Center">Data Science</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={module}
                            onChange={(e) => {
                                setModule(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Modules</option>
                            <option value="Module 1">React Basics</option>
                            <option value="Module 2">Python Fundamentals</option>
                            <option value="Module 3">JS DOM Manipulation</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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
                                <th>Videos</th>
                                <th>PDFs</th>
                                <th>Priority</th>
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
                                        <td>{i + 1}: {t.chapterName}</td>
                                        <td>  {t.videos.map((video, index) => (
                                            <div key={index}>
                                                <a
                                                    href={`/uploads/videos/${video}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {video}
                                                </a>
                                            </div>
                                        ))}</td>

                                        <td>{t.pdfs.map((pdf, index) => (
                                            <div key={index}>
                                                <a
                                                    href={`/uploads/pdfs/${pdf}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {pdf}
                                                </a>

                                            </div>
                                        ))}</td>
                                        <td>{t.priority}</td>
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

export default ManageChaptersModule;
