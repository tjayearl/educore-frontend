import { apiRequest } from "./api.js";

export async function registerUser(fullName, email, password, role) {
  // ✅ FRONTEND VALIDATION
  if (!fullName || !email || !password) {
    alert("Name, email, and password are required");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }

  try {
    const data = await apiRequest("/auth/register", "POST", {
      full_name: fullName,
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