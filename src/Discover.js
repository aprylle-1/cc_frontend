import Navbar from "./Navbar";
import ConnectToBackend from './ConnectToApi';
import { useState, useEffect } from 'react';
import './Discover.css';
function Discover ({currentUser, logout}) {

    const [data, setData] = useState(null);

    useEffect(()=>{
        const username = localStorage.username
        async function getData () {
            const data = await ConnectToBackend.discover({username : username});
            setData(data)
        }

        getData()
    },[])

    function truncateString(inputString) {
        if (inputString.length > 100) {
            return inputString.substring(0, 200) + "...";
        }
        return inputString;
    }

    return (
        <div className="Discover">
            <Navbar user={currentUser} logout={logout}/>
            <h3>Stories From Others</h3>
            {data && data.data.map((item, idx)=>{
                if (item.story){
                    const username = item.user.username
                    const url = `/users/${username}`
                    return(
                        <div className="card">
                            <div className="card-header">
                                <p>{item.story ? item.story.title : "nothing here"} by: <a href={url}>{item.user.username}</a></p>
                            </div>
                            <div className="card-body">
                            <p className="card-text">{truncateString(item.story.content)}</p>
                            </div>
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}

export default Discover;