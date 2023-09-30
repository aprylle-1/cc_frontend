import './Stories.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConnectToBackend from './ConnectToApi';
import Navbar from "./Navbar";
function Stories ({currentUser, logout}){
    const navigate = useNavigate()
    const [stories, setStories] = useState(null);
    useEffect(()=>{
        function getFromLocalStorage (){
            if (!localStorage.token && !localStorage.username){
                navigate("/")
            }
          }
          getFromLocalStorage()
          async function getStories (user) {
            const getStories = await ConnectToBackend.getStoriesByUser(user);
            setStories(getStories)
          }
          if (localStorage.token){
            const username = localStorage.username
            const user = username
            getStories(user)
          }
    },[])

    function truncateString(inputString) {
        if (inputString.length > 100) {
            return inputString.substring(0, 100) + "...";
        }
        return inputString;
    }
    return (
        <div className='stories'>
            <div>
                <Navbar user={currentUser} logout={logout}/>
            </div>
        {stories && stories.map(story => {
            const url = `stories/${story.id}`
            return <div className="story-card card">
            <div className="card-header">
                <a href={url}>{story.title}</a>
            </div>
            <div className="card-body">
              <p className="card-text">{truncateString(story.content)}</p>
            </div>
          </div>
        })}
        </div>
    )
}

export default Stories;