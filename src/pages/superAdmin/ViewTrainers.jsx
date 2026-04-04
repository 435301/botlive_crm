import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";

const ViewTrainer = () => {
    const { id } = useParams();

    const { useGetById } = useCrud({
        entity: "trainer",
        getUrl: (id) => `/trainerInCampass/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    if (isLoading) return <p className="text-center">Loading...</p>;


    return (
        <div className="container-fluid">

            {/* HEADER */}
            <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold">View Trainer</h4>

                <Link
                    to="/superAdmin/manage-trainers"
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
                            <strong>Trainer Name:</strong>
                            <p>{data?.fullName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Trainer Code:</strong>
                            <p>{data?.trainerCode || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Mobile:</strong>
                            <p>{data?.mobile || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Email:</strong>
                            <p>{data?.email || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Gender:</strong>
                            <p>{data?.gender === 1 ? "Male" : 2 ? "Female" : "Other"}</p>
                        </div>


                        <div className="col-md-4">
                            <strong>Aadhar Number:</strong>
                            <p>{data?.aadharNumber || "-"}</p>
                        </div>


                        <div className="col-md-4">
                            <strong>Pan Number:</strong>
                            <p>{data?.panNumber || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Grade/Skill:</strong>
                           <td>{data?.trainerGrades.map((grade)=> grade?.gradeBatch?.gradeBatch)?.join(" , ")}</td>
                        </div>

                        <div className="col-md-4">
                            <strong>Qualification:</strong>
                            <p>{data?.qualification?.qualification || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>State:</strong>
                            <p>{data?.stateData?.stateName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>District:</strong>
                            <p>{data?.districtData?.districtName || "-"}</p>
                        </div>


                        <div className="col-md-4">
                            <strong>Area:</strong>
                            <p>{data?.area || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Pincode:</strong>
                            <p>{data?.pincode || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Father Name:</strong>
                            <p>{data?.fatherName || "-"}</p>
                        </div>


                        <div className="col-md-4">
                            <strong>Mother Name:</strong>
                            <p>{data?.motherName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Residential Address:</strong>
                            <p>{data?.residentialAddress || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Permanent Address:</strong>
                            <p>{data?.permanentAddress || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Blood Group:</strong>
                            <p>{data?.bloodGroup || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Date of Joining :</strong>
                            <p>{data?.dateOfJoining || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Date of Resignation :</strong>
                            <p>{data?.dateOfResigning || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Status:</strong>
                            <p>{data?.status === 1 ? "Working" : "Resigned"}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row">

                        {/* Photo Section */}
                        <div className="col-md-6 border-end">
                            <h5 className="fw-bold mb-3">Trainer Photo</h5>

                            {data?.photo ? (
                                <img
                                    src={`${BASE_URL_JOB}${data.photo}`}
                                    className="img-fluid rounded viewImg"
                                    alt="trainer"
                                />
                            ) : (
                                <p className="text-muted">No photo available</p>
                            )}
                        </div>

                        {/* Certificates Section */}
                        <div className="col-md-6">
                            <h5 className="fw-bold mb-3">Certificates</h5>

                            {data?.certificates?.length > 0 ? (
                                <div className="d-flex flex-wrap gap-3">
                                    {data.certificates.map((pdf, index) => (
                                        <iframe
                                            key={index}
                                            src={`${BASE_URL_JOB}${pdf.certificate}`}
                                            className="viewFile"
                                            title={`certificate-${index}`}
                                        />

                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">No certificates available</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTrainer;