import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";

/**
 * Custom hook for authentication
 * Provides user, token, loading, and auth actions
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    updatePassword,
  } = useAuthStore();

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token && !user) {
        try {
          await fetchProfile();
        } catch (err) {
          console.warn("Failed to fetch profile:", err);
        }
      }
      setAuthLoading(false);
    };

    initializeAuth();
  }, [token, user, fetchProfile]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || authLoading,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    updatePassword,
  };
};
