import Posts from "../../Posts/Posts";
import TopNavBar from "../../TopNavBar/TopNavBar";
import "./Feed.scss"
import * as React from "react"
import { useState } from "react";
function Feed({ postsType }) {

  const [pageNumber, setPageNumber] = useState(1);

  return (


    // <div className="parent-container" >
    <div className="feed-container">
      <TopNavBar setPageNumber={setPageNumber}></TopNavBar>

      <Posts pageNumber={pageNumber} setPageNumber={setPageNumber} postsType={postsType} ></Posts>
    </div>



  );
}

export default Feed;
