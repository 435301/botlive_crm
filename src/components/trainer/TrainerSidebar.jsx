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
import { logoutTrainer } from "../../redux/slices/trainerSlice";

const TrainerSidebar = ({ collapsed, show, closeSidebar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const getNavLinkClass = ({ isActive }) =>
        `nav-link ${isActive ? "active" : ""}`;

    const handleLogout = () => {
        dispatch(logoutTrainer());
        navigate("/trainer/login");
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
                    <NavLink to="/trainer/dashboard" className={getNavLinkClass}>
                        <LayoutDashboard size={18} />
                        {!collapsed && <span>Dashboard</span>}
                    </NavLink>


                    {/* Cirriculam Dropdown */}
                    <NavLink to="/trainer/manage-chapters" className={getNavLinkClass}>
                        <Building2 size={18} />
                        {!collapsed && <span>Curriculam</span>}
                    </NavLink>


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
                            <NavLink to="/trainer/report-students" className={getNavLinkClass}>
                                Schools
                            </NavLink>

                            <NavLink to="/trainer/report-skills" className={getNavLinkClass}>
                                Skill centre
                            </NavLink>
                        </div>
                    </div>

                    {/* Change Password */}
                    <NavLink to="/trainer/change-password" className={getNavLinkClass}>
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

export default TrainerSidebar;
