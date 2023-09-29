import "./navbar.scss"
import { useContext, useState } from 'react'
import { MdHome } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdCircleNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext.jsx';
import { AuthContext } from '../../context/authContext.jsx';


export default function Navbar(){

    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

return(
    <div className="navbar">
        <div className="left">
            <Link to="/" style={{textDecoration:"none"}}>
             <span>Social Home</span>
            </Link>
             <MdHome />
             {darkMode ? <MdOutlineWbSunny onClick={toggle}/> : <MdDarkMode onClick={toggle}/> }
             <MdGridView/>
             <div className="search">
                <MdSearch />
                <input type="text" placeholder="search..."/>
             </div>
        </div>
        <div className="right">
            <MdPerson/>
            <MdEmail/>
            <MdCircleNotifications/>
            <div className="user">
                <img src={"/upload/"+currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
)
} 