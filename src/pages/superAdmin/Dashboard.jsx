import React from "react";
import StudentTable from "../../components/StudentTable";

import {
  Tooltip, ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell
} from "recharts";
import { useCrud } from "../../hooks/useCrud";

// const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = outerRadius + 18;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="#555"
//       fontSize={11}
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {name}
//     </text>
//   );
// };

const locationPieData = [
  {
    title: "Location Wise Students",
    data: [
      { name: "Urban", value: 40, color: "#4CAF50" },
      { name: "Rural", value: 60, color: "#2196F3" },
      { name: "Urban", value: 40, color: "#4CAF50" },
      { name: "Rural", value: 60, color: "#2196F3" },
      { name: "Urban", value: 40, color: "#4CAF50" },
      { name: "Rural", value: 60, color: "#2196F3" },
      { name: "Urban", value: 40, color: "#4CAF50" },
      { name: "Rural", value: 60, color: "#2196F3" },
      { name: "Urban", value: 40, color: "#4CAF50" },
      { name: "Rural", value: 60, color: "#2196F3" },

    ]
  }
];

/* ===== QUICK INFO ===== */

const Dashboard = () => {
    const { useGetAll } = useCrud({
      entity: "dashboard",
      getAllUrl: "/admin/getDashboard",
    });

    
  const { data } = useGetAll();
 const dashboard = data?.data || [];
 const total = dashboard.skillCenters?.total ;
 console.log('total', total)
 const stats = [
   { title: "skillCenters", value: dashboard.skillCenters?.total || 0 },
  { title: "Schools", value: dashboard.schools?.total || 0},
  { title: "Students", value: dashboard.students?.total || 0, icon: "bi-people" },
  { title: "Trainers", value: dashboard.trainers?.total || 0, icon: "bi-person-workspace" },
  { title: "Courses", value: dashboard.courses?.total || 0, icon: "bi-book" },
  { title: "Modules", value: dashboard.modules?.total || 0, icon: "bi-journal-text" },
  { title: "Chapters", value: dashboard.chapters?.total || 0, icon: "bi-file-text" },
 ]
  console.log('stats', stats)

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
            <div className="col-12" key={index}>
              <div className="card p-4 shadow-sm ">
                <h6 className="text-center mb-2 fw-semibold">{item.title}</h6>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={item.data}  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="5 5" />

                    <XAxis dataKey="name" />
                    <YAxis />

                    <Tooltip />
                    <Legend />

                    <Bar dataKey="value" barSize={40}>
                      {item.data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
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
