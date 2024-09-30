import "./SideNavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMortarPestle } from '@fortawesome/free-solid-svg-icons';
import * as React from "react"

export default function SideNavBar({ handelPostModal }) {

    const navigate = useNavigate();
    const auth = useAuth();

    function handleLogout() {
        auth.logOut()

        return

    }

    // const userData = JSON.parse(localStorage.getItem("userData") || {})
    const userData = {}

    return (
        <div className="side-navbar-wrapper">
            <div className="side-navbar">

                <div className="nav-buttons-and-post-button-wrapper">
                    <Link to="/dashboard" className="navlink" ><FontAwesomeIcon icon={faUsers} size="2xl" /><span className="navlink-text">Network Project</span> </Link>

                    <Link to="/dashboard" className="navlink" href="#" ><FontAwesomeIcon icon={faHouse} size="2xl" /> <span className="navlink-text">Home</span></Link>

                    <a className="navlink" onClick={handleLogout} ><FontAwesomeIcon icon={faRightFromBracket} size="2xl" /><span className="navlink-text">Logout</span></a>

                    <button className="navlink new-post-button" onClick={handelPostModal}><FontAwesomeIcon icon={faMortarPestle} size="2xl" /> <span className="navlink-text">Post</span></button>



                </div>

                <div className="user-info-wrapper">
                    <div className="profile-image-wrapper">
                        <img className="profile-image" src="/default-profile.svg.png" alt="user-profile-image"></img>
                    </div>
                    <div className="username-wrapper">
                        <p className="user-actual-name">{userData?.firstname}{' '}{userData?.lastname}</p>
                        <p className="username">{userData?.username}</p>
                    </div>
                </div>
            </div>


        </div>
    )

}