import "./posts.scss";
import Post from "../post/post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {Link} from "react-router-dom";
const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId="+userId).then((res) => {
        return res.data;
      }),
  });
 const Errormsg = ({msg}) =>{
  return(
    <div className="error"><h1>Something Went Wrong!</h1>
         <h1>Maybe your session is expired pls login again.</h1>
         <button><Link to="/login">Login</Link></button>
         
    </div>
  )
 }
 const Loadmsg = ({msg}) =>{
  return(
    <div className="loading"><h1>Loading..</h1></div>
  )
 }
  return (
    <div className="posts">
      {error ? <Errormsg  />: isLoading
        ? <Loadmsg  />
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
