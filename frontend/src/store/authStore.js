import {create} from "zustand";
import AuthService from "../services/auth.service";
import { setToken, getToken, removeToken } from "../utils/helpers";

const useAuthStore = create((set, get) => ({
  user: null,
  token: getToken() || null,
  isAuthenticated: !!getToken(),
  isLoading: false,

  // Login user
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await AuthService.login(email, password);
      setToken(data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Register user
  register: async (userData) => {
    set({ isLoading: true });
    try {
      const data = await AuthService.register(userData);
      if (data.token) {
        setToken(data.token);
        set({ user: data.user, token: data.token, isAuthenticated: true });
      } else {
        // Ensure no stale session keeps user logged in
        removeToken();
        set({ user: null, token: null, isAuthenticated: false });
      }
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout user
  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
      removeToken();
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch current user profile
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const data = await AuthService.getProfile();
      set({ user: data.user || data, isAuthenticated: true });
      return data;
    } catch (error) {
      removeToken();
      set({ user: null, token: null, isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const data = await AuthService.updateProfile(profileData);
      set({ user: data.user || data });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true });
    try {
      const data = await AuthService.updatePassword(currentPassword, newPassword);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
