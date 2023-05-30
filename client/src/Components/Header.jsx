import '../css/landing.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
function Header() {
    const [name, setName] = useState(null);
    
    const getData = async () => {
        const res = await axios.get('/data');
        setName(res.data.name);
    }

    return(
        <div className='container'>
            <div className='header'>
                <h2 className="title-logo">Emaily</h2>
                <ul className="sign-list">
                    <a href='/login'>Login</a>
                    <a href='/auth/google'>Sign in with Google</a>
                </ul>
            </div> {/* END OF HEADER */}


            <h1 id='meow'>LANDING PAGE</h1>
             {name && <h2 style={{"textAlign": "center", "display": "block"}}>Hi! {name}</h2>}
        </div>
    );
}

export default Header;
