import { useEffect, useRef, useState } from "react";
import { useCrud } from "../../hooks/useCrud";

const ManageNotifications = () => {
    const [activeTab, setActiveTab] = useState("support");
    const crud = useCrud({
        entity: "notification",
        getAllUrl: "/admin/getNotifications",
        updatePatchUrl: () => `/admin/updateNotifications`,
    });

    const { useGetAll, updatePatchMutation } = crud;

    const { data, isLoading } = useGetAll();
    const notifications = data?.data || [];
    const hasMarkedSeen = useRef(false);

    useEffect(() => {
        if (hasMarkedSeen.current) return;
        if (!updatePatchMutation?.mutate) return;
        hasMarkedSeen.current = true;
        updatePatchMutation.mutate(
            {},
            {
                onSuccess: () => { },
            }
        );
    }, [updatePatchMutation]);

    const support = notifications.filter(
        (n) => n.notificationType === "support"
    );

    const feedback = notifications.filter(
        (n) => n.notificationType === "feedback"
    );

    const list = activeTab === "support" ? support : feedback;

    return (
        <div className="container mt-3">
            <h4>Manage Notifications</h4>
            {/* Tabs */}
            <div className="d-flex gap-3 mb-3">
                <button
                    className={`btn ${activeTab === "support" ? "btn-primary" : "btn-light"}`}
                    onClick={() => setActiveTab("support")}
                >
                    Support ({support.length})
                </button>

                <button
                    className={`btn ${activeTab === "feedback" ? "btn-primary" : "btn-light"}`}
                    onClick={() => setActiveTab("feedback")}
                >
                    Feedback ({feedback.length})
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle student-modern-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Message</th>
                            {activeTab === "support" && (
                                <>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </>
                            )}
                            {activeTab === "feedback" && (
                                <>
                                    <th>Subject</th>
                                </>
                            )}
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={activeTab === "support" ? 6 : 4} className="text-centre py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : list.length > 0 ?
                            (list.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name || "-"}</td>
                                    <td style={{
                                        maxWidth: "250px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        {item.message || "-"}
                                    </td>
                                    {activeTab === "support" && (
                                        <>
                                            <td>{item.priority || "-"}</td>
                                            <td>{item.status === 1 ? "New" : 2 ? "In Progress " : "Completed" || "-"}</td>
                                            <td>{item.remarks || "-"}</td>
                                        </>
                                    )}
                                    {activeTab === "feedback" && (
                                        <>
                                            <td>{item.subject || "-"}</td>
                                        </>
                                    )}
                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                    </td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-4">
                                        No records found
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageNotifications;