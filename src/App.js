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
import AddActivity from "./pages/superAdmin/AddActivity";
import ManageActivities from "./pages/superAdmin/ManageActivities";
import ViewActivity from "./pages/superAdmin/ViewActivityFiles";
import StudentDashboard from "./pages/StudentModule/StudentDashboard";
import ManageStudentChapters from "./pages/StudentModule/StudentChapters";
import ViewChapter from "./pages/superAdmin/ViewChapter";
import ViewStudentChapter from "./pages/superAdmin/ViewStudentChapter";
import StudentHeader from "./components/student/StudentHeader";
import StudentSidebar from "./components/student/studentSidebar";
import AdminHeader from "./components/admin/AdminHeader";
import AdminSidebar from "./components/admin/AdminSidebar";

const Dashboard = lazy(() => import("./pages/superAdmin/Dashboard"));
const Login = lazy(() => import("./pages/superAdmin/Login"));
const Manage = lazy(() => import("./pages/superAdmin/Manage"));
const Settings = lazy(() => import("./pages/superAdmin/Settings"));

const AddSkills = lazy(() => import("./pages/superAdmin/AddSkills"));
const AddCourse = lazy(() => import("./pages/superAdmin/AddCourse"));
const ManageCourse = lazy(() => import("./pages/superAdmin/ManageCourse"));
const AddTrainers = lazy(() => import("./pages/superAdmin/AddTrainers"));
const ViewTrainers = lazy(() => import("./pages/admin/ViewTrainer"));
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
const ViewStudent = lazy(()=> import("./pages/superAdmin/ViewStudent"));
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

const ManageAdminChapters = lazy(() => import("./pages/admin/AdminChapters"))
const ViewAdminChapter = lazy(() => import("./pages/admin/ViewChapter"))
const AddAdminStudent = lazy(() => import("./pages/admin/AddAdminStudent"));
const ManageAdminStudents = lazy(() => import("./pages/admin/ManageAdminStudent"));


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
    "/admin/login",
    "/student/login",
  ];
  if (noLayoutPaths.includes(location.pathname)) {
    return <>{children}</>; // no header/sidebar
  }

  //  LOGIN PAGE (no header, no sidebar, no content)
  if (isLoginPage) {
    return <>{children}</>;
  }
  const isStudentRoute = location.pathname.startsWith("/student");
  const isSubAdminRoute = location.pathname.startsWith("/admin");
  //  ALL OTHER PAGES
  return (
    <>
      {/* ===== STUDENT LAYOUT ===== */}
      {isStudentRoute ? (
        <>
          <StudentHeader />
          <StudentSidebar />
          <div className="content">
            {children}
          </div>
        </>
      ) : isSubAdminRoute ? (
        <>
          <AdminHeader />
          <AdminSidebar />
          <div className="content">
            {children}
          </div>
        </>
      ) : (
        /* ===== ADMIN / DEFAULT LAYOUT ===== */
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
      )}
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
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(Dashboard)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-skill-centres"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(Manage)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-skill-centre"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddSkills)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-skill-centre/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddSkills)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/settings"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(Settings)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddCourse)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-course/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddCourse)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-course"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageCourse)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/add-module"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddModule)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-module/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddModule)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-module"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageModule)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddChapters)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-chapter/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddChapters)}
              </ProtectedRoute>
            }
          />
          <Route path="/superAdmin/view-chapter/:id" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login"> {lazyLoad(ViewChapter)} </ProtectedRoute>}
          />
          <Route
            path="/superAdmin/manage-chapters"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageChaptersModule)}{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-grade"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-grade/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-grades"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(ManageGrades)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-assigned-chapter" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login"> {lazyLoad(AddAssignedChapters)}</ProtectedRoute>} />
          <Route
            path="/superAdmin/manage-assigned-chapters" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(ManageAssignedChapters)}</ProtectedRoute>} />
          <Route path="/superAdmin/edit-assigned-chapter/:id" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login"> {lazyLoad(AddAssignedChapters)}</ProtectedRoute>} />
          <Route path="/superAdmin/add-student" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(AddStudent)}</ProtectedRoute>} />
          <Route path="/superAdmin/manage-students" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(ManageStudents)}</ProtectedRoute>} />
           <Route path="/superAdmin/view-student/:id" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(ViewStudent)}</ProtectedRoute>} />
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
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddState)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-state/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddState)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-states"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(ManageStates)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-district"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddDistrict)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-district/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddDistrict)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-districts"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(ManageDistrict)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/manage-administrator"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageFounders)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-administrator"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddFounder)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-administrator/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddFounder)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-category"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageCategory)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-category"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddCategories)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-category/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddCategories)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-qualification"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageQualification)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-qualification"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddQualification)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-qualification/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddQualification)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/manage-occupation"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(ManageOccupations)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/add-occupation"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {" "}
                {lazyLoad(AddOccupation)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/superAdmin/edit-occupation/:id"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(AddOccupation)}
              </ProtectedRoute>
            }
          />

          <Route
            path="/superAdmin/pie-detail"
            element={
              <ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">
                {lazyLoad(PieDetail)}
              </ProtectedRoute>
            }
          />

          <Route path="/superAdmin/manage-activities" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login"> {lazyLoad(ManageActivities)}</ProtectedRoute>} />
          <Route path="/superAdmin/add-activity" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(AddActivity)}</ProtectedRoute>} />
          <Route path="/superAdmin/edit-activity/:id" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(AddActivity)}</ProtectedRoute>} />
          <Route path="/superAdmin/view-activity/:id" element={<ProtectedRoute allowedRoles={["super-admin"]} loginPath="/login">{lazyLoad(ViewActivity)}</ProtectedRoute>} />

          {/* admin routes */}
          <Route path="/admin/login" element={<PublicRoute>{lazyLoad(AdminLogin)}</PublicRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminDashboard)}</ProtectedRoute>} />
          <Route path="/admin/add-schools-skills" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminAddSchoolsSkills)}</ProtectedRoute>} />
          <Route path="/admin/add-skills" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminAddSkills)}</ProtectedRoute>} />
          <Route path="/admin/manage-schools" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminManageScholls)}</ProtectedRoute>} />
          <Route path="/admin/manage-skills" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminManageSkills)}</ProtectedRoute>} />
          <Route path="/admin/report-students" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ManageReportStudents)}</ProtectedRoute>} />
          <Route path="/admin/scholl-details" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(SchollDetails)}</ProtectedRoute>} />
          <Route path="/admin/report-skills" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ManageReportSkills)}</ProtectedRoute>} />
          <Route path="/admin/skill-details" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(SkillsDetails)}</ProtectedRoute>} />
          <Route path="/admin/change-password" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AdminChangePassword)}</ProtectedRoute>} />
          <Route path="/admin/add-trainer" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AddTrainers)}</ProtectedRoute>} />
          <Route path="/admin/edit-trainer/:id" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AddTrainers)}</ProtectedRoute>} />
          <Route path="/admin/view-trainer/:id" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ViewTrainers)}</ProtectedRoute>} />
          <Route path="/admin/manage-trainers" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ManageTrainers)}</ProtectedRoute>} />
          <Route path="/admin/manage-chapters" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ManageAdminChapters)}</ProtectedRoute>} />
          <Route path="/admin/view-chapter/:id" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ViewAdminChapter)}</ProtectedRoute>} />
          <Route path="/admin/add-student" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(AddAdminStudent)}</ProtectedRoute>} />
          <Route path="/admin/manage-students" element={<ProtectedRoute allowedRoles={["sub_admin"]} loginPath="/admin/login">{lazyLoad(ManageAdminStudents)}</ProtectedRoute>} />

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

          {/* Student Module login */}

          <Route path="/student/login" element={<PublicRoute>{lazyLoad(StudentModuleLogin)}</PublicRoute>} />
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]} loginPath="/student/login">{lazyLoad(StudentDashboard)}</ProtectedRoute>} />
          <Route path="/student/manage-chapters" element={<ProtectedRoute allowedRoles={["student"]} loginPath="/student/login">{lazyLoad(ManageStudentChapters)}</ProtectedRoute>} />
          <Route path="/student/view-chapter/:id" element={<ProtectedRoute allowedRoles={["student"]} loginPath="/student/login">{lazyLoad(ViewStudentChapter)}</ProtectedRoute>} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
