import { useState } from 'react';
import NewPostModal from "../../NewPostModal/NewPostModal";
import SideNavBar from "../../SideNavBar/SideNavBar";
import TopNavBar from '../../TopNavBar/TopNavBar';
import "./Root.scss";
import { Navigate, Outlet } from "react-router-dom";
import * as React from "react"

// import AuthProvider from "./../hooks/AuthProvider";


function Root() {
  const [isActive, setIsActive] = useState(false)
  // const [postContent, setPostContent] = useState("")



  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (


    <div className="parent-container" >


      <SideNavBar handelPostModal={handelPostModal}></SideNavBar>

      <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

      <Outlet />


    </div>

  );
}

export default Root;
