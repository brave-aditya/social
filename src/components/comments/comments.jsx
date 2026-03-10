import "./comments.scss";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore.js";
import useCommentStore from "../../stores/useCommentStore";
import moment from "moment";

const Comments = ({ postId }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [desc, setDesc] = useState("");

  const { comments, isLoading, fetchComments, addComment } = useCommentStore();

  const postComments = comments[postId] || [];
  const loading = isLoading[postId];

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  const handleClick = async (e) => {
    e.preventDefault();
    await addComment(postId, desc);
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {loading
        ? "loading.."
        : postComments.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.comment}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
