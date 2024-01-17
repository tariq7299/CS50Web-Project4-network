import "./Profile.scss";
import Posts from "../../Posts/Posts";
import { useState } from "react";
import { useParams } from 'react-router-dom';

export default function Profile(){

    const [isFollowed, setIsFollowed] = useState();
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { username } = useParams();

    // Here I do two things:
    //  first I change the posts variable that is in react state (I could instead refetch posts data from the server again, but instead I just changed the posts value i have here)
    // Second I send a put request to change isFollowed for the post owner
    function handleFollowButton() {
        
        // Send a put request to server "localhost:8000/<userId>"
        fetch(`/follow/${userData.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`)
            },
            body: JSON.stringify({isFollowed: !isFollowed })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result.error));
              }
              setIsFollowed(!isFollowed)
              return response.json();
        })
        .then(data => {
            const SuccessMessage = data.message.toString();
            console.log("Success message", SuccessMessage)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
return (
    <div className="parent-container">
        <p className="upper-user-name">userFirstname userLastname</p>
        <p>Number of posts</p>
        <div className="image-container">
            <img className="cover-image" src="/wideProfileImage.jpg" ></img>
            <img className="profile-image" src="/default-profile.svg.png"></img>
        </div>
        <p className="lower-user-name">userFirstname userLastname</p>
        <p className="username">username</p>
        {userData.username !== username && 
        <button onClick={() => handleFollowButton()}>{isFollowed ? 'Unfollow' : 'Follow'}</button>
        }
        <p className="following">Number of following</p>
        <p className="followers">Number of followers</p>

        <Posts></Posts>
    </div>
)
}