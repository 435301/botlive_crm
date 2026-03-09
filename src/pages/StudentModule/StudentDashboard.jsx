import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

/* ===== UPDATED TOP STATS ===== */
const stats = [
  {
    title: "Total Schools",
    value: "25",
    icon: "bi-building",
    iconBg: "#e6f0fa",
    iconColor: "#4a90e2",
    subtitle: "Active schools",
    subtitleColor: "primary",
  },
  {
    title: "Total Skill Centers",
    value: "12",
    icon: "bi-building",
    iconBg: "#e0e7ff",
    iconColor: "#6366f1",
    subtitle: "Running centers",
    subtitleColor: "info",
  },
  {
    title: "Total Trainers",
    value: "86",
    icon: "bi-person-badge",
    iconBg: "#fff4e6",
    iconColor: "#f39c12",
    subtitle: "Active trainers",
    subtitleColor: "warning",
  },
  {
    title: "Total Students",
    value: "1,280",
    icon: "bi-mortarboard",
    iconBg: "#e6f9f0",
    iconColor: "#50c878",
    subtitle: "Enrolled students",
    subtitleColor: "success",
  },
];

/* ===== Campus Data ===== */
const campusData = [
  { name: "Vizag Campus", staff: 25, students: 420, absent: 3, present: 22 },
  { name: "Nagaland Campus", staff: 18, students: 300, absent: 2, present: 16 },
  { name: "Hospet Campus", staff: 20, students: 360, absent: 4, present: 16 },
  { name: "Pmlanka Campus", staff: 15, students: 280, absent: 1, present: 14 },
];

const StudentDashboard = () => {
  return (
    <div className="admin-layout d-flex">

      {/* ===== SIDEBAR ===== */}
      <AdminSidebar />

      {/* ===== MAIN CONTENT ===== */}
      <div className="admin-main flex-grow-1">

        {/* ===== HEADER ===== */}
        <AdminHeader />

        {/* ===== PAGE CONTENT ===== */}
        <div className="container-fluid p-4">

          {/* ===== KPI CARDS ===== */}
          <div className="row g-3">
            {stats.map((item, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div className="card rounded-3 p-3 shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-3">{item.title}</h6>
                      <h3 className="fw-bold">{item.value}</h3>
                      <small className={`text-${item.subtitleColor}`}>
                        {item.subtitle}
                      </small>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: item.iconBg,
                        color: item.iconColor,
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== STAFF OVERVIEW ===== */}
          <div className="mt-4">
            <h5 className="fw-bold mb-3">Campus Staff Overview</h5>

            <div className="row g-3">
              {campusData.map((campus, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="campus-card">
                    <div className="campus-header">
                      <h6>{campus.name}</h6>
                      <div className="campus-icon">
                        <i className="bi bi-people"></i>
                      </div>
                    </div>

                    <h3 className="campus-main">{campus.staff}</h3>
                    <small className="campus-label">Total Staff</small>

                    <div className="campus-flex">
                      <div className="present">
                        <small>Present :</small>
                        <strong>{campus.present}</strong>
                      </div>
                      <div className="absent">
                        <small>Absent :</small>
                        <strong>{campus.absent}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== STUDENT OVERVIEW ===== */}
          <div className="mt-5">
            <h5 className="fw-bold mb-3">Student Overview</h5>

            <div className="row g-3">
              {campusData.map((campus, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="campus-card student">
                    <div className="campus-header">
                      <h6>{campus.name}</h6>
                      <div className="campus-icon student">
                        <i className="bi bi-mortarboard"></i>
                      </div>
                    </div>

                    <h3 className="campus-main">{campus.students}</h3>
                    <small className="campus-label">Total Students</small>

                    <div className="campus-flex">
                      <div className="present">
                        <small>Present :</small>
                        <strong>{campus.present}</strong>
                      </div>
                      <div className="absent">
                        <small>Absent :</small>
                        <strong>{campus.absent}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;