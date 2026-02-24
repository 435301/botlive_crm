import React from "react";

const PageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-success" />
        <p className="mt-3">Loading page...</p>
      </div>
    </div>
  );
};

export default PageLoader;