import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";


export default function Navbar({handelPostModal}) {
    
    const navigate = useNavigate();
    const auth = useAuth();

    function handleLogout() {

        // fetch("/logout", {
        //     method: "POST",
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         return response.json().then(result => Promise.reject(result.error));
        //       }
        //       navigate("/login");
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        auth.logOut()

        return
        
    }
    
    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log("userData", userData)
    console.log("userData", userData.username)

    return (
        <div className="navbar">
            <div className="side-navbar">

                <div className="nav-buttons-and-post-button-wrapper">
                    <a href="#">Network Project</a>
                    <a href="#">Home</a>
                    <button onClick={handleLogout} >Logout</button>
                    <button className="new-post-button" onClick={handelPostModal}>Post</button>
                </div>

                <div className="user-info-wrapper">
                    <div className="profile-image-wrapper">
                        <img className="profile-image" src="default-profile.svg.png" alt="user-profile-image"></img>
                    </div>
                    <div className="username-wrapper">              
                        <p className="user-actual-name">{userData.firstname}{' '}{userData.lastname}</p>
                        <p className="username">{userData.username}</p>
                    </div>
                </div>
            </div>
            
            <div className= "top-navbar">
                <a href="#"> for you</a>
                <a href="#"> Following</a>
            </div>
        </div>
    )

}