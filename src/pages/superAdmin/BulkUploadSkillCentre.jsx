
import React, { useState } from "react";
import useSchools from "../../hooks/useSchools";
import SelectFilter from "../../components/SelectFilter";
import toast from "react-hot-toast";
import { useCrud } from "../../hooks/useCrud";

const ManageSkillCentresBulkUpload = () => {
    const centreType = 2;
    const { schoolsData } = useSchools();

    const [centreId, setCentreId] = useState("");
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);

    const filteredCentres = centreType
        ? schoolsData.filter(
            (school) => school.centerType === Number(centreType)
        )
        : schoolsData;

    const { createMutation } = useCrud({
        entity: "bulkUpload",
        createUrl: "/student/skillCentre/bulkUpload",
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
        link.href = "/Sample_skillcentre_student.csv"; // placed sample file in public folder
        link.download = "Sample_skillcentre_student.csv";
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
                        <h5 className="fw-bold mb-0">Bulk Upload for Skill Centre Students</h5>
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
                 {uploadResult?.failedRows?.length > 0 && (
                <div className="card mt-4 border-0 shadow-sm">
                    <div className="card-body">
                        <h6 className="fw-bold mb-3">Upload Summary</h6>

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

export default ManageSkillCentresBulkUpload;