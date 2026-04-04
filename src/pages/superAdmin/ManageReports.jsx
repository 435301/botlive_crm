import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import SelectFilter from "../../components/SelectFilter";
import useCourses from "../../hooks/useCourses";
import useGrades from "../../hooks/useGrades";
import useModules from "../../hooks/useModule";
import useChapters from "../../hooks/useChapters";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";


const ManageReports = () => {

    const navigate = useNavigate();

    const [gradeBatchId, setGradeBatchId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [moduleId, setModuleId] = useState("");
    const [chapterId, setChapterId] = useState("");

    const { useList } = useCrud({
        entity: "reports",
        listUrl: "/admin/getChapterStatus",
    });

    const { data, isLoading } = useList({
        courseId: courseId,
        moduleId: moduleId,
        gradeBatchId: gradeBatchId,
        chapterId: chapterId,
    });

    const reports = data?.data || [];

    const { createMutation } = useCrud({
        entity: "reports",
        createUrl: "/admin/getStudentsByIds",
    });

    const { courses } = useCourses();
    const { grades } = useGrades();
    const { modules } = useModules();
    const { chapters } = useChapters();

    const filteredModules = modules?.filter((module) => module.courseId === Number(courseId))
    const filteredChapters = chapters?.filter((chapter) => chapter.moduleId === Number(moduleId));


    const handleStudentClick = async (ids) => {
        if (!ids?.length) return;

        createMutation.mutate({ studentIds: ids },
             {
            onSuccess: (response) => {
                navigate("/superAdmin/student-reports", {
                    state: {
                        studentReports: response?.data || []
                    }
                });
            },
            onError: (error) => {
                console.error("Error fetching students:", error);
            },
        });

    };

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
        setChapterId("");
        setCourseId("");
        setGradeBatchId("");
        setModuleId("");
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
                        <h5 className="fw-bold mb-0"> Students Chapter Status</h5>
                        <p className="sub-text mb-0">View all students chapter status</p>
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
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                        <SelectFilter
                            value={chapterId}
                            placeholder="All Chapters"
                            options={filteredChapters.map((chapter) => ({
                                label: chapter.chapterTitle,
                                value: chapter.id
                            }))}
                            onChange={(value) => {
                                setChapterId(value);
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
                                    <th>Center Code</th>
                                    <th>Total Students</th>
                                    <th>Completed Students</th>
                                    <th>In Progress Students</th>
                                    <th>Not Started Students</th>
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
                                            <td>{t.centerCode}</td>
                                            <td>{t.totalStudents}</td>
                                            <td className="text-primary cursor" onClick={() => handleStudentClick(t.completedStudentIds)}>
                                                {t.completedCount}
                                            </td>
                                            <td className="text-primary cursor" onClick={() => handleStudentClick(t.inProgressStudentIds)}>
                                                {t.inProgressCount}
                                            </td>
                                            <td className="text-primary cursor" onClick={() => handleStudentClick(t.notStartedStudentIds)}>
                                                {t.notStartedCount}
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

            </div>
        </div>
    );
};

export default ManageReports;
