import './LandingPage.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LandingPage () {
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        function getFromLocalStorage (){
            if (localStorage.token && localStorage.username){
                alert("you must be logged in to access this page")
                navigate("/main")
            }
          }
          getFromLocalStorage()
    })
    const url = "/register"
    return (    
        <div className="landingpage-body">
            <div className="container">
                <div className="left">
                    <h1>Creative Companion</h1>
                    <p>Welcome to Creative Companion, your trusted ally in the world of storytelling.</p>
                    <p>Our app, powered by OpenAI, is designed to empower budding writers with an endless wellspring of inspiration, making writer's block a thing of the past.</p>
                    <a href={url} class="get-started-button">Get Started</a>
                </div>
                <div className="right">
                    <div className="logo">CC</div>
                </div>
            </div>
        </div> 
    )
}

export default LandingPage;