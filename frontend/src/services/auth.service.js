import api from "./api";

const AuthService = {
  // Login user
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const data = response.data?.data || response.data;
    return {
      user: data?.user,
      token: data?.token || data?.accessToken,
      refreshToken: data?.refreshToken,
    };
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    const data = response.data?.data || response.data;
    return {
      user: data?.user,
      token: data?.token || data?.accessToken,
      refreshToken: data?.refreshToken,
    };
  },

  // Logout (optionally notify backend)
  logout: async () => {
    try {
      await api.post("/auth/logout"); // optional backend call
    } catch (err) {
      console.warn("Logout failed on server, clearing locally");
    }
    localStorage.removeItem("token");
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data?.data || response.data; // message
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", { token, newPassword });
    return response.data?.data || response.data; // message
  },

  // Get Current User Profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data?.data || response.data; // { user }
  },

  // Update Profile
  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile", profileData);
    return response.data?.data || response.data; // { user }
  },

  // Update Password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/auth/update-password", { currentPassword, newPassword });
    return response.data?.data || response.data; // message
  },
};

export default AuthService;
