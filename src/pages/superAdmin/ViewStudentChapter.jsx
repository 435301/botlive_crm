import React from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL_JOB from "../../config/config";
import { useCrud } from "../../hooks/useCrud";

const ViewStudentChapter = () => {
  const { id } = useParams();

  const { useGetById } = useCrud({
    entity: "studentChapter",
    getUrl: (id) => `/student/chapter/${id}`,
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
        <h4 className="fw-bold">View Student Curriculam</h4>

        <Link
          to="/student/manage-chapters"
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

          <div className="card ">   
            <div className="card-body">
              <div className="row">

                {/* Videos Section */}
                <div className="col-md-6 border-end">
                  <h5 className="fw-bold mb-3">Videos</h5>

                  {chapter?.videos?.length ? (
                    <div >
                      {chapter.videos.map((video) => (
                        <div key={video.id} >
                          <div className="card h-100 shadow-sm">
                            <video
                              controls
                              className="w-100 rounded-top"
                              style={{ height: "235px", objectFit: "cover" }}
                            >
                              <source
                                src={`${BASE_URL_JOB}${video.videoPdf}`}
                                type="video/mp4"
                              />
                              Your browser does not support video.
                            </video>
                            <div className="card-body p-2 text-center">
                              <small className="text-muted">Video File</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No videos available</p>
                  )}
                </div>

                {/* PDFs Section */}
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">PDFs</h5>

                  {chapter?.pdfs?.length ? (
                    <div >
                      {chapter.pdfs.map((pdf) => (
                        <div key={pdf.id} >
                          <div className="card h-100 shadow-sm">
                            <iframe
                              src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                              title="PDF"
                              className="w-100 rounded-top border-0"
                              style={{ height: "220px" }}
                            />
                            <div className="card-body p-2 text-center">
                              <a
                                href={`${BASE_URL_JOB}${pdf.videoPdf}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary "
                              >
                                View PDF
                              </a>
                            </div>
                          </div>
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

export default ViewStudentChapter;