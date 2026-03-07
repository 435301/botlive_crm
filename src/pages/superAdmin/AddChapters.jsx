import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import PriorityInput from "../../components/priorityInput";
import FormActions from "../../components/FormActions";
import FormSelect from "../../components/FormSelect";
import StatusSelect from "../../components/StatusSelect";
import { useCrud } from "../../hooks/useCrud";
import useCourses from "../../hooks/useCourses";
import useModules from "../../hooks/useModule";


const AddChapters = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "chapter",
    getUrl: (id) => `/chapter/${id}`,
    createUrl: "/chapter/add",
    updateUrl: (id) => `/chapter/update/${id}`,
  });

  const { data, isLoading } = useGetById(id);
  console.log('data', data)
  const [formData, setFormData] = useState({
    courseId: "",
    moduleId: "",
  });

  const { courses } = useCourses();

  const { modules } = useModules();

  const filteredModules = React.useMemo(() => {
    if (!modules || !formData.courseId) return [];
    return modules.filter(
      (mod) => String(mod.courseId) === String(formData.courseId)
    );
  }, [modules, formData.courseId]);

  const [errors, setErrors] = useState({});

  const [chapters, setChapters] = useState([
    {
      chapterName: "",
      videos: [],
      pdfs: [],
      status: 1,
      priority: 1,
    },
  ]);

  useEffect(() => {
    if (data && isEditMode) {
       console.log("Course object:", data.course);
      setFormData({
        courseId: String(data.course?.id || ""),
        moduleId: String(data.module?.id || ""),
      });

      setChapters([
        {
          chapterName: data.chapterTitle || "",
          videos: [],
          pdfs: [],
          existingVideos: data.videos || [],
          existingPdfs: data.pdfs || [],
          status: data.status || 1,
          priority: data.priority || 1,
        },
      ]);
    }
  }, [data, isEditMode]);


  /* ===== HANDLE COURSE / MODULE CHANGE ===== */
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    if (name === "courseId") {
      setFormData({
        courseId: value,
        moduleId: "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        status: 1,
        priority: chapters.length + 1,
      },
    ]);
  };

  /* ===== REMOVE CHAPTER ===== */
  const removeChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    // Main fields
    form.append("courseId", formData.courseId);
    form.append("moduleId", formData.moduleId);

    // Chapters
    chapters.forEach((chapter, index) => {
      form.append(`chapters[${index}][chapterTitle]`, chapter.chapterName);
      form.append(`chapters[${index}][status]`, chapter.status);
      form.append(`chapters[${index}][priority]`, chapter.priority);

      // Videos
      if (chapter.videos) {
        Array.from(chapter.videos).forEach((video) => {
          form.append(`chapters[${index}][videos]`, video);
        });
      }

      // PDFs
      if (chapter.pdfs) {
        Array.from(chapter.pdfs).forEach((pdf) => {
          form.append(`chapters[${index}][pdfs]`, pdf);
        });
      }
    });

    // Debug
    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Call API
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: form },
        {
          onSuccess: () =>
            navigate("/superAdmin/manage-chapters"),
        }
      );
    } else {
      createMutation.mutate(form, {
        onSuccess: () =>
          navigate("/superAdmin/manage-chapters"),
      });
      setErrors("");
    }
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Chapters Management</h5>
          <p className="mb-0">Create Multiple Chapters</p>
        </div>

        <Link to="/superAdmin/manage-chapters" className="btn btn-outline-primary">
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
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleMainChange}
                  mandatory
                  options={courses?.map((course) => ({
                    label: course.courseTitle,
                    value: course.id
                  }))}
                />
              </div>

              <div className="col-md-6">
                <FormSelect
                  label="Module Name"
                  name="moduleId"
                  value={formData.moduleId}
                  onChange={handleMainChange}
                  mandatory
                  options={filteredModules.map((module) => ({
                    label: module.moduleTitle,
                    value: module.id
                  }))}
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
                    <label className="form-label">Videos</label>
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
                    {/* Existing Videos */}
                    {chapter.existingVideos?.length > 0 && (
                      <div className="mt-2">
                        <strong>Existing Videos:</strong>
                        <ul>
                          {chapter.existingVideos.map((video) => (
                            <li key={video.id}>
                              {video.videoPdf.split("/").pop()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">PDF Files</label>
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
                    {/* Existing PDFs */}
                    {chapter.existingPdfs?.length > 0 && (
                      <div className="mt-2">
                        <strong>Existing PDFs:</strong>
                        <ul>
                          {chapter.existingPdfs.map((pdf) => (
                            <li key={pdf.id}>
                              {pdf.videoPdf.split("/").pop()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <StatusSelect name="status" value={chapter.status} handleChange={(e) => handleChapterChange(index, e)} error={errors.status} />
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
                onCancel={() => navigate("/superAdmin/manage-chapters")}
                saveText={isLoading ? "Saving" : "Save"}
                cancelText="Cancel"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChapters;
