import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Manage from "./pages/Manage";
import AddSkills from "./pages/AddSkills";
import AddTrainers from "./pages/AddTrainers";
import ManageTrainers from "./pages/ManageTrainers";
import AddCourse from "./pages/AddCourse";
import ManageCourse from "./pages/ManageCourse";
import AddModule from "./pages/AddModule";
import ManageModule from "./pages/ManageModule";
import AddStudent from "./pages/AddStudent";
import ManageStudents from "./pages/ManageStudents.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ManageScholls from "./pages/ManageScholls.jsx";
import AddSchoolsSkills from "./pages/AddSchoolsSkills.jsx";
/* =========================
   Layout Wrapper
========================= */
function LayoutWrapper({
  children,
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
  dark,
  setDark,
}) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // 👉 LOGIN PAGE (no header, no sidebar, no content)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 👉 ALL OTHER PAGES
  return (
    <>
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        toggleCollapse={() => setCollapsed(!collapsed)}
        toggleTheme={() => setDark(!dark)}
        dark={dark}
      />

      <Sidebar
        show={sidebarOpen}
        collapsed={collapsed}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        {children}
      </div>
    </>
  );
}

/* =========================
   App Component
========================= */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false,
  );
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false,
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <Router>
      <LayoutWrapper
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        dark={dark}
        setDark={setDark}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-skills" element={<Manage />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/manage-course" element={<ManageCourse />} />
          <Route path="/add-trainers" element={<AddTrainers />} />
          <Route path="/manage-trainers" element={<ManageTrainers />} />
          <Route path="/add-module" element={<AddModule />} />
          <Route path="/manage-module" element={<ManageModule />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/manage-students" element={<ManageStudents />} />
          <Route path="/manage-schools" element={<ManageScholls />} />
          <Route path="/manage-schools" element={<ManageScholls />} />
          <Route path="/add-schools-skills" element={<AddSchoolsSkills />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
