import {useState} from 'react';
import './App.scss';

function App() {
  const [isActive, setIsActive] = useState(false)

  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (
      <div className="parent-container" >

      <div className="modal-container" style={ isActive ? {display: 'block'} : {display: 'none'} }>
      </div>
      <div className="modal-window" style={ isActive ? {display: 'block'} : {display: 'none'} }>

        <button onClick={handelPostModal}>Close</button>

        <div className="profile-image-input-wrapper">
          <div className="profile-image-wrapper">
            <img src="default-profile.svg.png"></img>
          </div>
          <textarea name="post-content-input" className="post-content" placeholder="What's happening?"></textarea>
        </div>

        <button>Post</button>

      </div>

      <div className="navbar">
        <div className="side-navbar">

          <div className="nav-buttons-and-post-button-wrapper">
            <a href="#">Network Project</a>
            <a href="#">Home</a>
            <a href="#">Logout</a>
            <button className="new-post-button" onClick={handelPostModal}>Post</button>
          </div>

          <div className="user-info-wrapper">
            <div className="profile-image-wrapper">
              <img className="profile-image" src="default-profile.svg.png" alt="user-profile-image"></img>
            </div>
            <div className="username-wrapper">              
            <p className="user-actual-name">Tariq Sarhan</p>
            <p className="username">teka</p>
            </div>
          </div>
          
        </div>
        <div className= "top-navbar">
          <a href="#"> for you</a>
          <a href="#"> Following</a>
        </div>
      </div>

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
