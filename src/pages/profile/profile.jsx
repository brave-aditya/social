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
import Posts from "../../components/posts/posts";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore.js";
import Update from "../../components/update/update";
import useUserStore from "../../stores/useUserStore";
import useRelationshipStore from "../../stores/useRelationshipStore";

export default function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { profileUser, isLoading, fetchUser } = useUserStore();
  const {
    followers,
    isLoading: rIsLoading,
    fetchRelationship,
    follow,
    unfollow,
  } = useRelationshipStore();

  useEffect(() => {
    fetchUser(userId);
    fetchRelationship(userId);
  }, [userId]);

  const isFollowing = followers.includes(currentUser.id);

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollow(userId);
    } else {
      await follow(userId);
    }
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading.."
      ) : (
        <>
          <div className="images">
            <img src={profileUser?.coverPic} className="cover" alt="" />
            <img src={profileUser?.profilePic} className="profilepic" alt="" />
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
                <span>{profileUser?.name}</span>
                <div className="info">
                  <div className="item">
                    <IoIosPin />
                    <span>{profileUser?.city}</span>
                  </div>
                  <div className="item">
                    <IoIosGlobe />
                    <span>{profileUser?.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading.."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <IoIosMail />
                <FiMoreVertical />
              </div>
            </div>
          </div>
          <div className="posts">
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && profileUser && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={profileUser}
          userId={userId}
        />
      )}
    </div>
  );
}
