import "./Profile.scss";
import Posts from "../../Posts/Posts";


export default function Profile(){
return (
    <div className="parent-container">
        <p className="upper-user-name">userFirstname userLastname</p>
        <p>Number of posts</p>
        <div className="image-container">
            <img className="cover-image" src="wideProfileImage.jpg" ></img>
            <img className="profile-image" src="default-profile.svg.png"></img>
        </div>
        <p className="lower-user-name">userFirstname userLastname</p>
        <p className="username">username</p>
        <p className="following">Number of following</p>
        <p className="followers">Number of followers</p>

        <Posts></Posts>
    </div>
)
}