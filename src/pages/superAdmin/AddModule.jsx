import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import FormInput from "../../components/FormInput";
import { useCrud } from "../../hooks/useCrud";
import { validateModule } from "../../utils/validation";
import FormSelect from "../../components/FormSelect";
import useCourses from "../../hooks/useCourses";

const AddSkillCenter = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { useGetById, createMutation, updateMutation } = useCrud({
    entity: "module",
    listUrl: "/module/list",
    getUrl: (id) => `/module/${id}`,
    createUrl: "/module/add",
    updateUrl: (id) => `/module/update/${id}`,
    deleteUrl: (id) => `/module/delete/${id}`,
  });

  const {courses} = useCourses();
  const { data, isLoading } = useGetById(id);

  const [formData, setFormData] = useState({
    courseId: "",
    moduleTitle: "",
    status: 1,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        courseId: String(data.courseId),
        moduleTitle: data.moduleTitle,
        status: data.status,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", }));
  };

  // FINAL SAVE
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateModule(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => navigate("/superAdmin/manage-module") }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => navigate("/superAdmin/manage-module"),
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Modules Management</h5>
          <p className="mb-0">View, edit and manage all modules</p>
        </div>

        <Link to="/superAdmin/manage-module" className="btn btn-outline-primary">
          Manage Modules
        </Link>
      </div>

      {/* FORM */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Create Module</h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
               <FormSelect
                  label="Course"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  options={courses.map((course) => ({
                    label: course.courseTitle,
                    value: String(course.id),
                  }))}
                  error={errors.courseId}
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Module Name"
                  name="moduleTitle"
                  value={formData.moduleTitle}
                  onChange={handleChange}
                  placeholder="Enter Module Name"
                  mandatory
                  error={errors.moduleTitle}
                />
              </div>

              <div className="col-md-4">
                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 text-center">
              <FormActions
                onCancel={() => navigate("/superAdmin/manage-module")}
                saveText={createMutation.isPending ? "Saving..." : "Save"}
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

export default AddSkillCenter;
