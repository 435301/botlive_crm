import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";
import { formatToInputDate } from "../../utils/formatDateInput";


const ManageVolunteerAssignment = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { useList, deleteMutation } = useCrud({
        entity: "volunteer",
        listUrl: "/volunteerActivity/list",
        getUrl: (id) => `/volunteerActivity/${id}`,
        createUrl: "/volunteerActivity/add",
        updateUrl: (id) => `/volunteerActivity/update/${id}`,
        deleteUrl: (id) => `/volunteerActivity/delete/${id}`,
    });

    const { data, isLoading } = useList({
        search,
        status,
        page,
    });

    const volunteerActivity = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

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
                        <h5 className="fw-bold mb-0">Volunteer Activty Assignment</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all volunteer activity assignment
                        </p>
                    </div>
                    {/* Right: Action Buttons */}
                </div>

                {/* Add Skill Center button */}
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
                    <Link
                        to="/superAdmin/add-volunteer-assignment"
                        className="btn add-skill-btn d-flex align-items-center"
                    >
                        <i className="ti ti-graduation-cap me-2"></i>
                        Add Volunteer Activity
                    </Link>
                </div>
            </div>
            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2 align-items-center">
                    <div className="col-lg-4 col-md-6">
                        <SearchInput
                            value={search}
                            placeholder="Search by volunteer name"
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={status}
                            placeholder="All Status"
                            options={[
                                { label: "New", value: 1 },
                                { label: "In Progress", value: 2 },
                                { label: "Completed", value: 3 },
                            ]}
                            onChange={(value) => {
                                setStatus(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-5 col-md-12">
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
            <div className="card shadow-sm rounded-3 p-2">
                <div className="card-body p-1">
                    <div className="table-responsive">
                        <TableWrapper>
                            <table className="table table-bordered table-striped align-middle student-modern-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Volunteer Name</th>
                                        <th>Activity Name</th>
                                        <th>Project Type</th>
                                        <th>Assigned Date</th>
                                        <th>Location</th>
                                        <th>Coordinator</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Remarks</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : volunteerActivity?.length > 0 ? (
                                        volunteerActivity.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{(page - 1) * perPage + index + 1}</td>
                                                <td>{item.volunteer?.volunteerName || "-"}</td>
                                                <td>{item.activityName || "-"}</td>
                                                <td> {item.projectType === 1 ? "Skill Development" : item.projectType === 2 ? "AI & STEM Learning" : item.projectType === 3 ? "Education Development" : item.projectType === 4 ? "Innovation & Entrepreneurship" : item.projectType === 5 ? "Community Development" : ""}</td>
                                                <td>{formatToInputDate(item.assignedDate || "-")}</td>
                                                <td>{item.location || "-"}</td>
                                                <td>{item.coordinator || "-"}</td>
                                                <td>{formatToInputDate(item.startDate || "-")}</td>
                                                <td>{formatToInputDate(item.endDate || "-")}</td>
                                                <td className="text-truncate">{item.remarks || "-"}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${item.status === 1
                                                            ? "bg-primary" : item.status === 2 ? "bg-secondary"
                                                                : "bg-success"
                                                            }`}
                                                    >
                                                        {item.status === 1 ? "New" : item.status === 2 ? "In Progress" : "Completed"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-volunteer-assignment/${item?.id}`)}>
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item?.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
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
        </div>
    );
};

export default ManageVolunteerAssignment;
