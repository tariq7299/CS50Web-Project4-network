import {useState} from 'react';
import './App.scss';
import NewPostModal from "./NewPostModal/NewPostModal";
import Navbar from "./Navbar/Navbar";

function App() {
  const [isActive, setIsActive] = useState(false)
  // const [postContent, setPostContent] = useState("")
  const [posts, setPosts] = useState([])

  
  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (

  <div className="parent-container" >

    <NewPostModal handelPostModal={handelPostModal} isActive={isActive}></NewPostModal>

    <Navbar handelPostModal={handelPostModal}></Navbar>

    <div className="main-content"> 

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
          <button>Follow</button>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

      <div className="post-wrapper">

      <div className="profile-image-wrapper">
        <img src="default-profile.svg.png"></img>
      </div>

      <div className="username-post-content-wrapper">
        <div className="userActualName-username-date-wrapper">
          <p className="userActualName">Tariq Sarhan</p>
          <p className="username">teka</p>
          <p className="date">Dec 28</p>
        </div>
        <div className="post-content-wrapper"><p className="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis bibendum varius. Praesent ante velit, blandit non tristique non, tincidunt at est. Nam at ex vel ex maximus condimentum eget et mauris. Vestibulum malesuada maximus sem, sit amet malesuada quam auctor at. Suspendisse ut mi congue, tincidunt ex quis, eleifend lacus. Nam suscipit nulla sapien, eu euismod augue condimentum eget. Nulla volutpat ligula massa, vel iaculis elit condimentum ullamcorper.</p></div>
      </div>

      <button className="like-button">Like</button>

      </div>

    </div>
    </div>
  );
}

export default App;
