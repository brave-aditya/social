import "./navbar.scss"
import { useState } from 'react'
import { MdHome } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdCircleNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import useDarkModeStore from '../../stores/useDarkModeStore.js';
import useAuthStore from '../../stores/useAuthStore.js';

export default function Navbar() {
    const toggle = useDarkModeStore((state) => state.toggle);
    const darkMode = useDarkModeStore((state) => state.darkMode);
    const currentUser = useAuthStore((state) => state.currentUser);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Social Home</span>
                </Link>
                <MdHome />
                {darkMode ? <MdOutlineWbSunny onClick={toggle} /> : <MdDarkMode onClick={toggle} />}
                <MdGridView />
                <div className="search">
                    <MdSearch />
                    <input type="text" placeholder="search..." />
                </div>
            </div>
            <div className="right">
                <MdPerson />
                <MdEmail />
                <MdCircleNotifications />
                <div className="user">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    );
}