
import * as React from "react"
import { useEffect, useState } from 'react';
import "./Posts.scss";
import Post from "../Post/Post"
import { useCurrentView } from "../hooks/CurrentViewContext";

export default function Posts({ postsType, pageNumber, setPageNumber }) {

    const { currentView } = useCurrentView();
    const [page, setPage] = useState({})
    const [loading, setLoading] = useState(true);
    const { profileUserName } = currentView


    useEffect(() => {
        let apiUrl

        if (postsType === "forYou") {
            apiUrl = `/get-posts-for-you?pageNumber=${pageNumber}`
        } else if (postsType === "following") {
            apiUrl = `/get-posts-following?pageNumber=${pageNumber}`
        } else if (postsType === "profile") {
            apiUrl = `/get-posts-for-user-profile/${profileUserName}?pageNumber=${pageNumber}`
        }
        setLoading(true)
        fetch(apiUrl,
            {
                method: 'GET'
            })
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
    }, [pageNumber, postsType])


    if (loading) {
        return (
            <div className="posts-wrapper">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="posts-wrapper">
            {page.posts.length !== 0 ?
                page.posts.map((post) => {
                    return <Post key={post.id} post={post} page={page} setPage={setPage} />
                }) : <h1 className="text-center">No posts</h1>}

            <div className="page-control-buttons-wrapper">

                {page.page_has_previous && <button onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>}

                {page.page_has_next && <button onClick={() => setPageNumber(pageNumber + 1)}>More posts</button>}
            </div>
        </div>
    );
}
