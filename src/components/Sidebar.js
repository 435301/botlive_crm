import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  ChevronDown,
  Building2,
  UserCog,
  BookOpen,
  Layers,
  GraduationCap,
  KeyRound,
  LogOut,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { logoutAdmin } from "../redux/slices/adminSlice";

const Sidebar = ({ collapsed, show, closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close all submenus when route changes
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  const isParentActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path));

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {show && (
        <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar} />
      )}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${show ? "show" : ""}`}
      >
        {/* Logo + Close button (mobile only) */}
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <button
            className="btn-close-sidebar d-lg-none"
            onClick={closeSidebar}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* Dashboard */}
          <NavLink to="/" className={getNavLinkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          {/* master data  */}
          <div
            className={`nav-group ${isParentActive(["/add-state", "/manage-states",  "/add-city",  "/manage-cities",]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("masterData")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Master Data</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "masterData" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div
              className={`submenu ${openMenu === "masterData" ? "open" : ""}`}
            >
              <NavLink to="/add-state" className={getNavLinkClass}>
                Add State
              </NavLink>
              <NavLink to="/manage-states" className={getNavLinkClass}>
                Manage States
              </NavLink>

               <NavLink to="/add-city" className={getNavLinkClass}>
                Add City
              </NavLink>
              <NavLink to="/manage-cities" className={getNavLinkClass}>
                Manage Cities
              </NavLink>
            </div>
          </div>

          {/* Skill Center Management */}
          <div
            className={`nav-group ${isParentActive(["/add-skills", "/manage-skills"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("skillCenter")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Skill Center Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "skillCenter" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div
              className={`submenu ${openMenu === "skillCenter" ? "open" : ""}`}
            >
              <NavLink to="/add-skills" className={getNavLinkClass}>
                Add Skill Center
              </NavLink>
              <NavLink to="/manage-skills" className={getNavLinkClass}>
                Manage Skill Centers
              </NavLink>
            </div>
          </div>

          {/* School Center Management */}
          {/* <div
            className={`nav-group ${isParentActive(["/add-school", "/manage-school"]) ? "active" : ""
              }`}
          >
            <div
              className="nav-link"
              onClick={() => toggleMenu("schoolCenter")}
            >
              <GraduationCap size={18} />
              {!collapsed && (
                <>
                  <span>School Center Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "schoolCenter" ? "rotate" : ""
                      }`}
                  />
                </>
              )}
            </div>

            <div
              className={`submenu ${openMenu === "schoolCenter" ? "open" : ""}`}
            >
              <NavLink to="/add-schools-skills" className={getNavLinkClass}>
                Add School Center
              </NavLink>
              <NavLink to="/manage-schools" className={getNavLinkClass}>
                Manage School Centers
              </NavLink>
            </div>
          </div> */}

          {/* Trainer Management */}
          <div
            className={`nav-group ${isParentActive(["/add-trainers", "/manage-trainers"])
              ? "active"
              : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("trainer")}>
              <UserCog size={18} />
              {!collapsed && (
                <>
                  <span>Trainer Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "trainer" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "trainer" ? "open" : ""}`}>
              <NavLink to="/add-trainers" className={getNavLinkClass}>
                Add Trainer
              </NavLink>
              <NavLink to="/manage-trainers" className={getNavLinkClass}>
                Manage Trainers
              </NavLink>
            </div>
          </div>

          {/* Course Management */}
          <div
            className={`nav-group ${isParentActive(["/add-course", "/manage-course"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("course")}>
              <BookOpen size={18} />
              {!collapsed && (
                <>
                  <span>Course Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "course" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "course" ? "open" : ""}`}>
              <NavLink to="/add-course" className={getNavLinkClass}>
                Add Course
              </NavLink>
              <NavLink to="/manage-course" className={getNavLinkClass}>
                Manage Courses
              </NavLink>
            </div>
          </div>

          {/* Modules Management */}
          <div
            className={`nav-group ${isParentActive(["/add-module", "/manage-module"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("modules")}>
              <Layers size={18} />
              {!collapsed && (
                <>
                  <span>Modules Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "modules" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "modules" ? "open" : ""}`}>
              <NavLink to="/add-module" className={getNavLinkClass}>
                Add Module
              </NavLink>
              <NavLink to="/manage-module" className={getNavLinkClass}>
                Manage Modules
              </NavLink>
            </div>
          </div>

          {/* Chapters Management */}
          <div
            className={`nav-group ${isParentActive(["/add-chapters", "/manage-chapters"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("chapters")}>
              <Layers size={18} />
              {!collapsed && (
                <>
                  <span>Chapters Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "chapters" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "chapters" ? "open" : ""}`}>
              <NavLink to="/add-chapters" className={getNavLinkClass}>
                Add Chapter
              </NavLink>
              <NavLink to="/manage-chapters" className={getNavLinkClass}>
                Manage Chapters
              </NavLink>
            </div>
          </div>

          {/* Grades/Batches Management */}
          <div
            className={`nav-group ${isParentActive(["/add-grade", "/manage-grades"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("grades")}>
              <Layers size={18} />
              {!collapsed && (
                <>
                  <span>Grades/Batches Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "grades" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "grades" ? "open" : ""}`}>
              <NavLink to="/add-grade" className={getNavLinkClass}>
                Add Grade
              </NavLink>
              <NavLink to="/manage-grades" className={getNavLinkClass}>
                Manage Grades
              </NavLink>
            </div>
          </div>

          {/* Assign chapter management */}
          <div
            className={`nav-group ${isParentActive(["/add-assigned-chapter", "/manage-assigned-chapters"]) ? "active" : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("add-assigned-chapter")}>
              <Layers size={18} />
              {!collapsed && (
                <>
                  <span>Assign Chapter Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "add-assigned-chapter" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "add-assigned-chapter" ? "open" : ""}`}>
              <NavLink to="/add-assigned-chapter" className={getNavLinkClass}>
                Assign Chapter
              </NavLink>
              <NavLink to="/manage-assigned-chapters" className={getNavLinkClass}>
                Manage Assigned Chapters
              </NavLink>
            </div>
          </div>

          {/* Student Management */}
          <div
            className={`nav-group ${isParentActive(["/add-student", "/manage-students"])
              ? "active"
              : ""
              }`}
          >
            <div className="nav-link" onClick={() => toggleMenu("students")}>
              <GraduationCap size={18} />
              {!collapsed && (
                <>
                  <span>Student Management</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "students" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>
            <div className={`submenu ${openMenu === "students" ? "open" : ""}`}>
              <NavLink to="/add-student" className={getNavLinkClass}>
                Add Student
              </NavLink>
              <NavLink to="/manage-students" className={getNavLinkClass}>
                Manage Students
              </NavLink>
            </div>
          </div>

          {/* Change Password */}
          <NavLink to="/change-password" className={getNavLinkClass}>
            <KeyRound size={18} />
            {!collapsed && <span>Change Password</span>}
          </NavLink>

          {/* Logout */}
          <NavLink onClick={handleLogout} className="nav-link">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
