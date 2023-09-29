import "./rightbar.scss"
import user from "../../assests/profile.png"
export default function Rightbar(){

    return(
        <div className="rightbar">
           <div className="container">
            <div className="item">
                <span>Suggestions For You</span>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <span>Aditya Rathore</span>
                    </div>
                    <div className="buttons">
                        <button>follow</button>
                        <button>dismiss</button>
                    </div>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <span>Aditya Rathore</span>
                    </div>
                    <div className="buttons">
                        <button>follow</button>
                        <button>dismiss</button>
                    </div>
                </div>
            </div>
            <div className="item">
                <span>Latest Activities</span>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <p>
                        <span>Aditya Rathore</span> changed their cover picture
                        </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <p>
                        <span>Aditya Rathore</span> changed their cover picture
                        </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <p>
                        <span>Aditya Rathore</span> changed their cover picture
                        </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <p>
                        <span>Aditya Rathore</span> changed their cover picture
                        </p>
                    </div>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="item">
                <span>Online Friends</span>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <div className="online" />
                        <span>Aditya Rathore</span>
                    </div>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <div className="online" />
                        <span>Aditya Rathore</span>
                    </div>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <div className="online" />
                        <span>Aditya Rathore</span>
                    </div>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <div className="online" />
                        <span>Aditya Rathore</span>
                    </div>
                </div>
                <div className="user">
                    <div className="userinfo">
                        <img src={user} alt="" />
                        <div className="online" />
                        <span>Aditya Rathore</span>
                    </div>
                </div>
            </div>
           </div>
        </div>
    )
}