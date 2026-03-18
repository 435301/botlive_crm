import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";
import { useState } from "react";
import DeleteConfirmationModal from "../../Modals/deleteModal";

const ViewChapter = () => {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { useGetById, deleteMutation } = useCrud({
    entity: "chapter",
    getUrl: (id) => `/chapter/${id}`,
    deleteUrl: (id) => `/chapter/delete/file/${id}`
  });

  const { data, isLoading } = useGetById(id);

  const chapter = data;

  if (isLoading) return <p className="text-center">Loading...</p>;

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async (fileId) => {
    deleteMutation.mutate(fileId, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeleteId(null);
      },
    });
  };

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
          <div className="row">
            <div className="col-md-6 border-end">
              <h5 className="fw-bold mb-3">Videos</h5>

              {chapter?.videos?.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {chapter.videos.map((video, index) => (
                    <div key={index} className="position-relative">
                      <video
                        key={index}
                        width="100%"
                        height="250"
                        controls
                      >
                        <source
                          src={`${BASE_URL_JOB}${video.videoPdf}`}
                          type="video/mp4"
                        />
                      </video>
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => handleDeleteClick(video.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-muted">No videos available</p>
              )}
            </div>
            <div className="col-md-6 border-end">
              <h5 className="fw-bold mb-3">Pdfs</h5>

              {chapter?.pdfs?.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {chapter.pdfs.map((pdf, index) => (
                    <div key={index} className="position-relative">
                      <iframe
                        src={`${BASE_URL_JOB}${pdf.videoPdf}`}
                        title={pdf.videoPdf.split("/").pop()}
                        className="viewFile"
                      />
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => handleDeleteClick(pdf?.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-muted">No pdfs available</p>
              )}
            </div>

          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
};

export default ViewChapter;