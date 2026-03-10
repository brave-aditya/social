import { create } from "zustand";
import { makeRequest } from "../axios";

// likes is a map: { [postId]: userId[] }
const useLikeStore = create((set, get) => ({
  likes: {},
  loadingPosts: {}, // { [postId]: boolean }

  fetchLikes: async (postId) => {
    set((state) => ({ loadingPosts: { ...state.loadingPosts, [postId]: true } }));
    try {
      const res = await makeRequest.get("/likes?postId=" + postId);
      set((state) => ({
        likes: { ...state.likes, [postId]: res.data },
        loadingPosts: { ...state.loadingPosts, [postId]: false },
      }));
    } catch (err) {
      set((state) => ({
        loadingPosts: { ...state.loadingPosts, [postId]: false },
      }));
    }
  },

  toggleLike: async (postId, currentUserId) => {
    const liked = (get().likes[postId] || []).includes(currentUserId);
    if (liked) {
      await makeRequest.delete("/likes?postId=" + postId);
    } else {
      await makeRequest.post("/likes", { postId });
    }
    // Re-fetch to get the latest like list
    await get().fetchLikes(postId);
  },
}));

export default useLikeStore;
