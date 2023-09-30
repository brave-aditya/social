import "./share.scss";
import Image from "../../assests/img.png";
import Map from "../../assests/map.png";
import Friend from "../../assests/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {useQueryClient, useMutation} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import axios from "axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const[imgUrl, setImgUrl] = useState("");

  const upload = async ()=>{
      const formData = new FormData();
      formData.append("image", file)
       axios.post('https://api.imgbb.com/1/upload?key=b99e1b7e44deb3985e33be22d597e53f', formData)  
       .then((res)=>{
        setImgUrl(JSON.stringify(res.data.data.url))
        let imgf = res.data.data.url;
        console.log(imgf);
        console.log(res.data.data.url)
        console.log(imgUrl);
       })
       .catch((err)=>{
        console.log(err)
       }) 
  }

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) =>{
      e.preventDefault();
      
      if(file) await upload()
      mutation.mutate({desc, img :imgUrl}) 
      setDesc("");
      setFile(null);
      setImgUrl("");
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
