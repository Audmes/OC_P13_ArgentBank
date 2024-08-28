import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.js';
import { isValidEmail, isInvalidPassword } from '../utils/regex.js';

function Form () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Allows you to retrieve the data entered by the user in the form */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    /* Indicates an error message if data is invalid */
    const [errorMessage, setErrorMessage] = useState('');

    /* Asynchronous form function */
    const handleSubmit = async (event) => {
        event.preventDefault();

        /* Handle error message */
        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email adress");
            return;
        }

        if (isInvalidPassword(password)) {
            setErrorMessage("Invalid password");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                /* 
                    Checking that the query response is indeed retrieved
                    console.log(data) 
                */
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);

                if (rememberMe) {
                    localStorage.setItem("token", token);
                }

                navigate('/profile');

            } else {
                const error = "Incorrect email/password"
                setErrorMessage("Incorrect email/password");
                dispatch(loginFailed(error));
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='sign-in-content'>
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h2>Sign In</h2>

            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='userEmail'>Email</label>
                    <input 
                        id='userEmail' 
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        autoComplete='on'
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='userPassword'>Password</label>
                    <input 
                        id='userPassword' 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete='on'
                    />
                </div>
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox' 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor='remember-me'>Remember me</label>
                </div>

                <button className="sign-in-button">
                    Sign In
                </button>
                
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>

        </section>
    )
}

export default Form