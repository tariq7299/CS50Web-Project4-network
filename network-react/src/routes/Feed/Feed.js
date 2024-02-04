import Posts from "../../Posts/Posts";
import TopNavBar from "../../TopNavBar/TopNavBar";
import "./Feed.scss"

function Feed() {

  return (
    
    
      // <div className="parent-container" >
      <>
        <div className="feed-container">
          <TopNavBar></TopNavBar>

          <Posts></Posts>
        </div>
      </>


    
  );
}

export default Feed;
