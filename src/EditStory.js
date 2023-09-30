import Navbar from './Navbar';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from 'react';
import ConnectToBackend from './ConnectToApi';
function EditStory ({currentUser, logout, edit}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const { id } = useParams()
    const username = currentUser
    const navigate = useNavigate()
    const onEdit = () => {
        const info = {
            username : username,
            title : title,
            content : content
        }
        edit(id, info)
    }
    useEffect(()=>{
        async function getStory(id){
            const story = await ConnectToBackend.getStoryById(id)
            setTitle(story.title)
            setContent(story.content)
            if (localStorage.username !== story.username){
                alert("You can't edit this story")
                navigate(`/main`)
            }
        }

        getStory(id)
    }, [])
    
    return (
        <div>
            <div>
                <Navbar user={currentUser} logout={logout}/>
            </div>
            <div className="alert alert-info">
                This story was generated with the assistance of OpenAI. But now it's your turn. Unleash your boundless imagination!
                </div>
            <div className='main-content'>
                <div className='story-main'>
                    <div className="prompt-container input-group mb-3">
                    <input
                        className='form-control'
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        name="title"
                        id="title"
                        placeholder='title'
                    />
                    <button className="btn btn-primary" onClick={onEdit}type="button">Edit Story</button>
                    </div>

                    <div className='form-content'>
                    <textarea 
                        value={content}
                        id="current-text"
                        className='form-control'
                        onChange={(e)=> {
                            setContent(e.target.value)
                        }}
                        name="content"
          />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditStory;