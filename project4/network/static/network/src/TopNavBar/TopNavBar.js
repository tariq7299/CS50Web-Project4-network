import "./TopNavBar.scss";
import { Link, } from "react-router-dom";
import * as React from "react"
import { useCurrentView } from "../hooks/CurrentViewContext";

export default function TopNavBar({ handelPostModal, setPageNumber }) {

    const { handleSetCurrView } = useCurrentView();

    return (
        <div className="top-navbar-wrapper">
            <div className="top-navbar">

                <Link onClick={() => { handleSetCurrView("forYou"); setPageNumber(1) }}> For you</Link>
                <Link onClick={() => { handleSetCurrView("following"); setPageNumber(1) }}>Following</Link>

            </div>
        </div>
    )

}