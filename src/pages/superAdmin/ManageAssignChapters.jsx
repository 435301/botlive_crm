import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SelectFilter from "../../components/SelectFilter";
import useCourses from "../../hooks/useCourses";
import useGrades from "../../hooks/useGrades";
import useModules from "../../hooks/useModule";
import useChapters from "../../hooks/useChapters";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import TableWrapper from "../../components/TableWrapper";


const ManageAssignedChapters = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [gradeBatchId, setGradeBatchId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [moduleId, setModuleId] = useState("");
    const [chapterIds, setChapterIds] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { useList, deleteMutation } = useCrud({
        entity: "assignChapter",
        listUrl: "/assignChapter/list",
        deleteUrl: (id) => `/assignChapter/delete/${id}`,
    });

    const { data, isLoading } = useList({
        search,
        status,
        page,
        courseId,
        moduleId,
        gradeBatchId,
        chapterIds,
    });

    const assignedChapters = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

    const { courses } = useCourses();
    const { grades } = useGrades();
    const { modules } = useModules();
    const { chapters } = useChapters();

    const filteredModules = modules?.filter((module) => module.courseId === Number(courseId))
    const filteredChapters = chapters?.filter((chapter) => chapter.moduleId === Number(moduleId));

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
        setChapterIds([]);
        setCourseId("");
        setGradeBatchId("");
        setModuleId("");
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
                        to="/superAdmin/add-assigned-chapter"
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
                            value={gradeBatchId}
                            placeholder="All Grades"
                            options={grades.map((grade) => ({
                                label: grade.gradeBatch,
                                value: grade.id
                            }))}
                            onChange={(value) => {
                                setGradeBatchId(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                        <SelectFilter
                            value={courseId}
                            placeholder="All Courses"
                            options={courses.map((course) => ({
                                label: course.courseTitle,
                                value: course.id
                            }))}
                            onChange={(value) => {
                                setCourseId(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                        <SelectFilter
                            value={moduleId}
                            placeholder="All Modules"
                            options={filteredModules.map((module) => ({
                                label: module.moduleTitle,
                                value: module.id
                            }))}
                            onChange={(value) => {
                                setModuleId(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                        <SelectFilter
                            value={chapterIds}
                            placeholder="All Chapters"
                            options={filteredChapters.map((chapter) => ({
                                label: chapter.chapterTitle,
                                value: chapter.id
                            }))}
                            onChange={(value) => {
                                setChapterIds(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
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
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <TableWrapper>
                        <table className="table table-bordered table-striped align-middle student-modern-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Grade</th>
                                    <th>Course Name</th>
                                    <th>Module Name</th>
                                    <th>Chapter Name</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5">Loading...</td>
                                    </tr>
                                ) : assignedChapters.length ? (
                                    assignedChapters.map((t, i) => (
                                        <tr key={t.id}>
                                            <td>{(page - 1) * perPage + i + 1}</td>
                                            <td>{t.gradeBatch.gradeBatch}</td>
                                            <td>{t.course.courseTitle}</td>
                                            <td>{t.module.moduleTitle}</td>
                                            <td> <details>
                                                <summary>
                                                    {t.assignedChapters?.length} Chapters
                                                </summary>
                                                <ul className="mt-2 ps-3">
                                                    {t.assignedChapters?.map((item) => (
                                                        <li key={item.id}>
                                                            {item.chapter?.chapterTitle}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details></td>
                                            <td>
                                                <span
                                                    className={`badge ${t.status === 1 ? "bg-success" : "bg-secondary"
                                                        }`}
                                                >
                                                    {t.status === 1 ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-assigned-chapter/${t.id}`)}>
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
                    </TableWrapper>

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

export default ManageAssignedChapters;
