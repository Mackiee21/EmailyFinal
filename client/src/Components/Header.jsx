import '../css/landing.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useIsLoginQuery} from '../store';
function Header() {
    const p = useRef();
    const { data, error, isFetching} = useIsLoginQuery();
    const [name, setName] = useState(null);
    const [login, setLogin] = useState(false);

    
    useEffect(() => {
        if(isFetching){
            p.current.innerText = "LOADING..."
        }else if(error){
            p.current.innerText = "ERROR FETCHING DATA";
            console.log(error);
        }else{
            p.current.innerText = "LANDING PAGE";
            if(data){
                setLogin(true);
                setName(data.name);
            }else{
                setLogin(false);
                setName("Anonymous");
            }
        }
        //getData();
    }, [data, error, isFetching]);

    // const getData = async () => {
    //     p.current.innerText = "LOADING..."
    //     const res = await axios.get('/data');
    //     if(res.data){
    //         setLogin(true);
    //         setName(res.data.name);
    //     }
    //     else{
    //         setName("Anonymous")
    //     }
    //     p.current.innerText = "LANDING PAGE";
    // }

    return(
        <div className='container'>
            <div className='header'>
                <h2 className="title-logo">Emaily</h2>
                <ul className="sign-list">
                    {!login && <a href='/login'>Login</a>}
                    {!login && <a href='/auth/google'>Sign in with Google</a>}
                    {login && <a href="/logout">Logout</a>}
                </ul>
            </div> {/* END OF HEADER */}


            <h1 ref={p} id='meow'>LANDING PAGE</h1>
             {name && <h2 style={{"textAlign": "center", "display": "block"}}>Hi! {name}</h2>}
        </div>
    );
}

export default Header;
