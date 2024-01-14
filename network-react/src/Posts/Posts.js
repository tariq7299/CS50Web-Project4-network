import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/get-posts")
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => Promise.reject(data.error))
                }
                return response.json()
            })
            .then((posts) => {
                // console.log("POSTS", posts)
                setPosts(posts)
                setLoading(false);
            })
    }, [])


    if (loading) {
        return (
            <div className="posts-wrapper">
                <h1>Loading...</h1>
            </div>
        ) 
    }

    return (
        <div className="posts-wrapper">
            {posts.map((post) => {
               return <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
            })}
        </div>
    );
}
