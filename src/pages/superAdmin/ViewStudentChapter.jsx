import React from "react";
import { useParams } from "react-router-dom";
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
    <div className="container py-4">
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
            className={`badge ${
              statusMap[chapter?.status]?.class || ""
            }`}
          >
            {statusMap[chapter?.status]?.label || ""}
          </span>

          <hr />

          {/* Videos */}
          <h6 className="fw-bold mt-3">Videos</h6>
          {chapter?.videos?.length ? (
            <div className="row">
              {chapter.videos.map((video) => (
                <div key={video.id} className="col-md-4 mb-3">
                  <video
                    width="100%"
                    height="200"
                    controls
                    className="rounded"
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

          {/* PDFs */}
          <h6 className="fw-bold mt-4">PDFs</h6>
          {chapter?.pdfs?.length ? (
            <div className="row">
              {chapter.pdfs.map((pdf) => (
                <div key={pdf.id} className="col-md-4 mb-3">
                  <iframe
                    src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                    width="100%"
                    height="250"
                    title="PDF"
                    className="rounded border"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No PDFs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudentChapter;