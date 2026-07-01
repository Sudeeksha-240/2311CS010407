const BASE_URL = "http://4.224.186.213";

async function getAuthToken() {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "2311cs010407@mallareddyuniversity.ac.in",
      name: "mamidi sudeeksha",
      rollNo: "2311cs010407",
      accessCode: "xpQddd",
      clientID: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  const data = await response.json();

  return data.access_token;
}

export async function fetchNotifications() {
  const token = await getAuthToken();

  const response = await fetch(
    `${BASE_URL}/evaluation-service/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications || [];
}