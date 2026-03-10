import { create } from "zustand";
import { makeRequest } from "../axios";

const useUserStore = create((set, get) => ({
  profileUser: null,
  isLoading: false,
  error: null,

  fetchUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await makeRequest.get("/users/find/" + userId);
      set({ profileUser: res.data, isLoading: false });
    } catch (err) {
      set({ error: err, isLoading: false });
    }
  },

  updateUser: async (userData, userId) => {
    set({ isLoading: true, error: null });
    try {
      await makeRequest.put("/users", userData);
      // Re-fetch to sync latest data
      await get().fetchUser(userId);
    } catch (err) {
      set({ error: err, isLoading: false });
    }
  },
}));

export default useUserStore;
