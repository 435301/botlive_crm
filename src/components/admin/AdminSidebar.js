import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  FileText,
  ChevronDown,
  KeyRound,
  LogOut,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { logoutSubAdmin } from "../../redux/slices/subAdminSlice";

const AdminSidebar = ({ collapsed, show, closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    dispatch(logoutSubAdmin());
    navigate("/admin/login");
  };


  return (
    <>
      {/* Mobile backdrop */}
      {show && (
        <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar} />
      )}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${show ? "show" : ""
          }`}
      >
        {/* Logo */}
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
          <NavLink to="/admin/dashboard" className={getNavLinkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>


          {/* Trainer Dropdown */}
          <div className="nav-group">
            <div className="nav-link" onClick={() => toggleMenu("trainers")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Trainers</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "trainers" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>

            <div className={`submenu ${openMenu === "trainers" ? "open" : ""}`}>
              <NavLink to="/admin/add-trainer" className={getNavLinkClass}>
                Add Trainer
              </NavLink>

              <NavLink to="/admin/manage-trainers" className={getNavLinkClass}>
                Manage Trainer
              </NavLink>
            </div>
          </div>

          {/* Cirriculam Dropdown */}
          <div className="nav-group">
            <div className="nav-link" onClick={() => toggleMenu("curriculam")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Curriculam</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "curriculam" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>

            <div className={`submenu ${openMenu === "curriculam" ? "open" : ""}`}>
              <NavLink to="/admin/manage-chapters" className={getNavLinkClass}>
                Chapters
              </NavLink>
            </div>
          </div>

          {/* Student Dropdown */}
          <div className="nav-group">
            <div className="nav-link" onClick={() => toggleMenu("students")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Students</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "students" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>

            <div className={`submenu ${openMenu === "students" ? "open" : ""}`}>
              <NavLink to="/admin/add-student" className={getNavLinkClass}>
                Add Student
              </NavLink>

              <NavLink to="/admin/manage-students" className={getNavLinkClass}>
                Manage Students
              </NavLink>
            </div>
          </div>

          {/* Reports Dropdown */}
          <div className="nav-group">
            <div className="nav-link" onClick={() => toggleMenu("reports")}>
              <FileText size={18} />
              {!collapsed && (
                <>
                  <span>Reports</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "reports" ? "rotate" : ""
                      }`}
                  />
                </>
              )}
            </div>

            <div className={`submenu ${openMenu === "reports" ? "open" : ""}`}>
              <NavLink to="/admin/report-students" className={getNavLinkClass}>
                Schools
              </NavLink>

              <NavLink to="/admin/report-skills" className={getNavLinkClass}>
                Skill centre
              </NavLink>
            </div>
          </div>

          {/* Change Password */}
          <NavLink to="/admin/change-password" className={getNavLinkClass}>
            <KeyRound size={18} />
            {!collapsed && <span>Change Password</span>}
          </NavLink>

          {/* Logout */}
          <div className="nav-link cursor" onClick={handleLogout}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
