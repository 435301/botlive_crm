import React, { useState } from "react";
import SelectFilter from "../../components/SelectFilter";
import { useCrud } from "../../hooks/useCrud";
import TableWrapper from "../../components/TableWrapper";
import useSchools from "../../hooks/useSchools";
import useDistricts from "../../hooks/useDistricts";
import { Pagination } from "react-bootstrap";


const ManageStudentStatistics = () => {

    const [centreType, setCentreType] = useState("");
    const [centreId, setCentreId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showBatchModel, setShowBatchModel] = useState(false);
    const [selectedCentre, setSelectedCentre] = useState(null);
    const [percentageValue, setPercentageValue] = useState("");
    const [completedCount, setCompletedCount] = useState("")
    const [updateType, setUpdateType] = useState(""); // "pass" | "admission"

    const { useList } = useCrud({
        entity: "reports",
        listUrl: "/admin/get/centreReports",
    });

    const { data, isLoading } = useList({
        centreType: centreType,
        centreId: centreId,
        districtId: districtId,
        page,
    });

    const reports = data?.data || [];
    const totalPages = Math.ceil((data?.totalRecords || 0) / (data?.perPage || 1));
    const perPage = data?.perPage || 15;

    const { createMutation } = useCrud({
        entity: "reports",
        createUrl: "/admin/update/passPercentage",
    });
    const { createMutation: admissionMutation } = useCrud({
        entity: "reports",
        createUrl: "/admin/update/admissionPercentage",
    });

    const { createMutation: gradeMutation } = useCrud({
        entity: "reports",
        createUrl: "/admin/update/batchesCount",
    });

    const { schoolsData } = useSchools();

    const filteredCentres = centreType
        ? schoolsData?.filter((school) => school.centerType === centreType)
        : schoolsData;

    const { districts } = useDistricts();

    const openPercentageModal = (centre, type) => {
        setSelectedCentre(centre);
        setUpdateType(type);
        setPercentageValue(
            type === "pass"
                ? centre.passPercentage || ""
                : centre.admissionPercentage || ""
        );
        setShowModal(true);
    };

    const openBatchModal = (centre) => {
        setSelectedCentre(centre);
        setCompletedCount(centre.batchesCount || "");
        setShowBatchModel(true);
    };

    const handleUpdatePercentage = () => {
        const payload = {
            centreId: selectedCentre.id,
            percentage: percentageValue,
        };

        const mutation = updateType === "pass"
            ? createMutation
            : admissionMutation;

        mutation.mutate(payload, {
            onSuccess: () => {
                setShowModal(false);
                setPercentageValue("");
            },
            onError: (error) => {
                console.error("Update failed:", error);
            },
        });
    };

    const handleUpdateGrade = () => {
        const payload = {
            centreId: selectedCentre.id,
            completedCount: completedCount,
        };

        gradeMutation.mutate(payload, {
            onSuccess: () => {
                setShowBatchModel(false);
                setCompletedCount("");
            },
            onError: (error) => {
                console.error("Update failed:", error);
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
        setCentreId("")
        setCentreType("");
        setDistrictId("");
        setPage("");
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
                        <h5 className="fw-bold mb-0">Reports Management</h5>
                        <p className="sub-text mb-0">View all reports</p>
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

                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={centreType}
                            placeholder="All Centre Types"
                            options={[
                                { label: "Skill Development", value: 1 },
                                { label: "AI & STEM Learning", value: 2 },
                                { label: "School Education", value: 3 },
                                { label: "Innovation & Entrepreneurship", value: 4 },
                                { label: "Community Development", value: 5 },
                            ]}
                            onChange={(value) => {
                                setCentreType(value);
                                setCentreId(null);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <SelectFilter
                            value={centreId}
                            placeholder="All Centre Names"
                            options={filteredCentres?.map((school) => ({
                                label: school.centerName,
                                value: school.id
                            }))}
                            onChange={(value) => {
                                setCentreId(value);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="col-md-3">
                        <SelectFilter
                            value={districtId}
                            placeholder="All districts"
                            options={districts.map((district) => ({
                                label: district.districtName,
                                value: district.id
                            }))}
                            onChange={(value) => {
                                setDistrictId(value);
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
                                    <th>Centre Name</th>
                                    <th>Location</th>
                                    <th>UDISE</th>
                                    <th>Total Students</th>
                                    <th>AY 25-26</th>
                                    <th>Male</th>
                                    <th>Female</th>
                                    <th>Completed Batches Count</th>
                                    <th>Pass %</th>
                                    <th>Admission %</th>


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
                                            <td>{(page - 1) * perPage + i + 1}</td>
                                            <td>{t.centerName || "-"}</td>
                                            <td>{t.district.districtName || "-"}</td>
                                            <td>{t.udiseCode || "-"}</td>
                                            <td>{t.totalStudents || "-"}</td>
                                            <td>{t.totalEnrolled || "-"}</td>
                                            <td>{t.totalMale || "-"}</td>
                                            <td>{t.totalFemale || "-"}</td>
                                            <td onClick={() => openBatchModal(t)} className="text-primary cursor">{t.batchesCount || "0"}</td>
                                            <td onClick={() => openPercentageModal(t, "pass")} className="text-primary cursor">{t.passPercentage || "0"}%</td>
                                            <td onClick={() => openPercentageModal(t, "admission")} className="text-primary cursor">{t.admissionPercentage || "0"}%</td>

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
            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Update {updateType === "pass" ? "Pass" : "Admission"} Percentage
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label className="form-label">Enter Percentage</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={percentageValue}
                                    onChange={(e) => setPercentageValue(e.target.value)}
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpdatePercentage}
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {centreType === 1 &&  showBatchModel && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Update Batch Count
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowBatchModel(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label className="form-label">Enter Batch Count</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={completedCount}
                                    onChange={(e) => setCompletedCount(e.target.value)}
                                    min="0"
                                    max="100"
                                    step=""
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowBatchModel(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpdateGrade}
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageStudentStatistics;
