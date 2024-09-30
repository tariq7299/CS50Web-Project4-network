import "./Profile.scss";
import Posts from "../../Posts/Posts";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as React from "react"

export default function Profile() {

    const [userStatus, setUserStatus] = useState(null);
    const userData = JSON.parse(localStorage.getItem("userData"));
    let { username } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/get-user-status/${username}`,
            {
                method: 'GET'

            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => Promise.reject(data.error))
                }
                return response.json()
            })
            .then((userStatus) => {
                setUserStatus(userStatus);
                setLoading(false);
            })
    }, [])
    // Here I do two things:
    //  first I change the posts variable that is in react state (I could instead refetch posts data from the server again, but instead I just changed the posts value i have here)
    // Second I send a put request to change isFollowed for the post owner
    function handleFollowButton() {

        // Send a put request to server "localhost:8000/<userId>"
        fetch(`/follow/${username}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isFollowed: !userStatus.isFollowed })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(result => Promise.reject(result.error));
                }
                setUserStatus({ ...userStatus, isFollowed: !userStatus.isFollowed })
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


    if (loading) {
        return (
            <div className="posts-wrapper">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="profile-container">

            <div className="user-status-wrapper">
                <p className="upper-user-name">{userData.firstname} {userData.lastname}</p>
                <p className="posts-count">{userStatus.posts_count} posts</p>

                <div className="image-container">
                    <img className="cover-image" src="/wideProfileImage.jpg" ></img>
                    <img className="profile-image" src="/default-profile.svg.png"></img>
                </div>

                <p className="lower-user-name">{userData.firstname} {userData.lastname}</p>
                <p className="username">@{userData.username}</p>

                {userData.username !== username &&
                    <button className="follow-button" onClick={() => handleFollowButton()}>{userStatus.isFollowed ? 'Unfollow' : 'Follow'}</button>}

                <div className="follow-count-wrapper">
                    <p className="followers">{userStatus.following_count} Following</p>
                    <p className="following">{userStatus.followers_count} Followers</p>
                </div>
            </div>

            <Posts></Posts>

        </div>
    )
}