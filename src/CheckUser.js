import './Stories.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConnectToBackend from './ConnectToApi';
import Navbar from "./Navbar";
function CheckUser ({currentUser, logout}){
    const { username } = useParams()
    const navigate = useNavigate()
    const [stories, setStories] = useState(null);
    const [following, setFollowing] = useState(null)
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
            getStories(username)
          }
    },[])

    useEffect(()=>{
      async function getFollowingUsers() {
          const user = { username : localStorage.username }
          const followingList = await ConnectToBackend.getFollowing(user)
          const following = followingList.map(user=>user.username)
          setFollowing(following)
      }

      getFollowingUsers()
  },[])

  async function follow () {
    const data = {
      followerUsername : localStorage.username,
      followingUsername : username
    };
    await ConnectToBackend.follow(data);
    navigate("/main")
  }

  async function unfollow () {
    const data = {
      followerUsername : localStorage.username,
      followingUsername : username 
    };
    await ConnectToBackend.unfollow(data);
    navigate("/main");
  }

  function truncateString(inputString) {
    if (inputString.length > 100) {
        return inputString.substring(0, 250) + "...";
    }
    return inputString;
}
    
    if (following){
      return (
        <div className='stories'>
            <div>
                <Navbar user={currentUser} logout={logout}/>
            </div>
            <div className="check-user input-group mb-3">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" className="form-control" value={username} disabled aria-label="Username" aria-describedby="basic-addon1"/>
                { !following.includes(username) && <button className="btn btn-primary" onClick={follow}>Follow</button> }
                { following.includes(username) && <button className="btn btn-primary" onClick={unfollow}>Unfollow</button> }
            </div>
        {stories && stories.map(story => {
            const url = `/stories/${story.id}`
            console.log(url)
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

}

export default CheckUser;