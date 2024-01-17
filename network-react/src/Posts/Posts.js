import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"
import { useLocation, useParams } from 'react-router-dom';


export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    let { username } = useParams();

    useEffect(() => {
        let apiUrl

        // const regex = /^\/\w+$/;
        if (location.pathname === "/dashboard") {
            apiUrl = "/get-posts-for-you"
        } else if (location.pathname === "/following") {
            apiUrl = "/get-posts-following"
        } else if (username) {
            apiUrl = `/get-posts-for-user-profile/${username}`
        } 
        // You can use reguler expression instead of useParams()
        //  else if (regex.test(location.pathname)) {
        //     apiUrl = "/get-posts-for-user-profile"
        // }

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
            <p>qw{userData.username}</p>
            <p>qw{userData.email}</p>
            {posts.map((post) => {
               return <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
            })}
        </div>
    );
}
