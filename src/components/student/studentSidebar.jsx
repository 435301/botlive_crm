import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  // FileText,
  // ChevronDown,
  KeyRound,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { logoutStudent } from "../../redux/slices/studentSlice";
import { useDispatch } from "react-redux";

const StudentSidebar = ({ collapsed, show, closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  const handleLogout = () => {
    dispatch(logoutStudent());
    navigate("/student/login");
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
          <NavLink to="/student/dashboard" className={getNavLinkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>


          {/* Cirriculam Dropdown */}
          <NavLink to="/student/manage-chapters" className={getNavLinkClass}>
            <Building2 size={18} />
            {!collapsed && <span>Curriculam</span>}
          </NavLink>


          {/* Reports Dropdown */}
          {/* <div className="nav-group">
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
              <NavLink to="/student/report-students" className={getNavLinkClass}>
                Schools
              </NavLink>

              <NavLink to="/student/report-skills" className={getNavLinkClass}>
                Skill centre
              </NavLink>
            </div>
          </div> */}

          <NavLink to="/student/student-attendance" className={getNavLinkClass}>
            <Building2 size={18} />
            {!collapsed && <span>Attendance</span>}
          </NavLink>

             <div className="nav-group">
              <div className="nav-link" onClick={() => toggleMenu("support")}>
                <Building2 size={18} />
                {!collapsed && (
                  <>
                    <span>Support</span>
                    <ChevronDown
                      size={16}
                      className={`arrow ${openMenu === "support" ? "rotate" : ""}`}
                    />
                  </>
                )}
              </div>

              <div className={`submenu ${openMenu === "support" ? "open" : ""}`}>
                <NavLink to="/student/add-support" className={getNavLinkClass}>
                  Add Support
                </NavLink>

                <NavLink to="/student/manage-support" className={getNavLinkClass}>
                  Manage Support
                </NavLink>
             
              </div>
            </div>

          {/* Change Password */}
          <NavLink to="/student/change-password" className={getNavLinkClass}>
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

export default StudentSidebar;
