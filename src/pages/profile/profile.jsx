import { FiMoreVertical } from "react-icons/fi";
import "./profile.scss";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoIosPin,
  IoIosMail,
  IoIosGlobe,
} from "react-icons/io";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/update";
export default function Profile() {
  const [openUpdate, setOpenUpdate]= useState(false)
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  const { isLoading: rIsloading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followingUserId=" +userId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (following) => {
     if(following) return makeRequest.delete("/relationships?userId="+userId);
     return makeRequest.post("/relationships",{userId});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () =>{
    mutation.mutate(relationshipData.includes(currentUser.id))
  }
  return (
    <div className="profile">
      {isLoading ? (
        "loading.."
      ) : (
        <>
          <div className="images">
            <img src={"/upload/"+data.coverPic} className="cover" alt="" />
            <img src={"/upload/"+data.profilePic} className="profilepic" alt="" />
          </div>
          <div className="profilecontainer">
            <div className="userInfo">
              <div className="left">
                <a href="https://facebook.com">
                  <IoLogoFacebook fontSize="larger" />
                </a>
                <a href="https://facebook.com">
                  <IoLogoInstagram fontSize="larger" />
                </a>
                <a href="https://facebook.com">
                  <IoLogoTwitter fontSize="larger" />
                </a>
                <a href="https://facebook.com">
                  <IoLogoLinkedin fontSize="larger" />
                </a>
                <a href="https://facebook.com">
                  <IoLogoPinterest fontSize="larger" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <IoIosPin />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <IoIosGlobe />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsloading ? "loading..": userId === currentUser.id ? (
                  <button onClick={()=>setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>{relationshipData.includes(currentUser.id)? "Following" : "Follow"}</button>
                )}
              </div>
              <div className="right">
                <IoIosMail />
                <FiMoreVertical />
              </div>
            </div>
          </div>
          <div className="posts">
            <Posts userId={userId}/>
          </div>
        </>
      )}
     {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
}
