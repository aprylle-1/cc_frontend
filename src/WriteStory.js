import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './WriteStory.css';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConnectToBackend from './ConnectToApi';
const WriteStory = ({save, currentUser, logout}) => {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [buttonText, setButtonText] = useState('Start Writing')
    const [OPENAI_API_KEY, setKey] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        function getFromLocalStorage (){
            if (!localStorage.token && !localStorage.username){
                navigate("/")
            }
          }
          getFromLocalStorage()
          async function getAPIKEY (){
            const OPENAI_API_KEY = await ConnectToBackend.getAPIKEY();
            setKey(OPENAI_API_KEY)
        }
        getAPIKEY()
    },[])

    const handleGenerate = () => {
        console.log('Prompt:', prompt);
        setButtonText("Generating")
        const client = axios.create({
            headers: {
              Authorization: "Bearer " + OPENAI_API_KEY,
            },
          });
        const params = {
            model : "gpt-3.5-turbo",
            temperature : 0,
            "messages": [
                {
                    "role": "user", 
                    "content": `create a title and a 50-word story about ${prompt.length > 0 ? prompt : "something random"}. Title and story are separate`
                }]
        }
        client
        .post("https://api.openai.com/v1/chat/completions", params)
        .then((result) => {
            console.log(result.data.choices[0].message.content);
            const text = result.data.choices[0].message.content
            const titleRegex = /Title:\s"([^"]+)"/;
            const titleMatch = text.match(titleRegex);
            const title = titleMatch[1];
            setTitle(title)
            
            const storyRegex = /Story:\s+([\s\S]+)/;
            const storyMatch = text.match(storyRegex);
            const story = storyMatch[1]
            console.log(storyMatch)
            let index = 0;
            let speed = .50;
            setContent (story[index])
            function Typewriter(){
                if (index < story.length - 1) {
                    setContent(currentContent => currentContent + story[index])
                    index++;
                    setTimeout(Typewriter, speed)
                }
            }
            Typewriter()
            setButtonText("Start Writing")
       })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSave = () => {
        const story = {
            prompt : prompt,
            title : title,
            content : content
        }

        save(story)
    }
    return (
        <div>
            <div>
                <Navbar user={currentUser} logout={logout}/>
            </div>
            <div className="alert alert-info">
                    Give a prompt and we'll use OpenAI to help you get started with your story.
                </div>
            <div className='main-content'>
                <div className='prompt-container input-group mb-3'>
                    <input
                        className='form-control'
                        value={prompt}
                        onChange={(e)=> setPrompt(e.target.value)}
                        name="prompt"
                        id="prompt"
                        placeholder='prompt'
                        required
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={handleGenerate}>{buttonText}</button>
                </div>
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
                    <button className="btn btn-primary" type="button" onClick={handleSave}>Save Story</button>
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
    );
}

export default WriteStory;