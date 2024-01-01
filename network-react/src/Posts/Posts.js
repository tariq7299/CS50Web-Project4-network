import {useEffect, useState} from 'react';
import "./Posts.scss";
import Post from "./../Post/Post"

export default function Posts() {

    const [posts, setPosts] = useState([])

    // useEffect(()=>{
    //     fetch("/get-posts")
    //     .then((response)=>{
    //         if(!response.ok) {
    //             return response.json().then((data)=>Promise.reject(data.error))
    //         }
    //         return response.json()
    //     })
    //     .then((data)=>{
    //         console.log("POSTS", data)
    //         setPosts(data.posts)
    //     })
    // })


  return (
    <div className="posts-wrapper">

        <Post></Post>

    </div>
  );
}
