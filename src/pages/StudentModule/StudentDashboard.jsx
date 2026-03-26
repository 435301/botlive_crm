import React, { useMemo, useState } from "react";
import {
  Tooltip, ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { useCrud } from "../../hooks/useCrud";
import SelectFilter from "../../components/SelectFilter";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const name = JSON.parse(Cookies.get("student" || "{}"))?.fullName;
  const enrollment = JSON.parse(Cookies.get("student" || "{}"))?.enrolmentNumber;

  const { useList } = useCrud({
    entity: "dashboard",
    listUrl: "/student/getDashboard",
  });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const years = [];
  for (let y = 2025; y <= year + 40; y++) {
    years.push({ label: y, value: y });
  }
  const months = [
    { label: "January", value: 1, },
    { label: "Febraury", value: 2, },
    { label: "March", value: 3, },
    { label: "April", value: 4, },
    { label: "May", value: 5, },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 }
  ];

  const { data, isLoading } = useList(
    { month, year },
    { keepPreviousData: true }
  );
  const dashboard = data?.data;
  console.log('dashboard', dashboard)

  const stats = useMemo(() => {
    return [
      {
        title: "New Chapters",
        value: dashboard?.chapters?.notStartedChapters || 0,
        icon: "bi-journal-plus",
        iconBg: "#e6f0fa",
        iconColor: "#4a90e2",
        subtitle: "Not Started",
        subtitleColor: "primary",
        onClick: () => navigate("/student/manage-chapters"),
      },
      {
        title: "In Progress Chapters",
        value: dashboard?.chapters?.totalStartedChapters || 0,
        icon: "bi-hourglass-split",
        iconBg: "#e0e7ff",
        iconColor: "#6366f1",
        subtitle: "Started",
        subtitleColor: "info",
        onClick: () => navigate("/student/manage-chapters"),
      },
      {
        title: "Completed Chapters",
        value: dashboard?.chapters?.totalCompletedChapters || 0,
        icon: "bi-check-circle",
        iconBg: "#e6fffa",
        iconColor: "#10b981",
        subtitle: `${dashboard?.chapters?.completedPercentage || 0}% Completed`,
        subtitleColor: "success",
        onClick: () => navigate("/student/manage-chapters"),
      },
      {
        title: "Total Chapters",
        value: dashboard?.chapters?.totalChapters || 0,
        icon: "bi-journal-bookmark",
        iconBg: "#fff4e6",
        iconColor: "#f59e0b",
        subtitle: "All Chapters",
        subtitleColor: "warning",
        onClick: () => navigate("/student/manage-chapters"),
      },
    ];
  }, [dashboard, navigate]);

  // const attendanceData = useMemo(() => {
  //   return [
  //     {
  //       title: "Attendance Overview",
  //       data: [
  //         {
  //           name: "Present",
  //           value: Number(dashboard?.attendance?.presentPercentage) || 0,
  //           color: "#22c55e",
  //         },
  //         {
  //           name: "Absent",
  //           value: Number(dashboard?.attendance?.absentPercentage) || 0,
  //           color: "#ef4444",
  //         },
  //       ],
  //     },
  //   ];
  // }, [dashboard]);

  // const renderCustomLabel = ({ percent }) =>
  //   `${(percent * 100).toFixed(0)}%`;
  const attendanceData = useMemo(() => {
    const present = Number(dashboard?.attendance?.presentPercentage) || 0;
    const absent = Number(dashboard?.attendance?.absentPercentage) || 0;

    const total = present + absent;

    return [
      {
        title: "Attendance Overview",
        data:
          total === 0
            ? [
              {
                name: "No Attendance",
                value: 1,   //  fake value so pie renders
                actual: 0,
                color: "#e9ecef",
              },
            ]
            : [
              {
                name: "Present",
                value: present,
                actual: present,
                color: "#019aa8",
              },
              {
                name: "Absent",
                value: absent,
                actual: absent,
                color: "#facb48",
              },
            ],
      },
    ];
  }, [dashboard]);
  const renderCustomLabel = ({ percent, payload }) => {
    if (payload.name === "No Attendance") return "0%";
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      {/* ===== PAGE CONTENT ===== */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Modern heading with skill icon */}
          <div className="d-flex align-items-center heading-with-icon">
            <div className="icon-badge">
              <i className="ti ti-certificate fs-16"></i> {/* Skill icon */}
            </div>
            <div>
              <h5 className="fw-bold mb-0">Students Dashboard</h5>
              <p className="sub-text mb-0">Welcome , {name} - {enrollment}</p>
            </div>
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

        <div className="row g-4 mt-4">
          <h5 className="fw-bold mb-3"> Attendance Performance </h5>

          <div className="row">
            <div className="mb-3" style={{ maxWidth: "200px" }}>
              <SelectFilter
                value={month}
                placeholder="Select month"
                options={months}
                onChange={setMonth}
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "200px" }}>
              <SelectFilter
                value={year}
                placeholder="Select year"
                options={years}
                onChange={setYear}
              />
            </div>
          </div>
          {isLoading && (
            <div className="text-center mt-4">
              <div className="spinner-border text-primary" />
            </div>
          )}
          {attendanceData.map((item, index) => (<div className="col-12 col-md-6 col-lg-3" key={index} >
            <div className="card p-1 shadow-sm h-100">
              <h6 className="text-center mb-2 fw-semibold">{item.title}</h6>
              <ResponsiveContainer width="100%" height={235}>
                <PieChart>
                  <Pie data={item.data} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} labelLine label={renderCustomLabel} > {item.data.map((entry, i) => (<Cell key={i} fill={entry.color} />))} </Pie> <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2 small">
                Working Days:{dashboard?.attendance?.totalWorkingDays || 0}
              </div>
            </div>
          </div>
          ))}
        </div>


      </div></>


  );
};

export default StudentDashboard;