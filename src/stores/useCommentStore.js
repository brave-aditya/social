import { create } from "zustand";
import { makeRequest } from "../axios";

// comments is a map: { [postId]: comment[] }
const useCommentStore = create((set, get) => ({
  comments: {},
  isLoading: {},
  error: {},

  fetchComments: async (postId) => {
    set((state) => ({ isLoading: { ...state.isLoading, [postId]: true } }));
    try {
      const res = await makeRequest.get("/comments?postId=" + postId);
      set((state) => ({
        comments: { ...state.comments, [postId]: res.data },
        isLoading: { ...state.isLoading, [postId]: false },
        error: { ...state.error, [postId]: null },
      }));
    } catch (err) {
      set((state) => ({
        isLoading: { ...state.isLoading, [postId]: false },
        error: { ...state.error, [postId]: err },
      }));
    }
  },

  addComment: async (postId, desc) => {
    await makeRequest.post("/comments", { desc, postId });
    // Re-fetch comments for this post
    await get().fetchComments(postId);
  },
}));

export default useCommentStore;
