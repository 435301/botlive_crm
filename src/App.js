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
import PublicRoute from "./components/PublicRoute";
import AddState from "./pages/superAdmin/AddState";
import AddDistrict from "./pages/superAdmin/AddDistrict";
import ManageDistrict from "./pages/superAdmin/ManageDistrict";
import ManageFounders from "./pages/superAdmin/ManageFounders";
import AddFounder from "./pages/superAdmin/AddFounder";
import { Toaster } from "react-hot-toast";
import ManageCategory from "./pages/superAdmin/ManageCategory";
import AddCategories from "./pages/superAdmin/AddCategory";
import ManageQualification from "./pages/superAdmin/ManageQualification";
import AddQualification from "./pages/superAdmin/AddQualification";
import AddOccupation from "./pages/superAdmin/AddOccupation";
import ManageOccupations from "./pages/superAdmin/ManageOccupations";
import PieDetail from "./pages/superAdmin/PieDetail";

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
// Admin

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAddSchoolsSkills = lazy(
  () => import("./pages/admin/AdminAddSchoolsSkills"),
);
const AdminAddSkills = lazy(() => import("./pages/admin/AdminAddSkills"));
const AdminManageScholls = lazy(
  () => import("./pages/admin/AdminManageScholls"),
);
const AdminManageSkills = lazy(() => import("./pages/admin/AdminManageSkills"));
const ManageReportStudents = lazy(
  () => import("./pages/admin/ManageReportStudents"),
);
const SchollDetails = lazy(() => import("./pages/admin/SchollDetails"));
const SkillsDetails = lazy(() => import("./pages/admin/SkillsDetails"));
const AdminChangePassword = lazy(
  () => import("./pages/admin/AdminChangePassword"),
);

const ManageReportSkills = lazy(
  () => import("./pages/admin/ManageReportSkills"),
);
// SchoolSkillCenter
const SchoolSkillLogin = lazy(
  () => import("./pages/SchoolSkillCenter/SchoolSkillLogin"),
);
// Trainer Modules
const TrainerModuleLogin = lazy(
  () => import("./pages/TrainerModule/TrainerModuleLogin"),
);
// Student Module

const StudentModuleLogin = lazy(
  () => import("./pages/StudentModule/StudentModuleLogin"),
);
// Admin

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
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
  const noLayoutPaths = [
    "/",
    "/school-skill-center/login",
    "/trainer-module/login",
    "/student-module/login",
    "/admin/login",
  ];
  if (noLayoutPaths.includes(location.pathname)) {
    return <>{children}</>; // no header/sidebar
  }

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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
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

          <Route
            path="/"
            element={<PublicRoute>{lazyLoad(Login)}</PublicRoute>}
          />

          <Route
            path="/superAdmin"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(Dashboard)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-skill-centres"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(Manage)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-skill-centre"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddSkills)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-skill-centre/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddSkills)}
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
            path="/superAdmin/add-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddCourse)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-course/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddCourse)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
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
                {" "}
                {lazyLoad(AddModule)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-module/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddModule)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-module"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageModule)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-chapter/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageChaptersModule)}{" "}
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
            path="/superAdmin/edit-grade/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-grades"
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
          <Route
            path="/superAdmin/manage-administrator"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageFounders)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-administrator"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddFounder)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-administrator/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddFounder)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-category"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageCategory)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-category"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddCategories)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-category/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddCategories)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-qualification"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageQualification)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-qualification"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddQualification)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-qualification/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddQualification)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-occupation"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(ManageOccupations)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-occupation"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {" "}
                {lazyLoad(AddOccupation)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-occupation/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(AddOccupation)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/pie-detail"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]}>
                {lazyLoad(PieDetail)}
              </ProtectedRoute>
            }
          />

          <Route path="/admin/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/add-schools-skills"
            element={<AdminAddSchoolsSkills />}
          />
          <Route path="/admin/add-skills" element={<AdminAddSkills />} />
          <Route
            path="/admin/manage-schools"
            element={<AdminManageScholls />}
          />
          <Route path="/admin/manage-skills" element={<AdminManageSkills />} />
          <Route
            path="/admin/report-students"
            element={<ManageReportStudents />}
          />
          <Route path="/admin/scholl-details" element={<SchollDetails />} />
          <Route path="/admin/report-skills" element={<ManageReportSkills />} />
          <Route path="/admin/skill-details" element={<SkillsDetails />} />
          <Route
            path="/admin/change-password"
            element={<AdminChangePassword />}
          />

          {/* SchoolSkillCenter login */}
          <Route
            path="/school-skill-center/login"
            element={<SchoolSkillLogin />}
          />
          {/* Trainer Moduke login */}
          <Route
            path="/trainer-module/login"
            element={<TrainerModuleLogin />}
          />
          {/* Student Moduke login */}
          <Route
            path="/student-module/login"
            element={<StudentModuleLogin />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
