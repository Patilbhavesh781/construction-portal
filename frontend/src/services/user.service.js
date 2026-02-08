import api from "./api";

const UserService = {
  // Fetch all users (admin only)
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data?.data || response.data; // expect array of users
  },

  // Fetch single user by ID (admin only)
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data?.data || response.data; // expect user object
  },

  // Update user (admin only)
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data?.data || response.data; // updated user
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data?.data || response.data; // message
  },

  // Fetch current logged-in user's bookings
  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data?.data || response.data; // array of bookings
  },

  // Fetch current user's messages
  getMyMessages: async () => {
    const response = await api.get("/messages/my");
    return response.data?.data || response.data; // array of messages
  },

  // Update current user's profile
  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile", profileData);
    return response.data?.data || response.data; // updated user
  },

  // Update current user's password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/auth/change-password", { currentPassword, newPassword });
    return response.data?.data || response.data; // message
  },
};

export default UserService;
