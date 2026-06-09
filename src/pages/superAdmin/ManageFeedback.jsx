import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";

const ManageFeedback = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [userType, setUserType] = useState("");

    const { useList } = useCrud({
        entity: "feedback",
        listUrl: "/admin/getFeedbackList",
    });

    const { data, isLoading } = useList({
        search,
        page,
        userType
    });

    const feedbacks = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));

    const resetFilters = () => {
        setSearch("");
        setPage(1);
        setUserType("");
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
                            View, edit and manage all support feedback
                        </p>
                    </div>
                    {/* Right: Action Buttons */}
                </div>

            </div>
            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2 align-items-center">
                    <div className="col-lg-3 col-md-6">
                        <SearchInput
                            value={search}
                            placeholder="Search by feedback message"
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={userType}
                            placeholder="All User Types"
                            options={[
                                { label: "Trainer", value: 3 },
                                { label: "Student", value: 4 },
                            ]}
                            onChange={(value) => {
                                setUserType(value);
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
            <div className="card shadow-sm rounded-3 p-2">
                <div className="card-body p-1">
                    <div className="table-responsive">
                        <TableWrapper>
                            <table className="table table-bordered table-striped align-middle student-modern-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User Type</th>
                                        <th>User Name</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Feedback Date</th>
                                        
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
                                                    <td>{item.userType === 3 ? "Trainer" : "Student" }</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.subject}</td>
                                                    <td>{item.message}</td>
                                                    <td> {item.feedbackDate
                                                        ? new Date(item.feedbackDate).toLocaleString("en-GB")
                                                        : "-"}</td>
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


                </div>
            </div>
        </div>
    );
};

export default ManageFeedback;
