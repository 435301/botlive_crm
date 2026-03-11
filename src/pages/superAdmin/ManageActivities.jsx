import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import useSchools from "../../hooks/useSchools";


const ManageActivities = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [centreType, setCentreType] = useState("");
    const [centreId, setCentreId] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    const { useList, deleteMutation } = useCrud({
        entity: "activity",
        listUrl: "/activity/list",
        getUrl: (id) => `/activity/${id}`,
        updateUrl: (id) => `/activity/update/${id}`,
        deleteUrl: (id) => `/activity/delete/${id}`,
    });

    const { data, isLoading } = useList({
        search,
        status,
        page,
        centreId,
        centreType,
    });

    const activities = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

    const { schoolsData } = useSchools();

    const filteredCentres = centreType ? schoolsData?.filter((school) => school.centerType === centreType) : schoolsData;


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
        setCentreId("");
        setCentreType("");
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
                        <h5 className="fw-bold mb-0">Activity Management</h5>
                        <p className="sub-text mb-0">View, edit and manage all activities</p>
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

                    <Link
                        to="/superAdmin/add-activity"
                        className="btn add-skill-btn d-flex align-items-center"
                    >
                        <i className="ti ti-graduation-cap me-2"></i>
                        Add Activity
                    </Link>

                </div>
            </div>

            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">
                    <div className="col-md-3">
                        <SearchInput
                            value={search}
                            placeholder="Search by activity name"
                            onChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <SelectFilter
                            value={centreType}
                            placeholder="All Center Types"
                            options={[
                                { label: "Skill Development", value: 1 },
                                { label: "AI & STEM Learning", value: 2 },
                                { label: "Education Development", value: 3 },
                                { label: "Innovation & Entrepreneurs", value: 4 },
                                { label: "Community Development", value: 5 },
                            ]}
                            onChange={(value) => {
                                setCentreType(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-2">
                        <SelectFilter
                            value={centreId}
                            placeholder="All Centres"
                            options={filteredCentres?.map((centre) => ({
                                label: centre.centerName,
                                value: String(centre.id)
                            }))}
                            onChange={(value) => {
                                setCentreId(value);
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
                                <th>Centre Type</th>
                                <th>Centre Name</th>
                                <th>Activity Title</th>
                                <th>Description</th>
                                <th>Images</th>
                                <th>Videos</th>
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
                            ) : activities.length ? (
                                activities.map((activity, i) => (
                                    <tr key={activity.id}>
                                        <td>{(page - 1) * perPage + i + 1}</td>
                                        <td> {activity.centreType === 1 ? "Skill Development" : activity.centreType === 2 ? "AI & STEM Learning" : activity.centreType === 3 ? "Education Development" : activity.centreType === 4 ? "Innovation & Entrepreneurs" : activity.centreType === 5 ? "Community Development" : ""}</td>
                                        <td>{activity.centre.centerName}</td>
                                        <td>{activity.activityTitle}</td>
                                        <td title={activity.description}>{activity.description.slice(0, 50)}...</td>
                                        <td>
                                            <Link to={`/superAdmin/view-activity/${activity.id}`} className="text-primary text-decoration-underline">
                                                {activity.photoCount}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/superAdmin/view-activity/${activity.id}`} className="text-primary text-decoration-underline">
                                                {activity.videoCount}
                                            </Link>
                                        </td> 
                                        <td>
                                            <span
                                                className={`badge ${activity.status === 1 ? "bg-success" : "bg-secondary"
                                                    }`}
                                            >
                                                {activity.status === 1 ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/superAdmin/edit-activity/${activity.id}`)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-outline-success btn-sm me-2" onClick={() => navigate(`/superAdmin/view-activity/${activity.id}`)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(activity.id)}>
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
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleConfirm={handleDelete}
                />
            </div>
        </div>
    );
};

export default ManageActivities;
