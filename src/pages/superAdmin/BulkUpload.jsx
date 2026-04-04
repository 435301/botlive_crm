
import React, { useState } from "react";
import useSchools from "../../hooks/useSchools";
import SelectFilter from "../../components/SelectFilter";
import toast from "react-hot-toast";
import { useCrud } from "../../hooks/useCrud";

const ManageSchoolSkillUpload = () => {
    const { schoolsData } = useSchools();

    const [centreId, setCentreId] = useState("");
    const [centreType, setCentreType] = useState("");
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);

    const filteredCentres = centreType
        ? schoolsData.filter(
            (school) => school.centerType === Number(centreType)
        )
        : schoolsData;

    const { createMutation } = useCrud({
        entity: "bulkUpload",
        createUrl: "/student/school/bulkUpload",
    })


    const handleImportExcel = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = () => {
        if (!centreId) {
            toast.warn("Please select centre");
            return;
        }

        if (!file) {
            toast.warn("Please upload file");
            return;
        }
        const formData = new FormData();
        formData.append("centreId", Number(centreId));
        formData.append("csvFile", file);

        createMutation.mutate(formData, {
            onSuccess: (response) => {
                const data = response;
                toast.success(
                    `Inserted: ${data?.inserted} | Duplicates: ${data?.skippedDuplicates} | Failed: ${data?.failedCount}`
                );
                setUploadResult(data);
                setFile(null);
                setCentreId("");
            },
        });

    };

    const handleDownloadSample = () => {
        const link = document.createElement("a");
        link.href = "/Sample_student.csv"; // place sample file in public folder
        link.download = "Sample_student.csv";
        link.click();
    };

    return (
        <div className="container-fluid">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center heading-with-icon">
                    <div className="icon-badge me-2">
                        <i className="ti ti-certificate fs-16"></i>
                    </div>
                    <div>
                        <h5 className="fw-bold mb-0">Bulk Upload for Schools Students</h5>
                        <p className="text-muted mb-0">
                            Manage all bulk uploads for school students
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== UPLOAD CARD ===== */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="row g-3 align-items-end">

                        <div className="col-lg-3 col-md-6">
                            <label className="form-label fw-semibold">
                                Centre Type<span className="text-danger">*</span>
                            </label>
                            <SelectFilter
                                value={centreType}
                                placeholder="All Centre Types"
                                options={[
                                    { label: "AI & STEM Learning", value: 2 },
                                    { label: "School Education", value: 3 },
                                ]}
                                onChange={(value) => {
                                    setCentreType(value);
                                    setCentreId(null);
                                }}
                            />
                        </div>

                        {/* Centre Dropdown */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Select Centre <span className="text-danger">*</span>
                            </label>
                            <SelectFilter
                                value={centreId}
                                placeholder="Select Centre"
                                options={filteredCentres?.map((centre) => ({
                                    label: centre.centerName,
                                    value: String(centre.id),
                                }))}
                                onChange={(value) => setCentreId(value)}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Upload Excel File <span className="text-danger">*</span>
                            </label>
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                className="form-control"
                                onChange={handleImportExcel}
                            />
                            {/* <small className="text-muted">
                                Accepted formats: .xlsx, .xls, .csv
                            </small> */}
                        </div>

                        {/* Submit Button */}
                        <div className="col-md-2 d-grid">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                <i className="ti ti-upload me-1"></i>
                                Submit
                            </button>
                        </div>

                        {/* Download Sample */}
                        <div className="col-md-2 d-grid">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleDownloadSample}
                            >
                                <i className="ti ti-download me-1"></i>
                                Sample CSV
                            </button>
                        </div>

                    </div>
                </div>
                {uploadResult && (
                    <div className="card mt-4 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Upload Summary</h6>

                            {/* <div className="row text-center">
                            <div className="col-md-4 mb-2">
                                <div className="p-3 bg-success-subtle rounded">
                                    <h4 className="mb-0 text-success">
                                        {uploadResult.inserted}
                                    </h4>
                                    <small>Inserted</small>
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="p-3 bg-warning-subtle rounded">
                                    <h4 className="mb-0 text-warning">
                                        {uploadResult.skippedDuplicates}
                                    </h4>
                                    <small>Duplicates</small>
                                </div>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="p-3 bg-danger-subtle rounded">
                                    <h4 className="mb-0 text-danger">
                                        {uploadResult.failedCount}
                                    </h4>
                                    <small>Failed</small>
                                </div>
                            </div>
                        </div> */}

                            {uploadResult?.failedRows?.length > 0 && (
                                <div className="mt-3">
                                    <h6 className="text-danger">Failed Rows</h6>
                                    <ul className="small">
                                        {uploadResult?.failedRows?.map((row, index) => (
                                            <li key={index}>
                                                Enrolment: {row.enrolmentNumber} - {row.reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ManageSchoolSkillUpload;