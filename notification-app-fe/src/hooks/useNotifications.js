import { Log } from "../logger";

const BASE_URL = "http://4.224.186.213/evaluation-service";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzExY3MwMTA0MDdAbWFsbGFyZWRkeXVuaXZlcnNpdHkuYWMuaW4iLCJleHAiOjE3ODI4OTExNDgsImlhdCI6MTc4Mjg5MDI0OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjUwYmExYzNmLWE4MzYtNDQ2OS04ZDVmLWFkMTExOTc5Yzg5OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im1hbWlkaSBzdWRlZWtzaGEiLCJzdWIiOiI0OGE4NjM1Ni1mYWE4LTRkNTEtOWVlOC03MDJlNzQ3NThkMmQifSwiZW1haWwiOiIyMzExY3MwMTA0MDdAbWFsbGFyZWRkeXVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoibWFtaWRpIHN1ZGVla3NoYSIsInJvbGxObyI6IjIzMTFjczAxMDQwNyIsImFjY2Vzc0NvZGUiOiJ4cFFkZGQiLCJjbGllbnRJRCI6IjQ4YTg2MzU2LWZhYTgtNGQ1MS05ZWU4LTcwMmU3NDc1OGQyZCIsImNsaWVudFNlY3JldCI6IkhVUmJ0S3N4Z3RGUUdqV1cifQ.r0oQSB8Yat-Yf_4IKElCjq12UcAOadX0nzsVEwXOhOE";

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
      "Fetching notifications started"
    );

    let apiUrl =
      `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

    if (type && type !== "All") {
      apiUrl += `&notification_type=${type}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await Log(
        "frontend",
        "error",
        "api",
        "Failed to fetch notifications"
      );

      throw new Error("API Error");
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
      "fatal",
      "api",
      error.message
    );

    return [];
  }
}