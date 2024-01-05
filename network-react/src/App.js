import {useState} from 'react';
import './App.scss';
import NewPostModal from "./NewPostModal/NewPostModal";
import Navbar from "./Navbar/Navbar";
import Posts from "./Posts/Posts";

function App() {
  const [isActive, setIsActive] = useState(false)
  // const [postContent, setPostContent] = useState("")
  

  
  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (

  <div className="parent-container" >

    <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

    <Navbar handelPostModal={handelPostModal}></Navbar>

    <Posts></Posts>


    </div>
  );
}

export default App;
