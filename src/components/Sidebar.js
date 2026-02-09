import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

const Sidebar = ({ collapsed, show, closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

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

          {/* Skill Center Management */}
          <div
            className={`nav-group ${
              isParentActive(["/add-skills", "/manage-skills"]) ? "active" : ""
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
          <div
            className={`nav-group ${
              isParentActive(["/add-school", "/manage-school"]) ? "active" : ""
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
                    className={`arrow ${
                      openMenu === "schoolCenter" ? "rotate" : ""
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
          </div>

          {/* Trainer Management */}
          <div
            className={`nav-group ${
              isParentActive(["/add-trainers", "/manage-trainers"])
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
            className={`nav-group ${
              isParentActive(["/add-course", "/manage-course"]) ? "active" : ""
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
            className={`nav-group ${
              isParentActive(["/add-module", "/manage-module"]) ? "active" : ""
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

          {/* Student Management */}
          <div
            className={`nav-group ${
              isParentActive(["/add-student", "/manage-students"])
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
          <NavLink to="/logout" className="nav-link">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
