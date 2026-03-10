import "./posts.scss";
import Post from "../post/post";
import { useEffect } from "react";
import usePostStore from "../../stores/usePostStore";
import { Link } from "react-router-dom";

const Posts = ({ userId }) => {
  const { posts, isLoading, error, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  const Errormsg = () => {
    return (
      <div className="error">
        <h1>Something Went Wrong!</h1>
        <h1>Maybe your session is expired pls login again.</h1>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  };

  const Loadmsg = () => {
    return <div className="loading"><h1>Loading..</h1></div>;
  };

  return (
    <div className="posts">
      {error ? (
        <Errormsg />
      ) : isLoading ? (
        <Loadmsg />
      ) : (
        posts.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
