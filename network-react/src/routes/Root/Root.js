import {useState} from 'react';
import NewPostModal from "../../NewPostModal/NewPostModal";
import Navbar from "../../Navbar/Navbar";
import Posts from "../../Posts/Posts";
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

        <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

        <Navbar handelPostModal={handelPostModal}></Navbar>

        <Outlet />


        </div>
    
  );
}

export default Root;
