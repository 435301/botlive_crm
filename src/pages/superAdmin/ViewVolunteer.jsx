import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";
import { formatToInputDate } from "../../utils/formatDateInput";
// import Styles from "../../assets/css/style.module.css";

const ViewVolunteer = () => {
    const { id } = useParams();
    const { useGetById } = useCrud({
        entity: "volunteer",
        getUrl: (id) => `/volunteer/${id}`,
    });
    const { data, isLoading } = useGetById(id);
    const volunteer = data;
    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="container-fluid">

            {/* HEADER */}
            <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold">View Volunteer</h4>

                <Link
                    to="/superAdmin/manage-volunteer"
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
                            <strong>Volunteer Name:</strong>
                            <p>{volunteer?.volunteerName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Mobile:</strong>
                            <p>{volunteer?.volunteerMobile || "-"}</p>
                        </div>

                         <div className="col-md-4">
                            <strong>Email:</strong>
                            <p>{volunteer?.email || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Gender:</strong>
                            <p>{volunteer?.gender === 1 ? "Male" : 2 ? "Female" : "Other"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Qualification:</strong>
                            <p>{volunteer?.qualification?.qualification || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Occupation:</strong>
                            <p>{volunteer?.occupation?.occupation || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>State:</strong>
                            <p>{volunteer?.stateData?.stateName || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>District:</strong>
                            <p>{volunteer?.districtData?.districtName || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>DOB:</strong>
                            <p>{formatToInputDate(volunteer?.dob || "-")}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Aadhar Number:</strong>
                            <p>{volunteer?.aadharNumber || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong> Village/ Town:</strong>
                            <p>{volunteer?.area || "-"}</p>
                            </div>

                        <div className="col-md-4">
                            <strong>Volunteer Skills:</strong>
                            <p>{volunteer?.volunteerSkills.map((skill)=> skill?.skill).join(", ") || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Area of interest:</strong>
                            <p>{volunteer?.areaOfInterests?.map((interest)=> interest?.title).join(", ")|| "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Experience:</strong>
                            <p>{volunteer?.experience || "-"}</p>
                        </div>


                        <div className="col-md-4">
                            <strong>Status:</strong>
                            <p>{volunteer?.status === 1 ? "Active" : "Inactive"}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* PHOTOS */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-3"> Photo</h5>
                    {volunteer?.photo ? (
                        <img
                            src={`${BASE_URL_JOB}${volunteer.photo}`}
                            className="viewImg me-4"
                            alt="activity"
                        />
                    ) : (
                        <span>No photo available</span>
                    )}

                </div>
            </div>

        </div >
    );
};

export default ViewVolunteer;