import "./RegistrationPage.css"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function RegistrationPage ({register}) {
    const url = "/login"
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const form = {
        username : username,
        firstname : firstname,
        lastname : lastname,
        password : password
    }

    const onRegister = (e) => {
        e.preventDefault();
        register(form);
    }
    
    const navigate = useNavigate()
    useEffect(()=>{
        function getFromLocalStorage (){
            if (localStorage.token && localStorage.username){
                navigate("/main")
            }
          }
          getFromLocalStorage()
    },[])
    return (
        <div className="SignUpForm">
        <form>
        {/* {errors && errors.map(err=>{return <div className="alert alert-danger">{err}</div>})} */}
            <h2>Register</h2>
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
                required
            />
            </div>
            <div>
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input
                className="form-control"
                type="text"
                name="firstname"
                id="firstname"
                value = {firstname}
                onChange={e=>{
                    setFirstName(e.target.value)
                }}
                placeholder="First Name"
                required
            />
            </div>
            <div>
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input
                className="form-control"
                type="text"
                name="lastmame"
                id="lastname"
                value = {lastname}
                onChange={e=>{
                    setLastName(e.target.value)
                }}
                placeholder="Last Name"
                required
            />
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value = {password}
                onChange={e=>{
                    setPassword(e.target.value)
                }}
                placeholder="password"
                required
                />
            </div>
            <div className="buttons">
                <button onClick={onRegister} className="btn registration-btn">Create Account</button>
                {/* <button className="btn btn-outline-secondary" onClick={clear}>Clear</button> */}
            </div>
            <div style={{marginTop: 10}}>
                <p>Already have an account? Click <a href={url}>here</a> to Login.</p>
            </div>
        </form>
        </div>
    )
}

export default RegistrationPage;