import "./TopNavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import * as React from "react"

export default function TopNavBar({ handelPostModal }) {

    const userData = JSON.parse(localStorage.getItem("userData"))

    return (
        <div className="top-navbar-wrapper">
            <div className="top-navbar">
                <Link to="/dashboard"> For you</Link>
                <Link to="/following"> Following</Link>
            </div>
        </div>
    )

}