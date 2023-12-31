import "./Navbar.scss";

export default function Navbar({handelPostModal}) {

    return (
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
    )

}