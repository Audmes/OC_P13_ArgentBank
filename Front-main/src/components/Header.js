import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/images/argentBankLogo.webp";
import { logout } from '../redux/actions/auth.actions';

/**
 * Render a nav element with the logo, if user is login, it show he's firstName and a Sign-out option,
 * if user is not login, it show a link to the login page
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function Header () {
    /* Updates user data on header component from state redux */
    const isConnected = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.userData.firstname);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const signOut = () => {
        dispatch(logout());
        /* Take off for don't clear the storage */
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    }

    return (
        <header>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>

                {isConnected ? (
                    <div className='connected'>
                        <NavLink className="main-nav-item" to='/profile'>
                            <i className="fa fa-user-circle"></i>
                            <p>{firstname}</p>
                        </NavLink>

                        <NavLink className="main-nav-item" onClick={signOut} to="/">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink>
                    </div>
                ) : (
                    <div className='not-connected'>
                    <NavLink className="main-nav-item" to='/login' >
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                    </div>
                )}
            </nav>
        </header>
    ) 
}

export default Header