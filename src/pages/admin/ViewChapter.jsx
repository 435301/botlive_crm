import React from "react";
import { useParams } from "react-router-dom";
import BASE_URL_JOB from "../../config/config";
import { useCrud } from "../../hooks/useCrud";

const ViewAdminChapter = () => {
  const { id } = useParams();

  const { useGetById } = useCrud({
    entity: "skillCenterSchoolAdmin",
    getUrl: (id) => `/skillCenterSchoolAdmin/chapter/${id}`,
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
                        <div key={video.id} className="col-md-4 mb-3">
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
                {/* PDFs */}
                <div className="col-md-6 border-end">
                  <h5 className="fw-bold mt-4">PDFs</h5>
                  {chapter?.pdfs?.length ? (
                    <div className="row">
                      {chapter.pdfs.map((pdf) => (
                        <div key={pdf.id} className="col-md-4 mb-3">
                          <iframe
                            src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                            
                            title="PDF"
                            className="rounded border viewFile"
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
          </div>


        </div>
      </div>
    </div>
  );
};

export default ViewAdminChapter;