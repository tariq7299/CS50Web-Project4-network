import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"
import { useLocation } from 'react-router-dom';


export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation()


    useEffect(() => {
        let apiUrl

        if (location.pathname === "/dashboard") {
            apiUrl = "/get-posts-for-you"
        } else {
            apiUrl = "/get-posts-following"
        }

        fetch(apiUrl,
            { method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`) }})
            .then((response) => {
                if (!response.ok) {
                return response.json().then((data) => Promise.reject(data.error))
                }
                return response.json()
            })
            .then((posts) => {
                setPosts(posts)
                setLoading(false);
            })
    }, [location])


    if (loading) {
        return (
            <div className="posts-wrapper">
                <h1>Loading...</h1>
            </div>
        ) 
    }

    return (
        <div className="posts-wrapper">
            <h1>qw{userData.username}</h1>
            <h1>qw{userData.email}</h1>
            {posts.map((post) => {
               return <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
            })}
        </div>
    );
}
