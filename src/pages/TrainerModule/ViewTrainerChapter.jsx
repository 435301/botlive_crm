import React from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL_JOB from "../../config/config";
import { useCrud } from "../../hooks/useCrud";

const ViewTrainerChapter = () => {
    const { id } = useParams();

    const { useGetById } = useCrud({
        entity: "trainerAdmin",
        getUrl: (id) => `/trainerAdmin/chapter/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <h5>Loading...</h5>
            </div>
        );
    }

    const chapter = data;

    const statusMap = {
        0: { label: "In Progress", class: "bg-secondary" },
        1: { label: "Started", class: "bg-primary" },
        2: { label: "Completed", class: "bg-success" },
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold">View Curriculam</h4>

                <Link
                    to="/trainer/manage-chapters"
                    className="btn btn-outline-primary"
                >
                    Back
                </Link>
            </div>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <h5 className="mb-0">{chapter?.chapterTitle}</h5>
                </div>

                <div className="card-body">
                    {/* Course & Module */}
                    <p>
                        <strong>Course:</strong> {chapter?.course?.courseTitle}
                    </p>
                    <p>
                        <strong>Module:</strong> {chapter?.module?.moduleTitle}
                    </p>

                    {/* Status */}
                    <span
                        className={`badge ${statusMap[chapter?.status]?.class || ""
                            }`}
                    >
                        {statusMap[chapter?.status]?.label || ""}
                    </span>

                    <hr />

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="row">
                                {/* Videos */}
                                <div className="col-md-6 border-end">
                                    <h5 className="fw-bold mt-3">Videos</h5>
                                    {chapter?.videos?.length ? (
                                        <div className="row">
                                            {chapter.videos.map((video) => (
                                                <div key={video.id} >
                                                    <video
                                                        controls
                                                        className="rounded viewImg"
                                                    >
                                                        <source
                                                            src={`${BASE_URL_JOB}${video.videoPdf}`}
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not support video.
                                                    </video>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted">No videos available</p>
                                    )}
                                </div>
                                <div className="col-md-6 border-end">
                                    {/* PDFs */}    
                                    <h5 className="fw-bold mt-4">PDFs</h5>
                                    {chapter?.pdfs?.length ? (
                                        <div >
                                            {chapter.pdfs.map((pdf) => (
                                                <div key={pdf.id} >
                                                    <iframe
                                                        src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                                                        title="PDF"
                                                        className="rounded border viewFile"
                                                    />
                                                    <a
                                                        href={`${BASE_URL_JOB}${pdf.videoPdf}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        View PDF
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted">No PDFs available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ViewTrainerChapter;