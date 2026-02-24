import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormActions from "../components/FormActions";
import StatusSelect from "../components/StatusSelect";

const AddAssignedChapter = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        grade: "",
        chapterName: "",
        courseName: "",
        moduleName: "",
        status: "Active",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    // FINAL SAVE
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            grade: formData.grade,
            chapterName: formData.chapterName,
            courseName: formData.courseName,
            moduleName: formData.moduleName,
            status: formData.status,
        };

        console.log("FINAL SUBMIT DATA:", payload);

        navigate("/manage-assigned-chapters");
    };

    return (
        <div className="container-fluid">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Assigned Chapters Management</h5>
                    <p className="mb-0">View, edit and manage all assigned chapters</p>
                </div>

                <Link to="/manage-assigned-chapters" className="btn btn-outline-primary">
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
                                <FormSelect
                                    label="Course Name"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { label: "Web Development", value: "Web Development" },
                                        { label: "Data Science", value: "Data Science" },
                                        { label: "UI/UX", value: "Frontend Development" },
                                        { label: "Python", value: "Backend Development" },
                                    ]}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Module Name"
                                    name="moduleName"
                                    value={formData.moduleName}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { label: "React Basics", value: "React Basics" },
                                        { label: "Python Fundamentals", value: "Python Fundamentals" },
                                    ]}
                                />
                            </div>

                            <div className="col-md-4">
                                <FormSelect
                                    label="Chapter Name"
                                    name="chapterName"
                                    value={formData.chapterName}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { label: "Introduction To React", value: "Introduction To React" },
                                        { label: "DOM Manipulation", value: "DOM Manipulation" },
                                    ]}
                                />
                            </div>
                            <div className="col-md-4">
                                <StatusSelect formData={formData} handleChange={handleChange} />
                            </div>

                        </div>


                        {/* ACTION BUTTONS */}
                        <div className="mt-4 text-center">
                            <FormActions
                                onCancel={() => navigate("/manage-assigned-chapters")}
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

export default AddAssignedChapter;
