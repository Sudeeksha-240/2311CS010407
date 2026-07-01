import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();

    setNotifications(data);

    const sorted = [...data].sort((a, b) => {
      const priorityDiff =
        priorityMap[b.Type] - priorityMap[a.Type];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    setPriorityNotifications(sorted.slice(0, 10));
  };

  return {
    notifications,
    priorityNotifications,
  };
};

export default useNotifications;