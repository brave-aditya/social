import { create } from "zustand";
import { makeRequest } from "../axios";

const useRelationshipStore = create((set, get) => ({
  // Array of currentUser IDs who follow the currently viewed profile user
  followers: [],
  isLoading: false,
  error: null,

  fetchRelationship: async (followingUserId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await makeRequest.get(
        "/relationships?followingUserId=" + followingUserId
      );
      set({ followers: res.data, isLoading: false });
    } catch (err) {
      set({ error: err, isLoading: false });
    }
  },

  follow: async (userId) => {
    await makeRequest.post("/relationships", { userId });
    await get().fetchRelationship(userId);
  },

  unfollow: async (userId) => {
    await makeRequest.delete("/relationships?userId=" + userId);
    await get().fetchRelationship(userId);
  },
}));

export default useRelationshipStore;
