import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

/* ===== DATA ===== */
const skillCenters = [
  {
    grade: "Grade 1",
    modules: [
      {
        module: "AI Basics",
        trainerCompleted: "Completed",
        studentStats: "120",
        chapters: ["Introduction to AI", "History of AI", "AI Applications"],
      },
      {
        module: "Machine Learning",
        trainerCompleted: "In Progress",
        studentStats: "80",
        chapters: ["ML Basics", "Supervised Learning"],
      },
    ],
  },
  {
    grade: "Grade 2",
    modules: [
      {
        module: "Deep Learning",
        trainerCompleted: "In Progress",
        studentStats: "20",
        chapters: ["Neural Networks", "CNN", "RNN"],
      },
    ],
  },
];

/* ===== STATUS COLOR ===== */
const getTrainerStatusColor = (status) => {
  if (status === "Completed") return "text-success fw-semibold";
  if (status === "In Progress") return "text-warning fw-semibold";
  return "text-danger fw-semibold";
};

const ManageSkillCenters = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ===== IMPORT EXCEL ===== */
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Imported file:", file.name);
    }
  };

  /* ===== EXPORT EXCEL ===== */
  const handleExportExcel = () => {
    console.log("Export Excel clicked");
  };

  /* ===== RESET FILTERS ===== */
  const resetFilters = () => {
    setSearch("");
    setPage(1);
  };

  /* ===== FILTER MODULE ===== */
  const filteredGrades = skillCenters.map((grade) => ({
    ...grade,
    modules: grade.modules.filter((m) =>
      m.module.toLowerCase().includes(search.toLowerCase()),
    ),
  }));

  return (
    <div className="admin-layout d-flex">
      <AdminSidebar />

      <div className="admin-main flex-grow-1">
        <AdminHeader />

        <div className="container-fluid">
          {/* PAGE HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center heading-with-icon">
              <div className="icon-badge">
                <i className="ti ti-certificate fs-16"></i>
              </div>

              <div>
                <h5 className="fw-bold mb-0">Manage School Centers</h5>
                <p className="sub-text mb-0">
                  View and manage all School Centers
                </p>
              </div>
            </div>

            <div className="d-flex gap-2">
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

              <button
                className="btn btn-outline-primary d-flex align-items-center"
                onClick={handleExportExcel}
              >
                <i className="ti ti-download me-2"></i>
                Export Excel
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="filter-wrapper mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-lg-4 col-md-6">
                <SearchInput
                  value={search}
                  placeholder="Search module name"
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="col-lg-3 col-md-6">
                <SelectFilter
                  placeholder="Status Filter"
                  options={[
                    { label: "Completed", value: "Completed" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Pending", value: "Pending" },
                  ]}
                />
              </div>

              <div className="col-lg-5 col-md-12">
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

          {/* TABLE */}
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead>
                    <tr>
                      <th>Grade</th>
                      <th>Module</th>
                      <th>Chapter</th>
                      <th className="text-center">Trainer Completed</th>
                      <th className="text-center">Student Completed</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredGrades.map((grade, gIndex) => {
                      let gradeRowSpan = grade.modules.reduce(
                        (total, mod) => total + mod.chapters.length,
                        0,
                      );

                      return grade.modules.map((module, mIndex) => {
                        return module.chapters.map((chapter, cIndex) => (
                          <tr key={`${gIndex}-${mIndex}-${cIndex}`}>
                            {/* GRADE */}
                            {mIndex === 0 && cIndex === 0 && (
                              <td rowSpan={gradeRowSpan}>{grade.grade}</td>
                            )}

                            {/* MODULE */}
                            {cIndex === 0 && (
                              <td rowSpan={module.chapters.length}>
                                {module.module}
                              </td>
                            )}

                            {/* CHAPTER */}
                            <td>{chapter}</td>

                            {/* TRAINER STATUS */}
                            {cIndex === 0 && (
                              <td
                                rowSpan={module.chapters.length}
                                className={`text-center align-middle ${getTrainerStatusColor(module.trainerCompleted)}`}
                              >
                                {module.trainerCompleted}
                              </td>
                            )}

                            {/* STUDENT STATS */}
                            {cIndex === 0 && (
                              <td
                                rowSpan={module.chapters.length}
                                className="text-center"
                              >
                                {module.studentStats}
                              </td>
                            )}
                          </tr>
                        ));
                      });
                    })}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <Pagination
                currentPage={page}
                totalPages={1}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSkillCenters;
