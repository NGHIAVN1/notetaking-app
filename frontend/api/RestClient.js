import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    timeout: 1000,
  },
});

// Response interceptor for handling token expiration
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for token expiration errors
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data?.message || "";

      // Check if the error is specifically about token expiration
      if (
        errorMessage.includes("expired") ||
        errorMessage.includes("jwt expired") ||
        errorMessage.includes("invalid token") ||
        errorMessage.includes("unauthorized")
      ) {
        console.log("Token expired - logging out user");

        // Clear token and user data from localStorage
        localStorage.removeItem("user-data");
        localStorage.removeItem("isAuthenticated");

        // Redirect to login page
        window.location.href = "/login";

        // Show an alert to the user (optional)
        alert("Your session has expired. Please log in again.");
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
