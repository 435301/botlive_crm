import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";
import DeleteConfirmationModal from "../../Modals/deleteModal";
import { useState } from "react";

const ViewAdminActivity = () => {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { useGetById, deleteMutation } = useCrud({
    entity: "activity",
    getUrl: (id) => `/activity/${id}`,
    deleteUrl: (id) => `/activity/delete/file/${id}`
  });

  const { data, isLoading } = useGetById(id);

  const activity = data;

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
        <h4 className="fw-bold">View Activity</h4>

        <Link
          to="/admin/manage-activities"
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
              <strong>Activity Title:</strong>
              <p>{activity?.activityTitle}</p>
            </div>

            <div className="col-md-4">
              <strong>Centre:</strong>
              <p>{activity?.centre?.centerName}</p>
            </div>

            <div className="col-md-4">
              <strong>Status:</strong>
              <p>{activity?.status === 1 ? "Active" : "Inactive"}</p>
            </div>

            <div className="col-md-12">
              <strong>Description:</strong>
              <p>{activity?.description}</p>
            </div>
          </div>

        </div>
      </div>

      {/* PHOTOS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 border-end">
              <h5 className="fw-bold mb-3">Photos</h5>
              {activity?.photos?.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {activity.photos.map((photo, index) => (
                    <div key={index} className="position-relative">
                      <a
                        key={index}
                        href={`${BASE_URL_JOB}${photo.videoPhoto}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${BASE_URL_JOB}${photo.videoPhoto}`}
                          className="viewImg"
                          alt="activity"
                        />
                      </a>
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => handleDeleteClick(photo?.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-muted">No photos available</p>
              )}
            </div>
            <div className="col-md-6 border-end">
              <h5 className="fw-bold mb-3">Videos</h5>
              {activity?.videos?.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {activity.videos.map((video, index) => (
                    <div key={index} className="position-relative">
                      <video
                        key={index}
                        controls
                        width="100%"
                        height="250px"
                      >
                        <source
                          src={`${BASE_URL_JOB}${video.videoPhoto}`}
                          type="video/mp4"
                        />
                      </video>
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => handleDeleteClick(video?.id)}
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

export default ViewAdminActivity;