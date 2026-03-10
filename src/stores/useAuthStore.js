import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      token: null,
      loading: false,
      error: null,

      login: async (inputs) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, inputs);
          if (response.data) {
            const { others, token } = response.data;
            set({ currentUser: others, token, loading: false });
            return response.data;
          }
        } catch (error) {
          set({
            error: error.response?.data?.message || "An error occurred during login",
            loading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ currentUser: null, token: null, error: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        currentUser: state.currentUser,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
