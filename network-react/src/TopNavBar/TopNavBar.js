import "./TopNavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function TopNavBar({handelPostModal}) {
    
    const navigate = useNavigate();
    const auth = useAuth();

    function handleLogout() {
        auth.logOut()

        return
        
    }
    
    const userData = JSON.parse(localStorage.getItem("userData"))

    return (
        <div className="top-navbar-wrapper">

            <div className= "top-navbar">
                <Link to="/dashboard"> for you</Link>
                <Link to="/following"> Following</Link>
            </div>

            
          
        </div>
    )

}