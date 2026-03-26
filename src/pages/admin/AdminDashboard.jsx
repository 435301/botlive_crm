import React from "react";
import { useCrud } from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";

/* ===== UPDATED TOP STATS ===== */


/* ===== Campus Data ===== */
const campusData = [
  { name: "Vizag Campus", staff: 25, students: 420, absent: 3, present: 22 },
  { name: "Nagaland Campus", staff: 18, students: 300, absent: 2, present: 16 },
  { name: "Hospet Campus", staff: 20, students: 360, absent: 4, present: 16 },
  { name: "Pmlanka Campus", staff: 15, students: 280, absent: 1, present: 14 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { useGetAll } = useCrud({
    entity: "dashboard",
    getAllUrl: "/skillCenterSchoolAdmin/getDashboard",
  });

  const { data } = useGetAll();
  const dashboard = data?.data || [];
  console.log('dashboard', dashboard)

  const stats = [
    {
      title: "Trainers",
      value: dashboard.trainers?.total || 0,
      subtitle: `${dashboard.trainers?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.trainers?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-book",
      iconBg: "#e8f0ff",
      iconColor: "#3f51b5",
      onClick: () => navigate("/admin/manage-trainers"),
    },
    {
      title: "Students",
      value: dashboard.students?.total || 0,
      subtitle: `${dashboard.students?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.students?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-folder",
      iconBg: "#fff0f0",
      iconColor: "#dc3545",
      onClick: () => navigate("/admin/manage-students"),
    },

  ];

  return (
    <>
      {/* ===== PAGE CONTENT ===== */}
      <div className="container-fluid p-4">
        <div className="d-flex align-items-center heading-with-icon mb-4">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Sub Admin Dashboard</h5>
            <p className="sub-text mb-0">Welcome, Cyient Foundation</p>
          </div>
        </div>
        {/* ===== KPI CARDS ===== */}
        <div className="row g-3">
          {stats.map((item, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={i}>
              <div className="card rounded-3 p-3 shadow-sm h-100" onClick={item.onClick}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-3">{item.title}</h6>
                    <h3 className="fw-bold">{item.value}</h3>
                    {/* <div className="d-flex align-items-center gap-2 "> {item.subtitle && (
                      <small
                        className={`text-${item.subtitleColor || "secondary"}`}
                      >
                        {item.subtitle}
                      </small>
                    )}
                      {item.subtitleInactive && (
                        <small
                          className={`text-${item.subtitleInactiveColor || "secondary"}`}
                        >
                          {item.subtitleInactive}
                        </small>
                      )}</div> */}

                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: item.iconBg || "#e0f2ff",
                      color: item.iconColor || "#4a90e2",
                      fontSize: "1.2rem",
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
    </>




  );
};

export default AdminDashboard;