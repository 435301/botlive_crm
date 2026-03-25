import React, { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { formatDateToDDMMYYYY } from "../../utils/formatDateDDMMYYYY";
import { Link, useNavigate } from "react-router-dom";
import useTrainerStudents from "../../hooks/useTrainerStudents";
import Cookies from "js-cookie";


const AddStudentAttendance = () => {
    const navigate = useNavigate();
    const getToday = () => { return new Date().toISOString().split("T")[0]; };
    const [attendanceDate, setAttendanceDate] = useState(getToday());
    const [attendanceData, setAttendanceData] = useState({});

    const schoolSkillCentreId = JSON.parse(Cookies.get("trainer") || "{}")?.centreId;
    const gradeBatchId = JSON.parse(Cookies.get("trainer") || "{}")?.gradeBatchId;

    const { createMutation } = useCrud({
        entity: "trainer",
        createUrl: "/trainerAdmin/attendance/add",
    });

    const { trainerStudents, isLoading } = useTrainerStudents();

    useEffect(() => {
        if (trainerStudents.length) {
            const defaultAttendance = {};
            trainerStudents.forEach((student) => {
                defaultAttendance[student.id] = 1; // default Present
            });
            setAttendanceData(defaultAttendance);
        }
    }, [trainerStudents]);

    const handleStatusChange = (trainerId, status) => {
        setAttendanceData((prev) => ({
            ...prev,
            [trainerId]: Number(status),
        }));
    };

    const handleSubmit = () => {
        const payload = {
            attendanceDate: formatDateToDDMMYYYY(attendanceDate),
            attendance: Object.keys(attendanceData).map((studentId) => ({
                studentId: Number(studentId),
                attendanceStatus: attendanceData[studentId] ,
            })),
            centreId: schoolSkillCentreId,
            gradeBatchId: gradeBatchId
        };

        createMutation.mutate(payload, {
            onSuccess: () => {
                navigate("/trainer/manage-attendance")
            }
        });
    };

    return (
        <div className="container-fluid">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Add Student Attendance</h5>
                    <p className="mb-0">View, edit and manage all student's attendance</p>
                </div>

                <Link to="/trainer/manage-attendance" className="btn btn-outline-primary">
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
                                <th>Student Name</th>
                                <th>Student Enrollment Number</th>
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
                            ) : trainerStudents.length ? (
                                trainerStudents.map((t, i) => (
                                    <tr key={t.id}>
                                        <td>{i + 1}</td>
                                        <td>{t.fullName}</td>
                                        <td>{t.enrolmentNumber}</td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={attendanceData[t.id] ?? 1}
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

export default AddStudentAttendance;
