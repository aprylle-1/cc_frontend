import "./Navbar.css"
import { useNavigate} from "react-router-dom";
function Navbar ({user, logout}) {
    const navigate = useNavigate()
    
    const onLogout = (e) =>{
        e.preventDefault();
        logout();
        navigate("/")
    }

    return (
            <nav className="navbar">
                {/* <div className="left">
                    <a href="/" className="app-name">CreativeCompanion</a>
                </div> */}
                <div className="right">
                    <ul>
                        <li><a href="/write">Write</a></li>
                        <li><a href="/stories">Stories</a></li>
                        <li><a href="/discover">Discover</a></li>
                        <li><a href="/main" className="greeting">Hi {user}</a></li>
                        <li><button onClick={onLogout} className="btn btn-link">Logout</button></li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar;