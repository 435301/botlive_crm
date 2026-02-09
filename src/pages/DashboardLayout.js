import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../App.css";
import StudentTable from "./StudentTable";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("collapsed")) || false,
  );
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false,
  );

  useEffect(() => {
    localStorage.setItem("collapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("dark", dark);
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <>
      <Sidebar collapsed={collapsed} />
      <Header
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        toggleTheme={() => setDark(!dark)}
        dark={dark}
      />

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <div className="card">
          <h4>Dashboard Content</h4>
          <p>Your content goes here 🚀</p>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
