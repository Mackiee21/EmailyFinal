import { useRef } from 'react';
import '../css/Login.css';

function Login() {
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    const handleLogin = (e) => {
        e.preventDefault();
        alert(`user ${userEmail.current.value} is added to Mackiee's database \nContact developer for deletion`);
    }
    return(
        <div id="container">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input ref={userEmail} type="text" id="email" placeholder="example@gmail.com" required />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password</label>
                    <input ref={userPassword} type="password" id="password" required />
                </div>
                <button type="submit">Login</button>
                <p>or</p>
                <a href="/auth/google" className='link-btn'>Log in with Google</a>
            </form>
        </div>
    );
}

export default Login;