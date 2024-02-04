import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"
import { useLocation, useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";


export default function Posts() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [page, setPage] = useState({})
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    let { username } = useParams();

    useEffect(() => {

        let apiUrl
        if (location.pathname === "/dashboard" || location.pathname === "/") {
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
            {page.posts.length !== 0  ? 
            page.posts.map((post) => {
                return <Post key={post.id} post={post} page={page} setPage={setPage} />
             }) : <p>No posts!</p>}
            
            <div className="page-control-buttons-wrapper">

                {page.page_has_previous && <button onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>}

                {page.page_has_next && <button onClick={() => setPageNumber(pageNumber + 1)}>More posts</button>}
            </div>
        </div>
    );
}
