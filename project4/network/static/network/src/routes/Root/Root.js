import { useState } from 'react';
import NewPostModal from "../../NewPostModal/NewPostModal";
import SideNavBar from "../../SideNavBar/SideNavBar";
import "./Root.scss";
import * as React from "react"
import { useCurrentView } from '../../hooks/CurrentViewContext';
// import AuthProvider from "./../hooks/AuthProvider";
import Feed from '../Feed/Feed';
import Profile from '../Profile/Profile';

export function Root() {
  const [isActive, setIsActive] = useState(false)
  // const [postContent, setPostContent] = useState("")

  const { currentView } = useCurrentView();

  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (


    <div className="parent-container" >


      <SideNavBar handelPostModal={handelPostModal}></SideNavBar>

      <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

      {currentView?.view === "forYou"
        ? (<Feed postsType="forYou" />)
        : currentView?.view === "following"
          ? (<Feed postsType="following" />)
          : currentView?.view === "profile"
            ? (<Profile postsType="profile" />)
            : null}

      {/* {children} */}
      {/* <Outlet /> */}


    </div>

  );
}

export default Root;
