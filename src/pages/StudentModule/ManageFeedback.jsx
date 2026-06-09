import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import TableWrapper from "../../components/TableWrapper";

const ManageFeedback = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { useList, deleteMutation } = useCrud({
        entity: "feedback",
        listUrl: "/feedback/list",
        getUrl: (id) => `/feedback/${id}`,
        createUrl: "/feedback/add",
        updateUrl: (id) => `/feedback/update/${id}`,
        deleteUrl: (id) => `/feedback/delete/${id}`,
    });

    const { data, isLoading } = useList({
        search,
        page,
    });

    const feedbacks = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));

    const resetFilters = () => {
        setSearch("");
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
                        <h5 className="fw-bold mb-0">Feedback Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all feedbacks
                        </p>
                    </div>
                    {/* Right: Action Buttons */}
                </div>

                {/* Add Skill Center button */}
                <div className="d-flex gap-2">
                    <Link
                        to="/student/add-feedback"
                        className="btn add-skill-btn d-flex align-items-center"
                    >
                        <i className="ti ti-graduation-cap me-2"></i>
                        Add Feedback
                    </Link>
                </div>
            </div>
            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2 align-items-center">
                    <div className="col-lg-4 col-md-6">
                        <SearchInput
                            value={search}
                            placeholder="Search by subject and message "
                            onChange={(value) => {
                                setSearch(value);
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
                                        <th>Subject</th>
                                        <th>Message</th>

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
                                    ) :
                                        feedbacks.length > 0 ? (
                                            feedbacks.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.subject}</td>
                                                    <td>{item.message}</td>

                                                    <td className="text-center">
                                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/student/edit-feedback/${item.id}`)}>
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item.id)}>
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

export default ManageFeedback;
