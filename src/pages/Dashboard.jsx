import React from "react";
import StudentTable from "../components/StudentTable";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ===== TOP STATS ===== */
const stats = [
  {
    title: "Total Skill Centers",
    value: "12",
    icon: "bi-building",
    iconBg: "#e0e7ff", // light blue
    iconColor: "#4a90e2",
    subtitle: "Active centers",
    subtitleColor: "primary",
  },
  {
    title: "Total Students",
    value: "1,280",
    icon: "bi-mortarboard",
    iconBg: "#e6f9f0", // light green
    iconColor: "#50c878",
    subtitle: "Enrolled this year",
    subtitleColor: "success",
  },
  {
    title: "Total Trainers",
    value: "86",
    icon: "bi-person-badge",
    iconBg: "#fff4e6", // light yellow
    iconColor: "#f39c12",
    subtitle: "Active trainers",
    subtitleColor: "warning",
  },
  {
    title: "Total Courses",
    value: "42",
    icon: "bi-journal",
    iconBg: "#fde6e6", // light red
    iconColor: "#e74c3c",
    subtitle: "Ongoing courses",
    subtitleColor: "danger",
  },
  {
    title: "Total Assessments",
    value: "120",
    icon: "bi-file-earmark-text",
    iconBg: "#e6f0fa", // light purple
    iconColor: "#9b59b6",
    subtitle: "Scheduled assessments",
    subtitleColor: "secondary",
  },
  {
    title: "Performance Metrics",
    value: "85%",
    icon: "bi-bar-chart",
    iconBg: "#fff0f6", // pinkish
    iconColor: "#e91e63",
    subtitle: "Average performance",
    subtitleColor: "danger",
  },
  {
    title: "Activity Logs",
    value: "320",
    icon: "bi-clock-history",
    iconBg: "#e6fff8", // light teal
    iconColor: "#1abc9c",
    subtitle: "Recent activities",
    subtitleColor: "info",
  },
];
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
      {name}
    </text>
  );
};

const locationPieData = [
  {
    title: "Nagaland",
    data: [
      { name: "Jan", value: 30, color: "#fbbf24" },
      { name: "Feb", value: 20, color: "#14b8a6" },
      { name: "Mar", value: 15, color: "#fb923c" },
      { name: "Apr", value: 35, color: "#38bdf8" },
    ],
  },
  {
    title: "Pmlanka",
    data: [
      { name: "Jan", value: 40, color: "#facc15" },
      { name: "Feb", value: 25, color: "#22c55e" },
      { name: "Mar", value: 35, color: "#fb7185" },
    ],
  },
  {
    title: "Hospet",
    data: [
      { name: "Jan", value: 28, color: "#0ea5e9" },
      { name: "Feb", value: 22, color: "#84cc16" },
      { name: "Mar", value: 30, color: "#f59e0b" },
      { name: "Apr", value: 20, color: "#06b6d4" },
    ],
  },
  {
    title: "Vizag",
    data: [
      { name: "Jan", value: 33, color: "#f97316" },
      { name: "Feb", value: 27, color: "#22c55e" },
      { name: "Mar", value: 40, color: "#3b82f6" },
    ],
  },
];

/* ===== QUICK INFO ===== */

/* ===== PIE DATA ===== */
const pieData = [
  { name: "Boys", value: 720, color: "#2563eb" },
  { name: "Girls", value: 560, color: "#ec4899" },
];

/* ===== BAR DATA ===== */
const barData = [
  { name: "Jan", value: 85 },
  { name: "Feb", value: 88 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 87 },
  { name: "May", value: 92 },
  { name: "Jun", value: 89 },
];

const Dashboard = () => {
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
            <p className="sub-text mb-0">Welcome, Skill Development !</p>
          </div>
        </div>
        {stats.map((item, i) => (
          <div className="col-12 col-sm-6 col-lg-3" key={i}>
            <div
              className="card rounded-3 p-3 shadow-sm h-100"
              style={{ backgroundColor: "#fff" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-3">{item.title}</h6>
                  <h3 className="fw-bold">{item.value}</h3>
                  {item.subtitle && (
                    <small
                      className={`text-${item.subtitleColor || "secondary"}`}
                    >
                      {item.subtitle}
                    </small>
                  )}
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
        {/* ===== LOCATION PIE CHARTS ===== */}
        {/* ===== LOCATION DONUT PIE CHARTS ===== */}
        <div className="row g-4 mt-4">
          <h5 className="fw-bold mb-3">Location-wise Student Distribution</h5>

          {locationPieData.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="card p-3 shadow-sm h-100">
                <h6 className="text-center mb-2 fw-semibold">{item.title}</h6>

                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={item.data}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      labelLine
                      label={renderCustomLabel}
                    >
                      {item.data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 col-sm-12 col-lg-12">
          {" "}
          <StudentTable />
        </div>
      </div>

      {/* ===== CHARTS ===== */}

      {/* student information */}
    </div>
  );
};

export default Dashboard;
