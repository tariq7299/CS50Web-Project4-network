import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"
import { useLocation, useParams } from 'react-router-dom';


export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [page, setPage] = useState({})
    // const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    let { username } = useParams();
    // console.log("pagePUT", page)

    useEffect(() => {

        // console.log("page", page)
        let apiUrl

        // const regex = /^\/\w+$/;
        if (location.pathname === "/dashboard" || "/") {
            apiUrl = `/get-posts-for-you?pageNumber=${pageNumber}`
        } else if (location.pathname === "/following") {
            apiUrl = `/get-posts-following?pageNumber=${pageNumber}`
        } else if (username) {
            apiUrl = `/get-posts-for-user-profile/${username}?pageNumber=${pageNumber}`
        } 
        // You can use reguler expression instead of useParams()
        //  else if (regex.test(location.pathname)) {
        //     apiUrl = "/get-posts-for-user-profile"
        // }

        setLoading(true)
        fetch(apiUrl,
            { method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa(`${userData.username}:${userData.password}`) }})
            .then((response) => {
                if (!response.ok) {
                return response.json().then((data) => Promise.reject(data.error))
                }
                return response.json()
            })
            .then((page) => {
                setPage(page)
                console.log("page", page)
                // setPosts(posts)
                setLoading(false);
            })
    }, [location, pageNumber])


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
            {page.posts.map((post) => {
               return <Post key={post.id} post={post} page={page} setPage={setPage} />
            })}
            <div className="page-control-buttons-wrapper">

                {page.page_has_previous && <button onClick={() => setPageNumber(pageNumber - 1)}>previous</button>}

                {page.page_has_next && <button onClick={() => setPageNumber(pageNumber + 1)}>next</button>}
            </div>
        </div>
    );
}
