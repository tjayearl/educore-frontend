import { apiRequest } from "./api.js";

export async function registerUser(fullName, email, password, role) {
  // ✅ FRONTEND VALIDATION
  if (!fullName || !email || !password || !role) {
    alert("All fields are required");
    return;
  }

  try {
    const data = await apiRequest("/auth/register", "POST", {
      fullName,
      email,
      password,
      role,
    });

    console.log("REGISTER SUCCESS:", data);
    alert("Registration successful!");
  } catch (error) {
    alert(error.message); // shows backend message
  }
}

export async function loginUser(email, password) {
  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    const data = await apiRequest("/auth/login", "POST", {
      email,
      password,
    });

    console.log("LOGIN SUCCESS:", data);
    localStorage.setItem("token", data.token);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
}