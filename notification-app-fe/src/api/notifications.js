import { Log } from "../logger.js";

const BASE_URL = "http://4.224.186.213/evaluation-service";

export async function fetchNotifications(
  page = 1,
  limit = 10,
  type = ""
) {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications"
    );

    let apiUrl =
      `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

    if (type && type !== "All") {
      apiUrl += `&notification_type=${type}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return data.notifications || [];
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      error.message
    );

    throw error;
  }
}