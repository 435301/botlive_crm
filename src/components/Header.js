import React, { useState } from "react";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { logoutAdmin } from "../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = ({ toggleSidebar, toggleCollapse, collapsed }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/login");
  }

  return (
    <header className={`header ${collapsed ? "collapsed" : ""}`}>
      {/* Left side */}
      <div className="header-left">
        {/* Mobile: Open sidebar | Desktop: Collapse sidebar */}
        <button
          className="btn-menu d-lg-none"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <button
          className="btn-collapse d-none d-lg-flex"
          onClick={toggleCollapse}
          aria-label="Collapse sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right side */}
      <div className="header-right">
        <div
          className={`profile ${openProfile ? "open" : ""}`}
          onClick={() => setOpenProfile(!openProfile)}
        >
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=019aa8&color=fff"
            alt="Profile"
          />
          <ChevronDown size={14} />
        </div>

        {openProfile && (
          <div className="profile-menu">
            <div className="profile-item">
              <User size={16} /> My Profile
            </div>
            <div className="profile-item danger" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;