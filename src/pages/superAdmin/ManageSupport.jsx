import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";
import FormSelect from "../../components/FormSelect";

const ManageSupport = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [userType, setUserType] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSupport, setSelectedSupport] = useState(null);
    const [editStatus, setEditStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    const { useList, updatePatchMutation } = useCrud({
        entity: "support",
        listUrl: "/admin/getSupportList",
        updatePatchUrl: (id) => `/admin/update/support/${id}`,
    });

    const { data, isLoading } = useList({
        search,
        status,
        page,
        userType
    });

    const supports = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));

    const resetFilters = () => {
        setSearch("");
        setStatus("");
        setPage(1);
        setUserType("");
    };

    const openStatusModal = (item) => {
        setSelectedSupport(item);
        setEditStatus(item.status);
        setRemarks("");
        setShowEditModal(true);
    };

    const handleStatusUpdate = async () => {
        const payload = {
            status: Number(editStatus),
            remarks
        };
        updatePatchMutation.mutate({ id: selectedSupport.id, data: payload });

        setShowEditModal(false);
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
                        <h5 className="fw-bold mb-0">Support Management</h5>
                        <p className="sub-text mb-0">
                            View, edit and manage all support tickets
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
                            placeholder="Search by support message"
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
                                { label: "Resolved", value: 3 },
                            ]}
                            onChange={(value) => {
                                setStatus(value);
                                setPage(1);
                            }}
                        />
                    </div>


                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={userType}
                            placeholder="All User Types"
                            options={[
                                { label: "Sub Admin", value: 2 },
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
                                        <th>Message</th>
                                        <th>Priority</th>
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
                                    ) :
                                        supports.length > 0 ? (
                                            supports.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.message}</td>
                                                    <td>{item.priority === 1 ? "High" : item.priority === 2 ? "Medium" : "Low"}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${item.status === 1
                                                                ? "bg-success"
                                                                : item.status === 2 ? "bg-primary" : "bg-secondary"
                                                                }`}
                                                        >
                                                            {item.status === 1 ? "New" : item.status === 2 ? "In Progress" : "Resolved"}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => openStatusModal(item)}>
                                                            <i className="bi bi-pencil"></i>
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

                    {showEditModal && (
                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Support Status</h5>
                                        <button
                                            className="btn-close"
                                            onClick={() => setShowEditModal(false)}
                                        ></button>
                                    </div>

                                    <div className="modal-body">

                                        <div className=" mb-3">
                                            <FormSelect
                                                type="number"
                                                name="editStatus"
                                                value={editStatus}
                                                label="Status"
                                                onChange={(e) => setEditStatus(Number(e.target.value))}
                                                options={[
                                                    { label: "New", value: 1 },
                                                    { label: "In Progress", value: 2 },
                                                    { label: "Resolved", value: 3 },
                                                ]}
                                                mandatory
                                            />
                                        </div>
                                        {/* {editStatus === "3" && ( */}
                                        <div>
                                            <label className="form-label">Remarks</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                placeholder="Enter remarks"
                                                value={remarks}
                                                onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </div>
                                        {/* )} */}

                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={handleStatusUpdate}
                                        >
                                            Save Changes
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSupport;
