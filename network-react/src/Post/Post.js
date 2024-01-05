import "./Post.scss";

export default function Post({post, posts, setPosts}) {


    // Here I do two things:
    //  first I change the posts variable that is in react state (I could instead refetch posts data from the server again, but instead I just changed the posts value i have here)
    // Second I send a put request to change isFollowed for the post owner
    function handleFollow(userId, isFollowed) {
        // Change is followed for this user
        setPosts(posts.map((post) => {
            if (post.owner.id === userId)  {
                return {...post, isFollowed: !isFollowed}
            } else {
                return post;
            }
        }))
        // Send a put request to server "localhost:8000/<userId>"
        fetch(`/post/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({isFollowed: !isFollowed })
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
    
    function handleLikeButton(userId, isLiked) {

    }


    return (
        <div className="post-wrapper">
            <div className="profile-image-wrapper">
            <img src="default-profile.svg.png" alt="Profile"></img>
            </div>
    
            <div className="username-post-content-wrapper">
            <div className="userActualName-username-date-wrapper">
                <p className="userActualName">{post.owner.first_name} {post.owner.last_name}</p>
                <p className="username">@{post.owner.username}</p>
                <p className="date">{post.date_released}</p>
                <button onClick={() => handleFollow(post.owner.id, post.isFollowed)}>
                    {post.isFollowed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            <div className="post-content-wrapper">
                <p className="post-content">
                    {post.content}
                </p>
            </div>
            </div>
    
            <button className="like-button">Like</button>
        </div>
    )
}