import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectToBackend from './ConnectToApi';
import Navbar from "./Navbar";
import './Story.css';
function Story ({deleteStory, currentUser, logout}) {
    const { id } = useParams()
    const [story, setStory] = useState(null)
    const loggedInUser = localStorage.username
    const editUrl = `/stories/${id}/edit`
    useEffect(()=>{
        async function getStory() {
            const retrievedStory = await ConnectToBackend.getStoryById(id)
            setStory(retrievedStory)
        }
        getStory()
    },[])

    const onDelete = () => {
        if (window.confirm("Do you want to save changes?") === true){
            deleteStory(id)
        }
        else{
            alert("Ok, we will not delete this story.");
        }
    }

    if (!story){
        return <h1>...Loading</h1>
    }
    else if (story.username === loggedInUser){
        return (
        <div>
            <Navbar user={currentUser} logout={logout}/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{story.title}</h5>
                    {
                        story.content &&
                        story.content.split('\n').map(line => {
                            return(
                                <p>{line}</p>
                            );
                        })
                    }
                    <div className="button-group">
                    <a href={editUrl} className="btn btn-edit btn-primary">Edit</a>
                    <button onClick={onDelete}className="btn btn-delete btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        )   
    }
    else{
        return (
            <div>
            <Navbar user={currentUser} logout={logout}/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{story.title}</h5>
                    {
                        story.content &&
                        story.content.split('\n').map(line => {
                            return(
                                <p>{line}</p>
                            );
                        })
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default Story