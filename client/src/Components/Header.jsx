import '../css/landing.css';
function Header() {
    return(
        <div className='container'>
            <div className='header'>
                <h2 className="title-logo">Emaily</h2>
                <ul className="sign-list">
                    <a>Sign up</a>
                    <a href='/auth/google'>Sign in with Google</a>
                </ul>
            </div> {/* END OF HEADER */}


            <h1 id='meow'>LANDING PAGE</h1>
        </div>
    );
}

export default Header;