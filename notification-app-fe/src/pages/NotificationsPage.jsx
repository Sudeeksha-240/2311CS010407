import { useState } from "react";
import useNotifications from "../hooks/useNotifications";
import NotificationFilter from "../components/NotificationFilter";

const NotificationsPage = () => {
  const {
    notifications,
    priorityNotifications,
  } = useNotifications();

  const [selectedType, setSelectedType] =
    useState("All");

  const filteredNotifications =
    selectedType === "All"
      ? notifications
      : notifications.filter(
          (item) => item.Type === selectedType
        );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      <NotificationFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <h2>Top 10 Priority Notifications</h2>

      {priorityNotifications.map((item) => (
        <div
          key={item.ID}
          style={{
            background: "white",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
          }}
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}

      <h2>All Notifications</h2>

      {filteredNotifications.map((item) => (
        <div
          key={item.ID}
          style={{
            background: "white",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
          }}
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;