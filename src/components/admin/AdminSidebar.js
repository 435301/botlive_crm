import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  FileText,
  ChevronDown,
  KeyRound,
  LogOut,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

const Sidebar = ({ collapsed, show, closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      {/* Mobile backdrop */}
      {show && (
        <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar} />
      )}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          show ? "show" : ""
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
          <NavLink to="/" className={getNavLinkClass}>
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          {/* Campus Dropdown */}
          <div className="nav-group">
            <div className="nav-link" onClick={() => toggleMenu("campus")}>
              <Building2 size={18} />
              {!collapsed && (
                <>
                  <span>Campuses</span>
                  <ChevronDown
                    size={16}
                    className={`arrow ${openMenu === "campus" ? "rotate" : ""}`}
                  />
                </>
              )}
            </div>

            <div className={`submenu ${openMenu === "campus" ? "open" : ""}`}>
              <NavLink to="/admin/manage-schools" className={getNavLinkClass}>
                School
              </NavLink>

              <NavLink to="/admin/manage-skills" className={getNavLinkClass}>
                SKill Center{" "}
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
                    className={`arrow ${
                      openMenu === "reports" ? "rotate" : ""
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
