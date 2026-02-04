import {create} from "zustand";
import UserService from "../services/user.service";

const useUserStore = create((set, get) => ({
  users: [],
  myBookings: [],
  myMessages: [],
  isLoading: false,

  // Fetch all users (admin)
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const data = await UserService.getAllUsers();
      set({ users: data });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch single user (admin)
  fetchUserById: async (userId) => {
    set({ isLoading: true });
    try {
      const data = await UserService.getUserById(userId);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update user (admin)
  updateUser: async (userId, userData) => {
    set({ isLoading: true });
    try {
      const data = await UserService.updateUser(userId, userData);
      // Optional: update local users array
      set((state) => ({
        users: state.users.map((u) => (u._id === userId ? data : u)),
      }));
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete user (admin)
  deleteUser: async (userId) => {
    set({ isLoading: true });
    try {
      const data = await UserService.deleteUser(userId);
      // Update local users array
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
      }));
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch logged-in user's bookings
  fetchMyBookings: async () => {
    set({ isLoading: true });
    try {
      const data = await UserService.getMyBookings();
      set({ myBookings: data });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch logged-in user's messages
  fetchMyMessages: async () => {
    set({ isLoading: true });
    try {
      const data = await UserService.getMyMessages();
      set({ myMessages: data });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update logged-in user's profile
  updateProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const data = await UserService.updateProfile(profileData);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update logged-in user's password
  updatePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true });
    try {
      const data = await UserService.updatePassword(currentPassword, newPassword);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
