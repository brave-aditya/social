import { create } from "zustand";
import { makeRequest } from "../axios";

const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await makeRequest.get("/posts?userId=" + userId);
      set({ posts: res.data, isLoading: false });
    } catch (err) {
      set({ error: err, isLoading: false });
    }
  },

  addPost: async (newPost) => {
    await makeRequest.post("/posts", newPost);
    // Re-fetch is triggered by the component after this resolves
  },

  deletePost: async (postId) => {
    await makeRequest.delete("/posts/" + postId);
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
    }));
  },
}));

export default usePostStore;
