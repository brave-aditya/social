import { Link } from "react-router-dom";
import "./post.scss";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import Comments from "../comments/comments";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId="+post.id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (liked) => {
     if(liked) return makeRequest.delete("/likes?postId="+post.id);
     return makeRequest.post("/likes",{postId: post.id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId) => {
          return makeRequest.delete("/posts/"+postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () =>{
  deleteMutation.mutate(post.id)
  }
  const handleLike = () =>{
    mutation.mutate(data.includes(currentUser.id))
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} alt="" />
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
          <FiMoreHorizontal onClick={()=> setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userId===currentUser.id && (<button onClick={handleDelete}>Delete</button>)}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"../public/upload/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id)  ? <FcLike onClick={handleLike}/> : <CiHeart onClick={handleLike}/>}
            {data?.length} likes
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
