import {useState} from 'react';
import NewPostModal from "../../NewPostModal/NewPostModal";
import Navbar from "../../Navbar/Navbar";
import "./Root.scss";
import { Navigate, Outlet } from "react-router-dom";

// import AuthProvider from "./../hooks/AuthProvider";


function Root() {
  const [isActive, setIsActive] = useState(false)
  // const [postContent, setPostContent] = useState("")
  

  
  function handelPostModal() {
    setIsActive(!isActive)
  } 

  return (
    
    
      <div className="parent-container" >

        <Navbar handelPostModal={handelPostModal}></Navbar>

        <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

        <Outlet />


        </div>
    
  );
}

export default Root;
