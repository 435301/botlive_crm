import React, { useState, useEffect, lazy, Suspense } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/PublicRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Manage = lazy(() => import("./pages/Manage"));
const AddSkills = lazy(() => import("./pages/AddSkills"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const ManageCourse = lazy(() => import("./pages/ManageCourse"));
const AddTrainers = lazy(() => import("./pages/AddTrainers"));
const ManageTrainers = lazy(() => import("./pages/ManageTrainers"));
const AddModule = lazy(() => import("./pages/AddModule"));
const ManageModule = lazy(() => import("./pages/ManageModule"));
const AddChapters = lazy(() => import("./pages/AddChapters"));
const ManageChaptersModule = lazy(() => import("./pages/ManageChapters"));
const AddGrades = lazy(() => import("./pages/AddGrades"));
const ManageGrades = lazy(() => import("./pages/ManageGrades"));
const AddAssignedChapters = lazy(() => import("./pages/AddAssignChapters"));
const ManageAssignedChapters = lazy(() => import("./pages/ManageAssignChapters"));
const AddStudent = lazy(() => import("./pages/AddStudent"));
const ManageStudents = lazy(() => import("./pages/ManageStudents"));
const ManageScholls = lazy(() => import("./pages/ManageScholls"));
const AddSchoolsSkills = lazy(() => import("./pages/AddSchoolsSkills"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
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

  //  LOGIN PAGE (no header, no sidebar, no content)
  if (isLoginPage) {
    return <>{children}</>;
  }

  //  ALL OTHER PAGES
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

  const lazyLoad = (Component) => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );


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
          <Route path="/login" element={<PublicRoute>{lazyLoad(Login)}</PublicRoute>} />
          <Route path="/" element={lazyLoad(Dashboard)} />
          <Route path="/manage-skills" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(Manage)}</ProtectedRoute>} />
          <Route path="/add-skills" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddSkills)}</ProtectedRoute>} />
          <Route path="/add-course" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddCourse)}</ProtectedRoute>} />
          <Route path="/manage-course" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(ManageCourse)}</ProtectedRoute>} />
          <Route path="/add-trainers" element={lazyLoad(AddTrainers)} />
          <Route path="/manage-trainers" element={lazyLoad(ManageTrainers)} />
          <Route path="/add-module" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddModule)}</ProtectedRoute>} />
          <Route path="/manage-module" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(ManageModule)}</ProtectedRoute>} />
          <Route path="/add-chapters" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddChapters)}</ProtectedRoute>} />
          <Route path="/manage-chapters" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(ManageChaptersModule)}</ProtectedRoute>} />
          <Route path="/add-grade" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddGrades)}</ProtectedRoute>} />
          <Route path="/manage-grades" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(ManageGrades)}</ProtectedRoute>} />
          <Route path="/add-assigned-chapter" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(AddAssignedChapters)}</ProtectedRoute>} />
          <Route path="/manage-assigned-chapters" element={<ProtectedRoute allowedRoles={["Admin"]}>{lazyLoad(ManageAssignedChapters)}</ProtectedRoute>} />
          <Route path="/add-student" element={lazyLoad(AddStudent)} />
          <Route path="/manage-students" element={lazyLoad(ManageStudents)} />
          <Route path="/manage-schools" element={lazyLoad(ManageScholls)} />
          <Route path="/add-schools-skills" element={lazyLoad(AddSchoolsSkills)} />
          <Route path="/change-password" element={lazyLoad(ChangePassword)} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

  <ToastContainer position="top-right" autoClose={3000} />

export default App;
