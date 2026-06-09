import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks/useCrud";

const NotificationBell = () => {
    const navigate = useNavigate();

    const { useGetAll } = useCrud({
        entity: "notification",
        getAllUrl: "/admin/getNotifications",

    })
    const { data, refetch } = useGetAll();
    const notifications = data?.data || [];
    const unreadCount = notifications.filter((n) => n.isSeen === 0).length;

    useEffect(() => {
        refetch(); // initial load
    }, [refetch]);

    const handleClick = () => {
        navigate("/superAdmin/manage-notifications");
    };
    return (
        <div style={{ position: "relative", cursor: "pointer" }} onClick={handleClick}>
            <i className="ti ti-bell fs-5"></i>

            {unreadCount > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "10px",
                    }}
                >
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;