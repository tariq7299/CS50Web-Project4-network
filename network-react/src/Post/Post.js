import "./Post.scss";

export default function Post({post}) {
    return (

        <div className="post-wrapper">
            <div className="profile-image-wrapper">
            <img src="default-profile.svg.png"></img>
            </div>

            <div className="username-post-content-wrapper">
            <div className="userActualName-username-date-wrapper">
                <p className="userActualName">{post.owner.first_name} {post.owner.last_name}</p>
                <p className="username">@{post.owner.username}</p>
                <p className="date">{post.date_released}</p>
                <button>Follow</button>
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
