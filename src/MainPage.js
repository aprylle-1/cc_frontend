import "./MainPage.css"
import Navbar from "./Navbar";
// import StoryPreview from "./StoryPreview";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConnectToBackend from './ConnectToApi';
function MainPage ({currentUser, logout}) {

    const navigate = useNavigate()
    const [recentStories, setRecentStories] = useState(null);
    const [following, setFollowing] = useState(null);
    const [feed, setFeed] = useState(null);
    useEffect(()=>{
        function getFromLocalStorage (){
            if (!localStorage.token && !localStorage.username){
                navigate("/")
            }
          }
          getFromLocalStorage()
          async function getRecentTitles (username){
            const stories = await ConnectToBackend.getRecentStoriesByUser(username);
            setRecentStories(stories)
          }
          if(localStorage.token && localStorage.username){
            const username = localStorage.username;
            getRecentTitles(username)
          }
    },[])

    useEffect(()=>{
        async function getFollowingUsers() {
            const user = { username : localStorage.username }
            const followingList = await ConnectToBackend.getFollowing(user)
            setFollowing(followingList)
        }

        getFollowingUsers()
    },[])

    useEffect(()=>{
        async function getFeed() {
            const username = localStorage.username
            const feed = await ConnectToBackend.feed(username)
            setFeed(feed)
        }

        getFeed()
    },[])

    function truncateString(inputString) {
        if (inputString.length > 100) {
            return inputString.substring(0, 100) + "...";
        }
        return inputString;
    }

    if (!recentStories){
        return <h1>...Loading</h1>
    }

    if (!feed){
        return <h1>...Loading</h1>
    }
    
    if (!following){
        return <h1>...Loading</h1>
    }
    
    else{
        return (
            <div className="MainPage">
                <div>
                    <Navbar user={currentUser} logout={logout}/>
                </div>
                <div className="main-container">
                    <div className="left-column">
                        <h2>Your Recent Stories</h2>
                        <ul className="recent-stories">
                            {recentStories && recentStories.map(story=>{
                                const url = `stories/${story.id}`
                                return (
                                    <li><a href={url}>{story.title}</a></li>
                                )
                            })}
                        </ul>
                    </div>
    
                    <div className="middle-column">
                        <h2>From Users You Follow</h2>
                        <div class="news-feed">
                            {feed && feed.map(story=>{
                                return (
                                    <div className="MainPage-card card">
                                        <div className="card-header"><h6>{story.title} by {story.username}</h6></div>
                                        <div className="Discover-card-body card-body">
                                            <p>Updated on: {story.updated_on}</p>
                                            <p>{truncateString(story.content)}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {feed.length === 0 && <p>Follow Writers</p>}
                        </div>
                    </div>
    
                    <div className="right-column">
                        <h2>Users You're Following</h2>
                        <ul className="following-users">
                            {following && following.map(user=>{
                                const url = `/users/${user.username}`
                                return <li><a href={url}>{user.username}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>  
        )
    }
}

export default MainPage;