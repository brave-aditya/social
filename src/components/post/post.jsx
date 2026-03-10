import { Link } from "react-router-dom";
import "./post.scss";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import Comments from "../comments/comments";
import { useState, useEffect } from "react";
import useLikeStore from "../../stores/useLikeStore";
import usePostStore from "../../stores/usePostStore";
import useAuthStore from "../../stores/useAuthStore.js";
import moment from "moment";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);

  const { likes, loadingPosts, fetchLikes, toggleLike } = useLikeStore();
  const { deletePost, fetchPosts } = usePostStore();

  const postLikes = likes[post.id] || [];
  const isLoading = loadingPosts[post.id];

  useEffect(() => {
    fetchLikes(post.id);
  }, [post.id]);

  const handleLike = async () => {
    await toggleLike(post.id, currentUser.id);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
    // Re-fetch posts so the parent list reflects the deletion
    fetchPosts(post.userId);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <FiMoreHorizontal onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : postLikes.includes(currentUser.id) ? (
              <FcLike onClick={handleLike} />
            ) : (
              <CiHeart onClick={handleLike} />
            )}
            {postLikes.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <AiOutlineComment />See Comments
          </div>
          <div className="item">
            <FiShare2 />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
