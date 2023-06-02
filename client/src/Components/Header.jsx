import '../css/landing.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Header() {
    const p = useRef();
    const [login, setLogin] = useState(false);
    
    useEffect(() => {
      getData();
     }, []);

    const getData = async () => {
        const res = await axios.get('/data');
        if(res.data){
            setLogin(true);
        }
    }
    return(
        <div className='header-container'>
            <div className='header'>
                <h2 className="title-logo">Emaily</h2>
                <ul className="sign-list">
                    {!login && <a href="/login">Login</a>}
                    {!login && <a href="/auth/google">Sign in with Google</a>}
                    {login && <Link className='link' to="survey/new">Create Survey</Link>}
                    {login && <Link className='link' to='surveys'>My Surveys</Link>}
                    {login && <a href="/logout">Logout</a>}
                </ul>
            </div> {/* END OF HEADER */}
        </div>
    );
}

export default Header;
