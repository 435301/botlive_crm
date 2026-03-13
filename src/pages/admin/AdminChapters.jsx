import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import { Link } from "react-router-dom";
import useAdminCourses from "../../hooks/useAdminCourses";
import useAdminModules from "../../hooks/useAdminModules";
import useAdminGrades from "../../hooks/useAdminGrades";


const ManageAdminChapters = () => {
    const [gradeBatchId, setGradeBatchId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [moduleId, setModuleId] = useState("");
    const [page, setPage] = useState(1);

    const { useList } = useCrud({
        entity: "skillCenterSchoolAdmin",
        listUrl: "/skillCenterSchoolAdmin/getCurriculum",
    });

    const { data, isLoading } = useList({
        gradeBatchId,
        courseId,
        moduleId
    });

    const flattenedChapters =
        data?.gradeBatches?.flatMap((grade) =>
            grade?.courses?.flatMap((course) =>
                course.modules?.flatMap((module) =>
                    module.chapters?.map((chapter) => ({
                        gradeBatch: grade.gradeBatch,
                        courseTitle: course.courseTitle,
                        moduleTitle: module.moduleTitle,
                        chapterId: chapter.chapterId,
                        chapterTitle: chapter.chapterTitle,
                        status: chapter.status,
                        videoCount: chapter.videoCount,
                        pdfCount: chapter.pdfCount,
                        priority: chapter.priority
                    })) || []
                ) || []
            ) || []
        ) || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

    const { adminGrades } = useAdminGrades();
    const { adminCourses } = useAdminCourses(gradeBatchId);
    const { adminModules } = useAdminModules(gradeBatchId, courseId);


    const resetFilters = () => {
        setGradeBatchId("");
        setCourseId("");
        setModuleId("");
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
                        <h5 className="fw-bold mb-0">Admin Chapters Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all chapters</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">
                    <div className="col-md-3">
                        <SelectFilter
                            value={gradeBatchId}
                            name="gradeBatchId"
                            placeholder="All Grades"
                            options={adminGrades.map((grade) => ({
                                label: grade.gradeBatch,
                                value: String(grade.id)
                            }))}
                            onChange={(value) => {
                                setGradeBatchId(value);
                                setCourseId("");
                                setModuleId("");
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-3">
                        <SelectFilter
                            value={courseId}
                            name="courseId"
                            placeholder="All Courses"
                            options={adminCourses.map((course) => ({
                                label: course.courseTitle,
                                value: String(course.courseId)
                            }))}
                            onChange={(value) => {
                                setCourseId(value);
                                setModuleId("");
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-3">
                        <SelectFilter
                            value={moduleId}
                            name="moduleId"
                            placeholder="All Modules"
                            options={adminModules.map((module) => ({
                                label: module.moduleTitle,
                                value: String(module.moduleId)
                            }))}
                            onChange={(value) => {
                                setModuleId(value);
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
                    <table className="table table-bordered table-striped align-middle student-modern-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Grade Name</th>
                                <th>Course Name</th>
                                <th>Module Name</th>
                                <th>Chapter Name</th>
                                <th>Priority</th>
                                <th>Videos</th>
                                <th>Pdfs</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : flattenedChapters.length ? (
                                flattenedChapters.map((t, i) => (
                                    <tr key={t.chapterId}>
                                        <td>{(page - 1) * perPage + i + 1}</td>
                                        <td>{t.gradeBatch}</td>
                                        <td>{t.courseTitle}</td>
                                        <td>{t.moduleTitle}</td>
                                        <td>{t.chapterTitle}</td>
                                        <td>{t.priority}</td>
                                        <td><Link to={`/admin/view-chapter/${t.chapterId}`} className="text-primary text-decoration-underline">{t.videoCount}</Link></td>
                                        <td><Link to={`/admin/view-chapter/${t.chapterId}`} className="text-primary text-decoration-underline">{t.pdfCount}</Link></td>

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

export default ManageAdminChapters;
