import '../css/landing.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Header() {
    const listRef = useRef();
    const [login, setLogin] = useState(false);
    const [menuStyle, setMenuStyle] = useState('fa fa-bars');
    
    useEffect(() => {
        const listClick = (e) => {
            e.preventDefault();
            if(window.innerWidth <= 600){
                listRef.current.style.display = "none";
            }
        }
        Array.from(listRef.current.children).forEach(child => {
            child.addEventListener('click', listClick )
        })
      getData();
      return () => {
        listRef.current.removeEventListener('click', listClick);
      }
     }, []);

    const getData = async () => {
        const res = await axios.get('/data');
        if(res.data){
            setLogin(true);
        }
    }

    const handleShowMenu = () => {
        if(menuStyle === 'fa fa-close'){
            listRef.current.style.transform = "translateX(-100%)";
            setMenuStyle('fa fa-bars');
        }else{
            listRef.current.style.transform = "translateX(0)";
            setMenuStyle('fa fa-close');
        }
    }
    
    return(
        <div className='header-container'>
            <div className='header'>
                <h2 className="title-logo">Emaily</h2>
                <div className='left-header'>
                    <ul ref={listRef} className="sign-list">
                        {!login && <a href="/login">Login</a>}
                        {!login && <a href="/auth/google">Sign in with Google</a>}
                        {login && <Link className='link' to="survey/new">Create Survey</Link>}
                        {login && <Link className='link' to='surveys'>My Surveys</Link>}
                        {login && <a href="/logout">Logout</a>}
                    </ul>
                    <button onClick={handleShowMenu} className='hamburger'>Menu<i class={menuStyle}></i></button>
                </div>
            </div> {/* END OF HEADER */}
        </div>
    );
}

export default Header;
