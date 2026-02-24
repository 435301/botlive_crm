import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormActions from "../components/FormActions";
import StatusSelect from "../components/StatusSelect";
import FormInput from "../components/FormInput";

const AddSkillCenter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centerType: "",
    centerName: "",
    course: "",
    moduleName: "",
    videos: [],
    pdfs: [],
    status: "Active",
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ADD BUTTON FUNCTION
  const handleAdd = () => {
    if (!formData.videos.length && !formData.pdfs.length) {
      alert("Please upload videos or PDFs");
      return;
    }

    setItems([
      ...items,
      {
        videos: Array.from(formData.videos),
        pdfs: Array.from(formData.pdfs),
      },
    ]);

    // Reset only file fields
    setFormData({
      ...formData,
      videos: [],
      pdfs: [],
    });
  };

  // FINAL SAVE
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      centerType: formData.centerType,
      centerName: formData.centerName,
      course: formData.course,
      moduleName: formData.moduleName,
      status: formData.status,
      materials: items,
    };

    console.log("FINAL SUBMIT DATA:", payload);

    navigate("/manage-module");
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Modules Management</h5>
          <p className="mb-0">View, edit and manage all modules</p>
        </div>

        <Link to="/manage-module" className="btn btn-outline-primary">
          Manage Modules
        </Link>
      </div>

      {/* FORM */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Module</h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* <div className="col-md-4">
                <label className="form-label">Center Type *</label>
                <select
                  className="form-select"
                  name="centerType"
                  value={formData.centerType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="School">School</option>
                  <option value="Skill Center">Skill Center</option>
                </select>
              </div> */}

              {/* <div className="col-md-4">
                <label className="form-label">School / Skill Center *</label>
                <select
                  className="form-select"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Center A">Center A</option>
                  <option value="Center B">Center B</option>
                  <option value="Center C">Center C</option>
                </select>
              </div> */}

              <div className="col-md-4">
                <label className="form-label">Course <span className="text-danger"> *</span></label>
                <select
                  className="form-select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX">Frontend Development</option>
                  <option value="Python">Backend Development</option>
                </select>
              </div>

              <div className="col-md-4">
                 <FormInput
                  label="Module Name"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleChange}
                  placeholder="Enter Module Name"
                  required
                />

              </div>

              <div className="col-md-4">
               <StatusSelect formData={formData} handleChange={handleChange} />
              </div>
            </div>

            {/* FILE ADD ROW */}
            {/* <div className="row g-3 mt-2 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Videos</label>
                <input
                  type="file"
                  className="form-control"
                  name="videos"
                  multiple
                  accept="video/*"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">PDF Files</label>
                <input
                  type="file"
                  className="form-control"
                  name="pdfs"
                  multiple
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div> */}

            {/* DISPLAY ADDED ITEMS */}
            {/* {items.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-bold">Added Files</h6>

                {items.map((item, index) => (
                  <div key={index} className="border rounded p-3 mb-2 bg-light">
                    <strong>Item {index + 1}</strong>

                    <div className="mt-2">
                      <b>Videos:</b>
                      <ul>
                        {item.videos.map((v, i) => (
                          <li key={i}>{v.name}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <b>PDFs:</b>
                      <ul>
                        {item.pdfs.map((p, i) => (
                          <li key={i}>{p.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )} */}

            {/* ACTION BUTTONS */}
            <div className="mt-4 text-center">
                <FormActions
                onCancel={() => navigate("/manage-module")}
                saveText="Save"
                cancelText="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillCenter;
