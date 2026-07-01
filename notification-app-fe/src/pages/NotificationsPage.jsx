import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications.js";
import { Log } from "../logger.js";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      await Log(
        "frontend",
        "info",
        "page",
        "Notifications page loaded"
      );

      const data = await fetchNotifications(1, 10);

      setNotifications(data);

      await Log(
        "frontend",
        "info",
        "state",
        "Notifications state updated"
      );
    } catch (error) {
      await Log(
        "frontend",
        "error",
        "page",
        error.message
      );
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      {notifications.map((item) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default NotificationsPage;