import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import FormSelect from "../../components/FormSelect";
import FormActions from "../../components/FormActions";
import StatusSelect from "../../components/StatusSelect";
import useCourses from "../../hooks/useCourses";
import useGrades from "../../hooks/useGrades";
import { useCrud } from "../../hooks/useCrud";
import { validateAssignChapters } from "../../utils/validation";
import useModules from "../../hooks/useModule";
import useChapters from "../../hooks/useChapters";
import MultiSelectWithCheckbox from "../../components/MultiSelectWithCheckbox";

const AddAssignedChapter = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const { useGetById, createMutation, updateMutation } = useCrud({
        entity: "assignChapter",
        listUrl: "/assignChapter/list",
        getUrl: (id) => `/assignChapter/${id}`,
        createUrl: "/assignChapter/add",
        updateUrl: (id) => `/assignChapter/update/${id}`,
        deleteUrl: (id) => `/assignChapter/delete/${id}`,
    });

    const { data, isLoading } = useGetById(id);
    const [formData, setFormData] = useState({
         gradeBatchId: "",
        gradeBatchIds: [],
        chapterIds: [],
        courseId: "",
        moduleId: "",
        status: 1,
    });
    const [errors, setErrors] = useState({});

    const { courses } = useCourses();
    const { grades } = useGrades();
    const { modules } = useModules();
    const { chapters } = useChapters();

    const filteredModules = modules?.filter((module) => module.courseId === Number(formData.courseId))
    const filteredChapters = chapters?.filter((chapter) => chapter.moduleId === Number(formData.moduleId));

    useEffect(() => {
        if (data) {
            setFormData({
                gradeBatchId: data.gradeBatchId ,
                courseId: data.courseId,
                moduleId: data.moduleId,
                chapterIds: data.assignedChapters?.map(
                    (item) => item.chapterId
                ) || [],
                status: data.status,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name === "courseId") {
                return {
                    ...prev,
                    courseId: value,
                    moduleId: "",
                    chapterIds: [],
                };
            }

            if (name === "moduleId") {
                return {
                    ...prev,
                    moduleId: value,
                    chapterIds: [],
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
        setErrors((prev) => ({ ...prev, [name]: "", }));

    };

    // FINAL SAVE
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateAssignChapters(formData, isEditMode);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isEditMode) {
            updateMutation.mutate(
                { id, data: formData },
                {
                    onSuccess: () => navigate("/superAdmin/manage-assigned-chapters")
                }
            );
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate("/superAdmin/manage-assigned-chapters"),
            });
        }
    };

    return (
        <div className="container-fluid">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Assigned Chapters Management</h5>
                    <p className="mb-0">View, edit and manage all assigned chapters</p>
                </div>

                <Link to="/superAdmin/manage-assigned-chapters" className="btn btn-outline-primary">
                    Manage Assigned Chapters
                </Link>
            </div>

            {/* FORM */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">Create Assigned Chapter</h5>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                {isEditMode ? (

                                    <FormSelect
                                        label="Grade"
                                        name="gradeBatchId"
                                        value={formData.gradeBatchId}
                                        onChange={handleChange}
                                        mandatory
                                        options={grades.map((grade) => ({
                                            label: grade.gradeBatch,
                                            value: grade.id
                                        }))}
                                        error={errors.gradeBatchId}
                                    />

                                ) : (
                                    <MultiSelectWithCheckbox
                                        label="Grade"
                                        name="gradeBatchIds"
                                        value={formData.gradeBatchIds}
                                        onChange={handleChange}
                                        required
                                        options={grades.map((grade) => ({
                                            label: grade.gradeBatch,
                                            value: grade.id
                                        }))}
                                        error={errors.gradeBatchIds}
                                    />
                                )}
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Course Name"
                                    name="courseId"
                                    value={formData.courseId}
                                    onChange={handleChange}
                                    mandatory
                                    options={courses.map((course) => ({
                                        label: course.courseTitle,
                                        value: course.id
                                    }))}
                                    error={errors.courseId}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Module Name"
                                    name="moduleId"
                                    value={formData.moduleId}
                                    onChange={handleChange}
                                    mandatory
                                    options={filteredModules.map((module) => ({
                                        label: module.moduleTitle,
                                        value: module.id
                                    }))}
                                    error={errors.moduleId}
                                />
                            </div>

                            <div className="col-md-4">
                                <MultiSelectWithCheckbox
                                    label="Chapter Name"
                                    name="chapterIds"
                                    value={formData.chapterIds}
                                    required
                                    options={filteredChapters.map((chapter) => ({
                                        label: chapter.chapterTitle,
                                        value: chapter.id,
                                    }))}
                                    onChange={handleChange}
                                    error={errors.chapterIds}
                                />
                            </div>

                            <div className="col-md-4">
                                <StatusSelect name="status" value={formData.status} handleChange={handleChange} error={errors.status} />
                            </div>

                        </div>


                        {/* ACTION BUTTONS */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/superAdmin/manage-assigned-chapters")}
                                saveText={isEditMode ? updateMutation.isPending ? "Saving..." : "Save" : createMutation.isPending ? "Saving..." : "Save"}
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

export default AddAssignedChapter;
