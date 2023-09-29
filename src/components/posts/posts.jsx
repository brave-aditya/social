import "./posts.scss";
import Post from "../post/post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId="+userId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error ? "Something Went Wrong!": isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;