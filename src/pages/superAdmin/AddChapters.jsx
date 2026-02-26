import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PriorityInput from "../../components/priorityInput";
import FormActions from "../../components/FormActions";
import FormSelect from "../../components/FormSelect";
import StatusSelect from "../../components/StatusSelect";


const AddChapters = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    moduleName: "",
  });

  const [chapters, setChapters] = useState([
    {
      chapterName: "",
      videos: [],
      pdfs: [],
      status: "Active",
      priority: 1,
    },
  ]);

  /* ===== HANDLE COURSE / MODULE CHANGE ===== */
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ===== HANDLE CHAPTER FIELD CHANGE ===== */
  const handleChapterChange = (index, e) => {
    const { name, value, files } = e.target;

    const updatedChapters = [...chapters];

    if (files) {
      updatedChapters[index][name] = files;
    } else {
      updatedChapters[index][name] = value;
    }

    setChapters(updatedChapters);
  };

  /* ===== ADD NEW CHAPTER FORM ===== */
  const addNewChapter = () => {
    setChapters([
      ...chapters,
      {
        chapterName: "",
        videos: [],
        pdfs: [],
        status: "Active",
        priority: chapters.length + 1,
      },
    ]);
  };

  /* ===== REMOVE CHAPTER ===== */
  const removeChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
  };

  /* ===== FINAL SUBMIT ===== */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      course: formData.course,
      moduleName: formData.moduleName,
      chapters: chapters.map((ch) => ({
        ...ch,
        videos: Array.from(ch.videos),
        pdfs: Array.from(ch.pdfs),
      })),
    };

    console.log("FINAL SUBMIT DATA:", payload);

    navigate("/manage-chapters");
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Chapters Management</h5>
          <p className="mb-0">Create Multiple Chapters</p>
        </div>

        <Link to="/manage-chapters" className="btn btn-outline-primary">
          Manage Chapters
        </Link>
      </div>

      {/* FORM */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* COURSE + MODULE */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <FormSelect
                  label="Course Name"
                  name="course"
                  value={formData.course}
                  onChange={handleMainChange}
                  required
                  options={[
                    { label: "Web Development", value: "Web Development" },
                    { label: "Data Science", value: "Data Science" },
                  ]}
                />
              </div>

              <div className="col-md-6">
                <FormSelect
                  label="   Module Name"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleMainChange}
                  required
                  options={[
                    { label: "React Basics", value: "React Basics" },
                    { label: "Python Fundamentals", value: "Python Fundamentals" },
                  ]}
                />
              </div>

            </div>

            {/* MULTIPLE CHAPTER FORMS */}
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="border rounded p-3 mb-3 bg-light"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">
                    Chapter {index + 1}
                  </h6>

                  {chapters.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeChapter(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Chapter Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="chapterName"
                      placeholder="Enter the chapter name"
                      value={chapter.chapterName}
                      onChange={(e) =>
                        handleChapterChange(index, e)
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Videos <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      name="videos"
                      multiple
                      accept="video/*"
                      onChange={(e) =>
                        handleChapterChange(index, e)
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">PDF Files <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      name="pdfs"
                      multiple
                      accept="application/pdf"
                      onChange={(e) =>
                        handleChapterChange(index, e)
                      }
                    />
                  </div>

                  <div className="col-md-4">
                  <StatusSelect formData={formData} handleChange={handleMainChange} />
                  </div>

                  <div className="col-md-4">
                    <PriorityInput
                      value={chapter.priority}
                      onChange={(value) =>
                        handleChapterChange(index, {
                          target: { name: "priority", value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ADD CHAPTER BUTTON */}
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={addNewChapter}
            >
              + Add Another Chapter
            </button>

            {/* ACTION BUTTONS */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/manage-chapters")}
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

export default AddChapters;
