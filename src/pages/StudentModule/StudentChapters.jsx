import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import useStudentCourses from "../../hooks/useStudentCourses";
import useStudentModules from "../../hooks/useStudentModules";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const ManageStudentChapters = () => {
    // const navigate = useNavigate();
    const [courseId, setCourseId] = useState("");
    const [moduleId, setModuleId] = useState("");
    // const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    console.log('courseId', courseId)
    const { useList } = useCrud({
        entity: "student",
        listUrl: "/student/getChaptersContent",
    });

    const { data, isLoading } = useList({
        courseId: "",
        moduleId: ""
    });

    const flattenedChapters =
        data?.courses?.flatMap((course) =>
            course.modules?.flatMap((module) =>
                module.chapters?.map((chapter) => ({
                    courseTitle: course.courseTitle,
                    moduleTitle: module.moduleTitle,
                    chapterId: chapter.chapterId,
                    chapterTitle: chapter.chapterTitle,
                    status: chapter.status,
                    priority: chapter.priority || "-",
                    videoCount: chapter.videoCount,
                    pdfCount: chapter.pdfCount
                }))
            )
        ) || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

    const { studentCourses } = useStudentCourses();
    const { studentModules } = useStudentModules(courseId);

    const resetFilters = () => {
        setCourseId("");
        setModuleId("");
        setPage(1);
    };

    const statusMap = {
        0: { label: "In Progress", class: "bg-secondary" },
        1: { label: "Started", class: "bg-primary" },
        2: { label: "Completed", class: "bg-success" },
    };
    const queryClient = useQueryClient();

    const startMutation = useMutation({
        mutationFn: (chapterId) =>
            axiosInstance.post("/student/updateStatusStarted", { chapterId }),

        onSuccess: () => {
            queryClient.invalidateQueries(["student"]); // refresh list
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "");
        },
    });

    const completeMutation = useMutation({
        mutationFn: (chapterId) =>
            axiosInstance.patch("/student/updateStatusCompleted", { chapterId }),

        onSuccess: () => {
            queryClient.invalidateQueries(["student"]); // refresh list
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "");
        },
    });

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
                        <h5 className="fw-bold mb-0">Students Chapters Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all chapters</p>
                    </div>
                </div>

            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">


                    <div className="col-md-4">
                        <SelectFilter
                            value={courseId}
                            name="courseId"
                            placeholder="All Courses"
                            options={studentCourses.map((course) => ({
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

                    <div className="col-md-4">
                        <SelectFilter
                            value={moduleId}
                            name="moduleId"
                            placeholder="All Modules"
                            options={studentModules.map((module) => ({
                                label: module.moduleTitle,
                                value: String(module.moduleId)
                            }))}
                            onChange={(value) => {
                                setModuleId(value);
                                setPage(1);
                            }}
                        />
                    </div>
                    {/* 
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
                    </div> */}

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
                                <th>Course Name</th>
                                <th>Module Name</th>
                                <th>Chapter Name</th>
                                {/* <th>Priority</th> */}
                                <th>Videos</th>
                                <th>Pdfs</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
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
                                        <td>{t.courseTitle}</td>
                                        <td>{t.moduleTitle}</td>
                                        <td>{t.chapterTitle}</td>
                                        {/* <td>{t.priority}</td> */}
                                        <td><Link to={`/student/view-chapter/${t.chapterId}`} className="text-primary text-decoration-underline">{t.videoCount}</Link></td>
                                        <td><Link to={`/student/view-chapter/${t.chapterId}`} className="text-primary text-decoration-underline">{t.pdfCount}</Link></td>
                                        <td>
                                            <span className={`badge ${statusMap[t.status]?.class || ""}`}>
                                                {statusMap[t.status]?.label || ""}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {t.status === 0 && (
                                                <button className="btn btn-outline-primary btn-sm me-2"
                                                    onClick={() => startMutation.mutate(t.chapterId)}
                                                    disabled={t.status === 1}>
                                                    Start
                                                </button>
                                            )}
                                            {t.status !== 0 && (
                                                <button className="btn btn-outline-danger btn-sm"
                                                    onClick={() => completeMutation.mutate(t.chapterId)}
                                                    disabled={t.status === 2 || t.status === 3}>
                                                    {t.status === 2 || t.status === 3 ? "Completed" : "Complete"}
                                                </button>
                                            )}
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

export default ManageStudentChapters;
