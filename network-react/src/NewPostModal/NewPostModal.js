import {useState} from "react";
import "./NewPostModal.scss";




export default function NewPostModal({handelPostModal, isActive}) {

    const [postContent, setPostContent] = useState("")

    function handleNewPostButton() {
        fetch("/create-new-post", {
            method: "POST",
            body: JSON.stringify({content: postContent})
          })
        .then(response =>{
          if (!response.ok) {
            return response.json().then(result => Promise.reject(result.error));
          }
          return response.json();
        })
        .then(data => {
          const SuccessMessage = data.message.toString();
          console.log("Success message", SuccessMessage)
        })
        .catch(error => {
          console.log(error)
        })
    
        return
      }
    
      function handlePostContentInput(e) {
        setPostContent(e.target.value)
      }
    

return (
    <>
        <div className="modal-container" style={ isActive ? {display: 'block'} : {display: 'none'} }>
        </div>

        <div className="modal-window" style={ isActive ? {display: 'block'} : {display: 'none'} }>

            <button onClick={handelPostModal}>Close</button>

            <div className="profile-image-input-wrapper">
            <div className="profile-image-wrapper">
                <img src="default-profile.svg.png"></img>
            </div>
            <textarea name="post-content-input" className="post-content" placeholder="What's happening?" value={postContent} onChange={handlePostContentInput}></textarea>
            </div>

            <button disabled={!postContent.length} onClick={handleNewPostButton}>Post</button>

        </div>

    </>
)}