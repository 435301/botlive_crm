import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";

const ViewChapter = () => {
  const { id } = useParams();

  const { useGetById } = useCrud({
    entity: "chapter",
    getUrl: (id) => `/chapter/${id}`,
  });

  const { data, isLoading } = useGetById(id);

  const chapter = data;

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container-fluid">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold">View Chapter</h4>

        <Link
          to="/superAdmin/manage-chapters"
          className="btn btn-outline-primary"
        >
          Back
        </Link>
      </div>

      {/* ACTIVITY DETAILS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Chapter Title:</strong>
              <p>{chapter?.chapterTitle}</p>
            </div>

            <div className="col-md-4">
              <strong>Course:</strong>
              <p>{chapter?.course?.courseTitle}</p>
            </div>

            <div className="col-md-4">
              <strong>Module:</strong>
              <p>{chapter?.module?.moduleTitle}</p>
            </div>

            <div className="col-md-4">
              <strong>Status:</strong>
              <p>{chapter?.status === 1 ? "Active" : "Inactive"}</p>
            </div>
          </div>

        </div>
      </div>

      {/* PHOTOS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Videos</h5>

          {chapter?.videos?.length > 0 ? (
            <div className="d-flex flex-wrap gap-3">
              {chapter.videos.map((video, index) => (
                <video
                  key={index}
                  width="250"
                  height="180"
                  controls
                  style={{ borderRadius: "8px" }}
                >
                  <source
                    src={`${BASE_URL_JOB}${video.videoPdf}`}
                    type="video/mp4"
                  />
                </video>
              ))}
            </div>
          ) : (
            <p className="text-muted">No videos available</p>
          )}
        </div>
      </div>

      {/* VIDEOS */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Pdfs</h5>

          {chapter?.pdfs?.length > 0 ? (
            <div className="d-flex flex-wrap gap-3">
              {chapter.pdfs.map((pdf, index) => (
                <iframe
                  src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                  width="120"
                  height="150"
                  title={pdf.videoPdf.split("/").pop()}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted">No pdfs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewChapter;