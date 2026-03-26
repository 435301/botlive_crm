import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Tooltip, ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { useCrud } from "../../hooks/useCrud";
import BASE_URL_JOB from "../../config/config";

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#555"
      fontSize={11}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {name}%
    </text>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { useGetAll, useList } = useCrud({
    entity: "dashboard",
    getAllUrl: "/admin/getDashboard",
    listUrl: "/activity/dashboardlist",
  });

  const { data: activityData, isLoading } = useList({
    centreId: ""
  });

  const activityRawData = activityData?.data
  console.log("Full activity response:", activityData);
  console.log('activityData', activityRawData)
  const { useGetAll: useGetAttendance } = useCrud({
    entity: "attendance",
    getAllUrl: "/admin/attendancePercentage",
  });

  const { data: attendanceDataRaw } = useGetAttendance();

  // transform attendance for chart
  const attendanceData = attendanceDataRaw?.data?.map(item => ({
    title: item.district.districtName,
    data: [
      { name: "Present", value: Number(item.percentage), color: "#019aa8", districtId: item.districtId, area: item.area },
      { name: "Absent", value: 100 - Number(item.percentage), color: "#facb48", districtId: item.districtId, area: item.area },
    ],
  })) || [];


  const handleChartClick = (item) => {
    navigate("/superAdmin/pie-detail", { state: { chartData: { title: item.title, data: item.data.slice(0, 2) } } });
  };

  const { data } = useGetAll();
  const dashboard = data?.data || [];
  const stats = [
    {
      title: "Skill Development Centres",
      value: dashboard.skillDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.skillDevelopmentCentres?.active || 0} Active`,
      subtitleInactive: `${dashboard.skillDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      subtitleColor: "success",
      icon: "bi-building",
      iconBg: "#e8f5ff",
      iconColor: "#0d6efd",
      onClick: () => navigate("/superAdmin/manage-skill-centres"),
    },
    {
      title: "AI And Stem Learning Centres",
      value: dashboard.aiAndStemLearningCentres?.total || 0,
      subtitle: `${dashboard.aiAndStemLearningCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.aiAndStemLearningCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-mortarboard",
      iconBg: "#fff4e5",
      iconColor: "#ff9800",
      onClick: () => navigate("/superAdmin/manage-skill-centres"),
    },
    {
      title: "Education Development Centres",
      value: dashboard.educationDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.educationDevelopmentCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.educationDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-people",
      iconBg: "#e8ffe8",
      iconColor: "#28a745",
      onClick: () => navigate("/superAdmin/manage-skill-centres"),
    },
    {
      title: "Innovation And Entrepreneurs Centres",
      value: dashboard.innovationAndEntrepreneursCentres?.total || 0,
      subtitle: `${dashboard.innovationAndEntrepreneursCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.innovationAndEntrepreneursCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-person-badge",
      iconBg: "#f3e8ff",
      iconColor: "#6f42c1",
      onClick: () => navigate("/superAdmin/manage-skill-centres"),
    },
    {
      title: "Community Development Centres",
      value: dashboard.communityDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.communityDevelopmentCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.communityDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-book",
      iconBg: "#e8f0ff",
      iconColor: "#3f51b5",
      onClick: () => navigate("/superAdmin/manage-skill-centres"),
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
      onClick: () => navigate("/superAdmin/manage-students"),
    },
    {
      title: "Trainers",
      value:
        (dashboard.skillDevelopmentCentres?.total ?? 0) +
        (dashboard.aiAndStemLearningCentres?.total ?? 0) +
        (dashboard.educationDevelopmentCentres?.total ?? 0) +
        (dashboard.innovationAndEntrepreneursCentres?.total ?? 0) +
        (dashboard.communityDevelopmentCentres?.total ?? 0),
      subtitle: `${dashboard.trainers?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.trainers?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-trainers"),
    },
    {
      title: "Courses",
      value: dashboard.courses?.total || 0,
      subtitle: `${dashboard.courses?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.courses?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-course"),
    },
    {
      title: "Modules",
      value: dashboard.modules?.total || 0,
      subtitle: `${dashboard.modules?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.modules?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-module"),
    },
    {
      title: "Chapters",
      value: dashboard.chapters?.total || 0,
      subtitle: `${dashboard.chapters?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.chapters?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-chapters"),
    },
  ];


  return (
    <div className="container-fluid">
      {/* ===== TOP KPI CARDS ===== */}
      {/* ===== TOP KPI CARDS (Image Style) ===== */}
      {/* ===== TOP KPI CARDS (New Data) ===== */}
      <div className="row g-3 ">
        <div className="d-flex align-items-center heading-with-icon mb-4">
          <div className="icon-badge">
            <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
          </div>
          <div>
            <h5 className="fw-bold mb-0">Dashboard</h5>
            <p className="sub-text mb-0">Welcome, Cyient Foundation</p>
          </div>
        </div>
        {stats.map((item, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
            <div
              className="card rounded-3 p-3 shadow-sm h-100"
              style={{ backgroundColor: "#fff" }}
              onClick={item.onClick}
            >
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
                    )}
                    </div> */}

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
        {/* ===== LOCATION DONUT PIE CHARTS ===== */}
        <div className="container mt-4">
          <h5 className="fw-bold mt-3"> Attendance Performance </h5>

          <div className="row g-4 mt-2">
            <div className="col-md-8">

              <div className="row">
                {attendanceData.map((item, index) => (<div className="col-12 col-md-6 col-lg-4 mb-3" key={index} onClick={() => handleChartClick(item)} style={{ cursor: "pointer" }}>
                  <div className="card p-4 shadow-sm h-100">
                    <h6 className="text-center mb-2 fw-semibold">{item.title}</h6>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={item.data} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} labelLine label={renderCustomLabel} > {item.data.map((entry, i) => (<Cell key={i} fill={entry.color} />))} </Pie> <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">

              {/* Card 1 */}
              <div>
                {isLoading ? (
                  <p className="text-center p-3">Loading...</p>
                ) : activityRawData?.length ? (
                  activityRawData.map((activity) => (
                    <div
                      key={activity.id}
                      className="d-flex align-items-center flex-row mb-3 card p-3 shadow-sm gap-2 cursor"
                    >
                      <div>
                        <img
                          src={`${BASE_URL_JOB}${activity.image}`}
                          alt={activity.title}
                          className="rounded dashboardActivityImg"
                        />
                      </div>

                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">{activity.title}</h6>
                        <p className="mb-1 small text-muted">
                          {activity.description.length > 50
                            ? activity.description.substring(0, 50) + "..."
                            : activity.description}
                        </p>
                      </div>

                      <Link to={`/superAdmin/view-activity/${activity.id}`}>
                        <i className="bi bi-arrow-right-circle-fill text-primary fs-4"></i></Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center p-3">No Activities Found</p>
                )}
              </div>

            </div>


          </div>
        </div>

        {/* <div className="col-12 col-sm-12 col-lg-12">
          {" "}
          <StudentTable />
        </div> */}
      </div>

      {/* ===== CHARTS ===== */}

      {/* student information */}
    </div>
  );
};

export default Dashboard;
