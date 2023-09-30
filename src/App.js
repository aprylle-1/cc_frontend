import './App.css';
import  { Routes, Route } from 'react-router';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import WriteStory from './WriteStory';
import Stories from './Stories';
import Story from './Story';
import EditStory from './EditStory';
import Discover from './Discover';
import ConnectToBackend from './ConnectToApi';
import CheckUser from './CheckUser';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const error_map = {
    "instance.username does not meet minimum length of 1" : "username is a required field",
    "instance.firstname does not meet minimum length of 1" : "firstname is a required field",
    "instance.lastname does not meet minimum length of 1" : "lastname is a required field",
    "instance.password does not meet minimum length of 5" : "password is a required field"
  }

  const navigate = useNavigate()
  const register = async (user) => {
    try{
      const token = await ConnectToBackend.register(user);
      ConnectToBackend.token = token;
      setCurrentUser(user.username)
      localStorage.token = token
      localStorage.username = user.username
      navigate("/main")
    }
    catch(errs){
      const errors = errs.map(err=>{
        if(error_map[err]){
          return error_map[err]
        }
        else{
          return err
        }
      })
      alert(errors)
    }
  }

  const login = async (user) =>{
    try{
      const token = await ConnectToBackend.login(user);
      ConnectToBackend.token = token;
      setCurrentUser(user.username)
      localStorage.token = token
      localStorage.username = user.username
      navigate("/main")
    }
    catch(errs){
      alert(errs)
    }
  }

  const logout = () =>{
    setCurrentUser("");
    ConnectToBackend.token = "";
    localStorage.clear()
  }

  const save = async (story) =>{
    try{
      await ConnectToBackend.save(story)
      navigate("/main")
    }
    catch(errs){
      const errors = errs.map(err=>{
        if(error_map[err]){
          return error_map[err]
        }
        else{
          return err
        }
      })
      alert(errors)
    }
  }

  const edit = async (id, info) => {
    try{
      await ConnectToBackend.editStory(id, info)
      navigate("/main")
    }
    catch(errs){
      alert(errs)
    }
  }
  
  const deleteStory = async (id) => {
    try{
      await ConnectToBackend.deleteStory(id);
      navigate("/main");
    }
    catch(errs){
      alert(errs);
    }
  }
  
  useEffect(()=>{
    function getFromLocalStorage (){
      if (localStorage.token && localStorage.username){
        ConnectToBackend.token = localStorage.token
        const user = localStorage.username
        setCurrentUser(user)
      }
    }
    getFromLocalStorage()
  },[])

  return (
    <div className="App">
      {/* {errors && errors.map(err => {return <div className="error"> {err} </div>})} */}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<RegistrationPage currentUser={currentUser} register={register}/>}/>
        <Route path='/login' element={<LoginPage login={login}/>}/>
        <Route path='/main' element={<MainPage currentUser={currentUser} logout={logout}/>}/>
        <Route path='/write' element={<WriteStory save={save} currentUser={currentUser} logout={logout}/>}/>
        <Route path='/stories' element={<Stories currentUser={currentUser} logout={logout}/>}/>
        <Route path="/stories/:id" element={<Story deleteStory={deleteStory} currentUser={currentUser} logout={logout}/>}/>
        <Route path='/stories/:id/edit' element={<EditStory currentUser={currentUser} logout={logout} edit={edit}/>}/>
        <Route path='/discover' element={<Discover currentUser={currentUser} logout={logout}/>}/>
        <Route path='/users/:username' element={<CheckUser currentUser={currentUser} logout={logout}/>}/>
      </Routes>
    </div>
  );
}

export default App;
