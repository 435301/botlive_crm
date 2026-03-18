import React, { useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import useTrainers from "../../hooks/useTrainers";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import { Link, useNavigate } from "react-router-dom";


const AddTrainerAttendance = () => {
    const navigate = useNavigate();
    const getToday = () => { return new Date().toISOString().split("T")[0]; };
    const [attendanceDate, setAttendanceDate] = useState(getToday());
    const [attendanceData, setAttendanceData] = useState({});

    const { createMutation } = useCrud({
        entity: "trainer",
        createUrl: "/trainer/attendance/add",
    });

    const { trainers, isLoading } = useTrainers();

    const handleStatusChange = (trainerId, status) => {
        setAttendanceData((prev) => ({
            ...prev,
            [trainerId]: Number(status),
        }));
    };

    const handleSubmit = () => {
        const payload = {
            attendanceDate: formatDateToDDMMYYYY(attendanceDate),
            attendance: Object.keys(attendanceData).map((trainerId) => ({
                trainerId: Number(trainerId),
                attendanceStatus: attendanceData[trainerId],
            })),
        };

        createMutation.mutate(payload, {
            onSuccess: () => {
                navigate("/admin/manage-attendance")
            }
        });
    };

    return (
        <div className="container-fluid">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Add Trainer Attendance</h5>
                    <p className="mb-0">View, edit and manage all trainer's attendance</p>
                </div>

                <Link to="/admin/manage-attendance" className="btn btn-outline-primary">
                    Manage Attendance
                </Link>
            </div>
            {/* ===== FILTERS ===== */}
            <div className="filter-wrapper mb-3">
                <div className="row g-2">

                    <div className="col-lg-3">
                        <input
                            type="date"
                            className="form-control"
                            value={attendanceDate}
                             max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                setAttendanceDate(e.target.value);
                            }}
                        />
                    </div>  

                </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle student-modern-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Trainer Name</th>
                                <th>Trainer Code</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : trainers.length ? (
                                trainers.map((t, i) => (
                                    <tr key={t.id}>
                                        <td>{i + 1}</td>
                                        <td>{t.fullName}</td>
                                        <td>{t.trainerCode}</td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={attendanceData[t.id] || ""}
                                                onChange={(e) => handleStatusChange(t.id, e.target.value)}
                                            >
                                                <option value="1">Present</option>
                                                <option value="2">Absent</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-4">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="text-end p-3">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Save Attendance
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddTrainerAttendance;
