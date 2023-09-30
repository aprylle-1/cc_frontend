import "./LoginPage.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage ({login}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const form = {
        username : username,
        password : password
    }
    const onLogin = (e) => {
        e.preventDefault();
        login(form);
    }
    const url = "/register"
    const navigate = useNavigate()
    useEffect(()=>{
        function getFromLocalStorage (){
            if (localStorage.token && localStorage.username){
                navigate("/main")
            }
          }
          getFromLocalStorage()
    })
    return (
        <div className="LoginForm">
        <form>
            <h2>Login</h2>
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={e=>{
                    setUsername(e.target.value)
                }}
                placeholder="username"
            />
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e=>{
                    setPassword(e.target.value)
                }}
                placeholder="password"
                />
            </div>
            <div className="buttons">
                <button onClick={onLogin} className="btn login-btn">Login</button>
                {/* <button className="btn btn-outline-secondary" onClick={clear}>Clear</button> */}
            </div>
            <div style={{marginTop: 10}}>
                <p>Don't have an account yet? Click <a href={url}>here</a> to Register.</p>
            </div>
        </form>
        </div>
    )
}

export default LoginPage;