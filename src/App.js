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
// import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/PublicRoute";
import AddState from "./pages/superAdmin/AddState";
import AddDistrict from "./pages/superAdmin/AddDistrict";
import ManageDistrict from "./pages/superAdmin/ManageDistrict";

const Dashboard = lazy(() => import("./pages/superAdmin/Dashboard"));
const Login = lazy(() => import("./pages/superAdmin/Login"));
const Manage = lazy(() => import("./pages/superAdmin/Manage"));
const Settings = lazy(() => import("./pages/superAdmin/Settings"));

const AddSkills = lazy(() => import("./pages/superAdmin/AddSkills"));
const AddCourse = lazy(() => import("./pages/superAdmin/AddCourse"));
const ManageCourse = lazy(() => import("./pages/superAdmin/ManageCourse"));
const AddTrainers = lazy(() => import("./pages/superAdmin/AddTrainers"));
const ManageTrainers = lazy(() => import("./pages/superAdmin/ManageTrainers"));
const AddModule = lazy(() => import("./pages/superAdmin/AddModule"));
const ManageModule = lazy(() => import("./pages/superAdmin/ManageModule"));
const AddChapters = lazy(() => import("./pages/superAdmin/AddChapters"));
const ManageChaptersModule = lazy(
  () => import("./pages/superAdmin/ManageChapters"),
);
const AddGrades = lazy(() => import("./pages/superAdmin/AddGrades"));
const ManageGrades = lazy(() => import("./pages/superAdmin/ManageGrades"));
const AddAssignedChapters = lazy(
  () => import("./pages/superAdmin/AddAssignChapters"),
);
const ManageAssignedChapters = lazy(
  () => import("./pages/superAdmin/ManageAssignChapters"),
);
const AddStudent = lazy(() => import("./pages/superAdmin/AddStudent"));
const ManageStudents = lazy(() => import("./pages/superAdmin/ManageStudents"));
const ManageScholls = lazy(() => import("./pages/superAdmin/ManageScholls"));
const AddSchoolsSkills = lazy(
  () => import("./pages/superAdmin/AddSchoolsSkills"),
);
const ChangePassword = lazy(() => import("./pages/superAdmin/ChangePassword"));
const ManageStates = lazy(() => import("./pages/superAdmin/ManageState"));
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
    // <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
    // </ErrorBoundary>
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
          <Route
            path="/login"
            element={<PublicRoute>{lazyLoad(Login)}</PublicRoute>}
          />
          <Route path="/" element={lazyLoad(Dashboard)} />
          <Route
            path="/superAdmin/manage-skills"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(Manage)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-skills"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddSkills)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddCourse)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/settings"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(Settings)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageCourse)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-trainers"
            element={lazyLoad(AddTrainers)}
          />
          <Route
            path="/superAdmin/manage-trainers"
            element={lazyLoad(ManageTrainers)}
          />
          <Route
            path="/superAdmin/add-module"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddModule)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-module"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageModule)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageChaptersModule)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-grade"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-grades"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-assigned-chapter"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddAssignedChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-assigned-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageAssignedChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-student"
            element={lazyLoad(AddStudent)}
          />
          <Route
            path="/superAdmin/manage-students"
            element={lazyLoad(ManageStudents)}
          />
          <Route
            path="/superAdmin/manage-schools"
            element={lazyLoad(ManageScholls)}
          />
          <Route
            path="/superAdmin/add-schools-skills"
            element={lazyLoad(AddSchoolsSkills)}
          />
          <Route
            path="/superAdmin/change-password"
            element={lazyLoad(ChangePassword)}
          />
          <Route
            path="/superAdmin/add-state"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddState)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-state/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddState)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-states"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageStates)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-district"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddDistrict)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-district/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddDistrict)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-districts"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(ManageDistrict)}
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}
<ToastContainer position="top-right" autoClose={3000} theme="colored" />;

export default App;
