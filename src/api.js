const BASE_URL = "https://educore-backend-7p4o.onrender.com/api";

export async function apiRequest(endpoint, method, data) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text };
    }

    if (!res.ok) {
      throw {
        status: res.status,
        message: result.message || "Something went wrong",
      };
    }

    return result;
  } catch (error) {
    console.error("API ERROR FULL:", error);
    console.error("STATUS:", error.status);
    console.error("MESSAGE:", error.message);

    throw error;
  }
}