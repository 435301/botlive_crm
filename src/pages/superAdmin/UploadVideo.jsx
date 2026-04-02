
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCrud } from "../../hooks/useCrud";

const VideoUpload = () => {

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const { createMutation } = useCrud({
        entity: "videoUpload",
        createUrl: "/activity/addPromoVideo",
    })

    const handleSubmit = () => {

        if (!file) {
            toast.warn("Please upload file");
            return;
        }
        const formData = new FormData();
        formData.append("videos", file);
        formData.append("url", url)

        createMutation.mutate(formData, {
            onSuccess: () => {
                setFile(null);
                setUrl("");
            },
        });

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
                        <h5 className="fw-bold mb-0">Video Upload</h5>
                        <p className="text-muted mb-0">
                            Manage all video uploads
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== UPLOAD CARD ===== */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="row g-3 align-items-end">


                        {/* File Upload */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Upload Video File <span className="text-danger">*</span>
                            </label>
                            <input
                                type="file"
                                accept=".mp4, .avi, .mov"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <small className="text-muted">
                                Accepted formats: .mp4, .avi, .mov
                            </small>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Video URL <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter video URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                    </div>
                    {/* Submit Button */}
                    <div className="col-md-2 mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            <i className="ti ti-upload me-1"></i>
                            Submit
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default VideoUpload;