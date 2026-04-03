import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import { useCrud } from "../../hooks/useCrud";
import { CountUp } from "../../utils/countUp";

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
    listUrl: "/activity/dashboard/list",
  });

  const { data: activityData } = useList({
    centreId: ""
  });

  const activityRawData = activityData?.data;
  console.log('activityRawData', activityRawData)

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


  const { useGetAll: useGetPromoVideo } = useCrud({
    entity: "promoVideo",
    getAllUrl: "/activity/get/PromoVideo",
  });

  const { data: promoVideoData } = useGetPromoVideo();
  const promoVideo = promoVideoData?.data || {};

  const handleChartClick = (item) => {
    navigate("/superAdmin/pie-detail", { state: { chartData: { title: item.title, data: item.data.slice(0, 2) } } });
  };

  const { data } = useGetAll();
  const dashboard = data?.data || [];
  const centreTypeWise = dashboard?.centreTypeWise || [];

  const desiredOrder = [2, 3, 1, 4, 5];

  const stats = [
    {
      title: "Skill Development",
      value: dashboard.skillDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.skillDevelopmentCentres?.active || 0} Active`,
      subtitleInactive: `${dashboard.skillDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      subtitleColor: "success",
      icon: "bi-building",
      iconBg: "#e8f5ff",
      iconColor: "#0d6efd",
      onClick: () => navigate(`/superAdmin/manage-skill-centres?centreType=1`),
      totalStudents: dashboard?.skillDevelopmentCentres?.totalStudents || 0,
      enrolledStudents: dashboard?.skillDevelopmentCentres?.totalEnrolled || 0,
      maleStudents: dashboard?.skillDevelopmentCentres?.totalMale || 0,
      femaleStudents: dashboard?.skillDevelopmentCentres?.totalFemale || 0,
    },
    {
      title: "AI And Stem Learning",
      value: dashboard.aiAndStemLearningCentres?.total || 0,
      subtitle: `${dashboard.aiAndStemLearningCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.aiAndStemLearningCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-mortarboard",
      iconBg: "#fff4e5",
      iconColor: "#ff9800",
      onClick: () => navigate("/superAdmin/manage-skill-centres?centreType=2"),
      totalStudents: dashboard?.aiAndStemLearningCentres?.totalStudents || 0,
      enrolledStudents: dashboard?.aiAndStemLearningCentres?.totalEnrolled || 0,
      maleStudents: dashboard?.aiAndStemLearningCentres?.totalMale || 0,
      femaleStudents: dashboard?.aiAndStemLearningCentres?.totalFemale || 0,
    },
    {
      title: "School Education",
      value: dashboard.educationDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.educationDevelopmentCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.educationDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-people",
      iconBg: "#e8ffe8",
      iconColor: "#28a745",
      onClick: () => navigate("/superAdmin/manage-skill-centres?centreType=3"),
      totalStudents: dashboard?.educationDevelopmentCentres?.totalStudents || 0,
      enrolledStudents: dashboard?.educationDevelopmentCentres?.totalEnrolled || 0,
      maleStudents: dashboard?.educationDevelopmentCentres?.totalMale || 0,
      femaleStudents: dashboard?.educationDevelopmentCentres?.totalFemale || 0,
    },
    {
      title: "Innovation And Entrepreneurship",
      value: dashboard.innovationAndEntrepreneursCentres?.total || 0,
      subtitle: `${dashboard.innovationAndEntrepreneursCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.innovationAndEntrepreneursCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-person-badge",
      iconBg: "#f3e8ff",
      iconColor: "#6f42c1",
      onClick: () => navigate("/superAdmin/manage-skill-centres?centreType=4"),
      totalStudents: dashboard?.innovationAndEntrepreneursCentres?.totalStudents || 0,
      enrolledStudents: dashboard?.innovationAndEntrepreneursCentres?.totalEnrolled || 0,
      maleStudents: dashboard?.innovationAndEntrepreneursCentres?.totalMale || 0,
      femaleStudents: dashboard?.innovationAndEntrepreneursCentres?.totalFemale || 0,
    },
    {
      title: "Community Development",
      value: dashboard.communityDevelopmentCentres?.total || 0,
      subtitle: `${dashboard.communityDevelopmentCentres?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.communityDevelopmentCentres?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-book",
      iconBg: "#e8f0ff",
      iconColor: "#3f51b5",
      onClick: () => navigate("/superAdmin/manage-skill-centres?centreType=5"),
      totalStudents: dashboard?.communityDevelopmentCentres?.totalStudents || 0,
      enrolledStudents: dashboard?.communityDevelopmentCentres?.totalEnrolled || 0,
      maleStudents: dashboard?.communityDevelopmentCentres?.totalMale || 0,
      femaleStudents: dashboard?.communityDevelopmentCentres?.totalFemale || 0,
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
      value: dashboard?.trainers?.total || 0,
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
    {
      title: "Activties",
      value: dashboard.activities?.total || 0,
      subtitle: `${dashboard.activities?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.activities?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-activities"),
    },
    {
      title: "Activity Photos",
      value: dashboard.activities?.active || 0,
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-activities"),
    },
  ];

  const statsBottom = [

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
      title: "Enrolled Students",
      value: dashboard.students?.enrolled || 0,
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
      value: dashboard?.trainers?.total || 0,
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
    {
      title: "Activties",
      value: dashboard.activities?.total || 0,
      subtitle: `${dashboard.activities?.active || 0} Active`,
      subtitleColor: "success",
      subtitleInactive: `${dashboard.activities?.inactive || 0} Inactive`,
      subtitleInactiveColor: "danger",
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-activities"),
    },
    {
      title: "Activity Photos",
      value: dashboard.activities?.active || 0,
      icon: "bi-journal-text",
      iconBg: "#e6f9ff",
      iconColor: "#20c997",
      onClick: () => navigate("/superAdmin/manage-activities"),
    },
  ];

  const SOCIAL_STATUS_COLORS = [
    "#009CA6", // blue
    "#93C90E", // green
    "#00A5DF", // cyan
    "#FFA300", // yellow
    "#e74a3b", // red
    "#75787B", // gray
    "#fd7e14", // orange
    "#7F35B2", // purple
    "#20c997", // teal
    "#F8485E", // pink
    "#6610f2", // violet
  ];


  return (
    <div className="container-fluid">

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

        <div className="container-fluid">

          {/* {centreTypeWise.map((centre, index) => {
            const statCard = stats.find(
              (s) => s.onClick?.toString().includes(`centreType=${centre.centreType}`)
            ); */}

          {centreTypeWise
            .sort((a, b) =>
              desiredOrder.indexOf(a.centreType) -
              desiredOrder.indexOf(b.centreType)
            )
            .map((centre, index) => {
              const statCard = stats.find(
                (s) => s.onClick?.toString().includes(`centreType=${centre.centreType}`)
              );

              return (
                <div key={index} className="mb-5">

                  {/* ===== STAT CARD ===== */}
                  {statCard && (
                    <div className="row mb-4 align-items-center">

                      {/* LEFT: Main Stat Card */}
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div
                          className="card rounded-3 p-3 shadow-sm h-100 cursor"
                          style={{ backgroundColor: "#fff" }}
                          onClick={statCard.onClick}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-3 statsTitle">{statCard.title}</h6>
                              <h3 className="fw-bold">{statCard.value}</h3>
                            </div>

                            <div
                              className="d-flex align-items-center justify-content-center rounded-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: statCard.iconBg,
                                color: statCard.iconColor,
                                fontSize: "1.2rem",
                              }}
                            >
                              <i className={`bi ${statCard.icon}`}></i>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* RIGHT: 4 Small Stats */}
                      <div className="col-md-8">
                        <div className="row text-center">

                          <div className="col-6 col-md-3 mb-3">
                            <div className="p-3 h-100">
                              <h6 className="text-secondary">Total Students</h6>
                              <CountUp value={statCard.totalStudents} duration={800} />
                            </div>
                          </div>

                          <div className="col-6 col-md-3 mb-3">
                            <div className="p-3 h-100">
                              <h6 className="text-secondary">Enrolled</h6>
                              <CountUp value={statCard.enrolledStudents} duration={800} />
                            </div>
                          </div>

                          <div className="col-6 col-md-3 mb-3">
                            <div className="p-3 h-100">
                              <h6 className="text-secondary">Male</h6>
                              <CountUp value={statCard.maleStudents} duration={800} />
                            </div>
                          </div>

                          <div className="col-6 col-md-3 mb-3">
                            <div className="p-3 h-100">
                              <h6 className="text-secondary">Female</h6>
                              <CountUp value={statCard.femaleStudents} duration={800} />
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="container" >
                        <div style={{
                          margin: "0px",
                          color: "#016b75",
                          borderBottom: "3px solid #016b75"
                        }}
                        />

                      </div>

                    </div>
                  )}


                  {/* ===== CENTRE TYPE WISE STATISTICS ===== */}
                  {/* <h4 className="fw-bold mb-4">
                  {getCentreTypeName(centre.centreType)}
                </h4> */}

                  <div className="row g-4">
                    <div className="col-lg-7 col-12">
                      <div className="row">

                        {/* Gender */}
                        <div className="col">
                          <div className="cardDashboard shadow-sm h-100 p-1">
                            <h6 className="text-center fw-semibold mb-3">Gender</h6>

                            {(centre?.gender?.male || centre?.gender?.female) ? (
                              <ResponsiveContainer width="100%" height={230}>
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Male", value: centre?.gender?.male || 0 },
                                      { name: "Female", value: centre?.gender?.female || 0 }
                                    ]}
                                    dataKey="value"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                  >
                                    <Cell fill="#00A5DF" />
                                    <Cell fill="#F8485E" />
                                  </Pie>
                                  <Tooltip />
                                  <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                              </ResponsiveContainer>
                            ) : (
                              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                                No Data Found
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Performance */}
                        <div className="col">
                          <div className="cardDashboard shadow-sm h-100 p-1">
                            <h6 className="text-center fw-semibold mb-3">Performance</h6>

                            {centre?.performance?.length ? (
                              <ResponsiveContainer width="100%" height={230}>
                                <PieChart>
                                  <Pie
                                    data={centre.performance.map(item => ({
                                      name: item.performanceName,
                                      value: Number(item.percentage)
                                    }))}
                                    dataKey="value"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                  >
                                    <Cell fill="#93C90E" />
                                    <Cell fill="#FFA300" />
                                    <Cell fill="#dc3545" />
                                  </Pie>
                                  <Tooltip />
                                  <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                              </ResponsiveContainer>
                            ) : (
                              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                                No Data Found
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Login Report */}
                        <div className="col">
                          <div className="cardDashboard shadow-sm h-100 p-1">
                            <h6 className="text-center fw-semibold mb-3">Login Report</h6>

                            {(centre?.loginReport?.loggedIn || centre?.loginReport?.notLoggedIn) ? (
                              <ResponsiveContainer width="100%" height={230}>
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Logged In", value: centre?.loginReport?.loggedIn || 0 },
                                      { name: "No logged In", value: centre?.loginReport?.notLoggedIn || 0 }
                                    ]}
                                    dataKey="value"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                  >
                                    <Cell fill="#17a2b8" />
                                    <Cell fill="#75787B" />
                                  </Pie>
                                  <Tooltip />
                                  <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                              </ResponsiveContainer>
                            ) : (
                              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                                No Data Found
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Social Status */}
                    <div className="col-lg-5 col-12">
                      <div className="cardDashboard shadow-sm h-100 p-1">
                        <h6 className="text-center fw-semibold mb-3">Social Status</h6>

                        {centre?.socialStatus?.length ? (
                          <ResponsiveContainer width="100%" height={230}>
                            <PieChart>
                              <Pie
                                data={centre.socialStatus.map(item => ({
                                  name: item.categoryName,
                                  value: item.count
                                }))}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={3}
                              >
                                {centre.socialStatus.map((_, i) => (
                                  <Cell
                                    key={i}
                                    fill={SOCIAL_STATUS_COLORS[i % SOCIAL_STATUS_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                            No Data Found
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

        </div>


        {/* ===== LOCATION DONUT PIE CHARTS ===== */}
        <div className="container mt-4">
          <h5 className="fw-bold mt-3"> Attendance Performance </h5>

          <div className="row g-4 mt-2">
            <div className="col-md-12">

              <div className="row">
                {attendanceData.map((item, index) => (<div className="col-12 col-md-6 col-lg-3 mb-3" key={index} onClick={() => handleChartClick(item)} style={{ cursor: "pointer" }}>
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
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <video
                    key={promoVideo?.url}
                    width="100%"
                    controls
                    autoPlay={false}
                    muted
                    loop
                    className="promoVideo"
                  >
                    <source
                      src={promoVideo?.url || promoVideo?.video}
                      // src="https://www.cyientfoundation.org/wp-content/uploads/2025/11/CYFINTROvid.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>


            {/* <div className="col-md-4">

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
                         <p className="activityTitle">{activity.centreName}</p>
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

            </div> */}


          </div>
        </div>

        <div className="row">
          {/* Stats Cards Section */}
          <div className="row">
            {statsBottom.map((item, i) => (
              <div className="col-md-4 p-2" key={i}>
                <div
                  className="card rounded-3 p-3 shadow-sm h-100 cursor"
                  style={{ backgroundColor: "#fff" }}
                  onClick={item.onClick}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-3 statsTitle">{item.title}</h6>
                      <h3 className="fw-bold">{item.value}</h3>
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

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
