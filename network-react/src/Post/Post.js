import { Link } from "react-router-dom";
import "./Post.scss";

export default function Post({post, page, setPage}) {

    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("page", page)


    function handlePostEditChagne(e, postId) {

        setPage({...page, posts:page.posts.map((post) => {
            if (post.id === postId)  {
                return {...post, content: e.target.value}
            } else {
                return post;
            }
        })})

    }

    function handleEditButton(postId) {
        // Change is followed for this user
        setPage({...page, posts:page.posts.map((post) => {
            if (post.id === postId)  {
                console.log("post.editMode", post.editMode)
                return {...post, editMode: !post.editMode ?? true}
            } else {
                return post;
            }
        })})
    }



    function handleSaveEditedPostButton(post) {

        const currentPostId = post.id

        // Send a put request to server "localhost:8000/<userId>"
        fetch(`/post/${post.owner.id}/${post.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`)
            },
            body: JSON.stringify({postContent: post.content})
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result.error));
              }
              return response.json();
        })
        .then(data => {
            const SuccessMessage = data.message.toString();
            console.log("Success message", SuccessMessage)
        })
        .catch((error) => {
            console.error('Error:', error);
            setPage({...page, posts:page.posts.map((post) => {
                if (post.id === currentPostId)  {
                    return {...post, editMode: true}
                } else {
                    return post;
                }
            })})
        });

        setPage({...page, posts:page.posts.map((post) => {
            if (post.id === currentPostId)  {
                return {...post, editMode: !post.editMode}
            } else {
                return post;
            }
        })})
    }

    // THis was the logic for a removed follow button, that was located in every post

     // Here I do two things:
    //  first I change the posts variable that is in react state (I could instead refetch posts data from the server again, but instead I just changed the posts value i have here)
    // Second I send a put request to change isFollowed for the post owner
    // function handleFollowButton(userId, postId, isFollowed) {
    //     // Change is followed for this user
    //     setPage(posts.map((post) => {
    //         if (post.owner.id === userId)  {
    //             return {...post, isFollowed: !isFollowed}
    //         } else {
    //             return post;
    //         }
    //     }))
    //     // Send a put request to server "localhost:8000/<userId>"
    //     fetch(`/post/${userId}/${postId}`, {
    //         method: "PUT",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`)
    //         },
    //         body: JSON.stringify({isFollowed: !isFollowed })
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             return response.json().then(result => Promise.reject(result.error));
    //           }
    //           return response.json();
    //     })
    //     .then(data => {
    //         const SuccessMessage = data.message.toString();
    //         console.log("Success message", SuccessMessage)
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }
    
    function handleLikeButton(userId, postId, isLiked) {
        // Here I do two things:
        //  first I change the posts variable that is in react state (I could instead refetch posts data from the server again, but instead I just changed the posts value i have here)
        // Second I send a put request to change isLiked for the post owner
        // Change is followed for this user
        console.log("userId", userId)
        console.log("postId", postId)
        console.log("isLiked", isLiked)
        setPage({...page, posts: page.posts.map((post) => {
            if (post.id === postId && isLiked) {
                return {...post, isLiked: false, likes: post.likes-1}
            } else if (post.id === postId && !isLiked) {
                return {...post, isLiked: true, likes: post.likes+1}
            } else {
                return post
            }
        })})
        // Send a put request to server "localhost:8000/<userId>"
        fetch(`/post/${userId}/${postId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`)
            },
            body: JSON.stringify({isLiked: !isLiked })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result.error));
              }
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
        <div className="post-wrapper">
            <div className="profile-image-wrapper">
            <Link to={`/profile/${post.owner.username}`}>
                <img src="/default-profile.svg.png" alt="Profile"></img>
            </Link>
            </div>
    
            <div className="username-post-content-wrapper">
                <div className="userActualName-username-date-wrapper">
                    <Link to={`/profile/${post.owner.username}`}>
                        <p className="userActualName">{post.owner.first_name} {post.owner.last_name}</p>
                        <p className="username">@{post.owner.username}</p>
                    </Link>
                    <p className="date">{post.date_released}</p>
                    {post.owner.username === userData.username && <button onClick={() => handleEditButton(post.id)}>
                        {post.editMode ? 'close' : 'Edit'}
                    </button>}
                    
                </div>
                <div className="post-content-wrapper">
                    {post.editMode  ?  (<><textarea onChange={(e) => handlePostEditChagne(e, post.id)} value={post.content}></textarea>
                    <button onClick={() => handleSaveEditedPostButton(post)}>save</button>
                    </>) :  ( <p className="post-content">
                        {post.content}
                    </p>)}
                    {/* <p className="post-content">
                        {post.content}
                    </p> */}

                </div>
            </div>
    
            <button className="like-button" onClick={() => handleLikeButton(post.owner.id, post.id, post.isLiked)}>
                    {post.isLiked ? 'Unlike' : 'Like'} {post.likes}
                </button>
        </div>
    )
}