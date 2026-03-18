import { useParams, Link } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";
import Styles from "../../assets/css/style.module.css";

const ViewStudent = () => {
    const { id } = useParams();

    const { useGetById } = useCrud({
        entity: "student",
        getUrl: (id) => `/student/${id}`,
    });

    const { data, isLoading } = useGetById(id);

    const student = data;
    console.log('student', student)

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="container-fluid">

            {/* HEADER */}
            <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold">View Student</h4>

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
                            <strong>Student Name:</strong>
                            <p>{student?.fullName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Enrollment number:</strong>
                            <p>{student?.enrolmentNumber || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Gender:</strong>
                            <p>{student?.gender === 1 ? "Male" : 2 ? "Female" : "Other"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Centre Name:</strong>
                            <p>{student?.centre?.centerName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Grade/Bath:</strong>
                            <p>{student?.gradeBatch?.gradeBatch || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Qualification:</strong>
                            <p>{student?.qualification?.qualification || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Occupation:</strong>
                            <p>{student?.occupation?.occupation || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Category :</strong>
                            <p>{student?.category?.category || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>State:</strong>
                            <p>{student?.stateData?.stateName || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>District:</strong>
                            <p>{student?.districtData?.districtName || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>DOB:</strong>
                            <p>{student?.dob || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Mobile:</strong>
                            <p>{student?.mobile || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Email:</strong>
                            <p>{student?.email || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Aadhar Number:</strong>
                            <p>{student?.aadharNumber || "-"}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Ward Village:</strong>
                            <p>{student?.wardVillage || "-"}</p>

                        </div> <div className="col-md-4">
                            <strong>Pincode:</strong>
                            <p>{student?.pincode || "-"}</p>

                        </div> <div className="col-md-4">
                            <strong>Father Name:</strong>
                            <p>{student?.fatherName || "-"}</p>

                        </div> <div className="col-md-4">
                            <strong>Father Aadhar Number:</strong>
                            <p>{student?.fatherAadharNumber || "-"}</p>

                        </div> <div className="col-md-4">
                            <strong>Mother Name:</strong>
                            <p>{student?.motherName || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Annual Family Income:</strong>
                            <p>{student?.annualFamilyIncome || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>No of Family Members:</strong>
                            <p>{student?.noOfFamilyMembers || "-"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Marital Status:</strong>
                            <p>{student?.maritalStatus === 1 ? "Married" : 2 ? "Unmarried" : "Divorced"}</p>
                        </div>

                        <div className="col-md-4">
                            <strong>Status:</strong>
                            <p>{student?.status === 1 ? "Active" : "Inactive"}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* PHOTOS */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-3"> Photos</h5>
                    {student?.photo ? (
                        <img
                            src={`${BASE_URL_JOB}${student.photo}`}
                            className="viewImg me-4"
                            alt="activity"
                        />
                    ) : (
                        <span>No photo available</span>
                    )}
                    {student?.photo ? (
                        <img
                            src={`${BASE_URL_JOB}${student.aadharPhoto}`}
                            className="viewImg"
                            alt="activity"
                        />
                    ) : (
                        <span>No Aadhar photo available</span>
                    )
                    }
                </div>
            </div>

            {/* VIDEOS */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">Certificates</h5>

                    <div className="d-flex flex-wrap gap-4">

                        {student?.sscCertificate ? (
                            <iframe
                                src={`${BASE_URL_JOB}${student.sscCertificate}`}
                                title={student.sscCertificate.split("/").pop()}
                                width="300"
                                height="200"
                            />
                        ) : (
                            <div className={`d-flex align-items-center justify-content-center border ${Styles.certificatesCard} `} >
                                SSC Certificate Not Available
                            </div>
                        )}

                        {student?.interCertificate ? (
                            <iframe
                                src={`${BASE_URL_JOB}${student.interCertificate}`}
                                title={student.interCertificate.split("/").pop()}
                                width="300"
                                height="200"
                            />
                        ) : (
                            <div className={`d-flex align-items-center justify-content-center border ${Styles.certificatesCard} `} >
                                Inter Certificate Not Available
                            </div>
                        )}

                        {student?.ugCertificate ? (
                            <iframe
                                src={`${BASE_URL_JOB}${student.ugCertificate}`}
                                title={student.ugCertificate.split("/").pop()}
                                width="300"
                                height="200"
                            />
                        ) : (
                            <div className={`d-flex align-items-center justify-content-center border ${Styles.certificatesCard} `} >
                                UG Certificate Not Available
                            </div>
                        )}

                        {student?.pgCertificate ? (
                            <iframe
                                src={`${BASE_URL_JOB}${student.pgCertificate}`}
                                title={student.pgCertificate.split("/").pop()}
                                width="300"
                                height="200"
                            />
                        ) : (
                            <div className={`d-flex align-items-center justify-content-center border ${Styles.certificatesCard} `}>
                                PG Certificate Not Available
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ViewStudent;