import "./leftbar.scss"
import { useContext, useState } from 'react'
import Friends from '../../assests/be-kind.png'
import Groups from '../../assests/group.png'
import Watch from '../../assests/facebook.png'
import Memories from '../../assests/stopwatch.png'
import Event from '../../assests/google-calendar.png'
import Gallery from '../../assests/picture.png'
import Gaming from '../../assests/console.png'
import Video from '../../assests/video-chat.png'
import Messages from '../../assests/speech-bubble.png'
import Marketplace from '../../assests/marketplace.png'
import Fundraiser from '../../assests/donation.png'
import Tutorial from '../../assests/be-kind.png'
import Courses from '../../assests/elearning.png'
import Profile from '../../assests/profile.png'
import { AuthContext } from '../../context/authContext.jsx';

export default function Leftbar(){

    const {currentUser} = useContext(AuthContext);
    return(
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Marketplace} alt="" />
                        <span>MarketPlace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <img src={Event} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Video} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fundraiser} alt="" />
                        <span>Fundraisers</span>
                    </div>
                    <div className="item">
                        <img src={Tutorial} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                </div>

            </div>
        </div>
    )
}