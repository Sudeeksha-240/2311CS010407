const BASE_URL = "http://4.224.186.213/evaluation-service";

export async function Log(stack, level, packageName, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },

      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    console.error("Logging failed");
  }
}