import React, { useState } from "react";
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import { updateUsernames } from '../redux/actions/user.actions.js';
import { isValidName } from "../utils/regex.js";

function User () {
    /* Updates user data on profile page from state redux */
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);

    /* Allows you to retrieve the data entered by the user in the form */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    /* Manages the appearance of the username modification form */
    const [display, setDisplay] = useState(true);

    /* Handle error message */
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    /* Asynchronous username update function */
    const handleSubmitUsernames = async (event) => {
        event.preventDefault();

        /* Handle error message */
        if (!isValidName(firstName)) {
            setErrorMessage("Invalid firstname");
            return;
        }else {
            setErrorMessage("");
        }

        if (!isValidName(lastName)) {
            setErrorMessage("Invalid lastname");
            return;
        } else {
            setErrorMessage("");
        }

        console.log(firstName, lastName);

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({firstName, lastName}),
            });

            if (response.ok) {
                const data = await response.json();
                const userFirstName = data.body.firstName;
                const userLastName = data.body.lastName;
                console.log(userFirstName, userLastName);
                /* 
                    Checking that the query response is indeed retrieved
                    console.log(data) 
                */
                dispatch(updateUsernames(userFirstName));
                dispatch(updateUsernames(userLastName));
                setDisplay(!display);
            } else {
                console.log("Invalid Fields")
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="header">
            { display ? 
                <div>
                    <h1>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h1>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edits">
                            <div className="edit-input">
                                {/* <label htmlFor="firstname">First name:</label> */}
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    defaultValue={userData.firstname}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    // disabled={true}
                                />
                            </div>
                            <div className="edit-input">
                                {/* <label htmlFor="lastname">Last name:</label> */}
                                <input
                                    type="text"
                                    id="lastname" 
                                    name="lastname"
                                    defaultValue={userData.lastname}
                                    onChange={(event) => setLastName(event.target.value)}
                                    // disabled={true}
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={ handleSubmitUsernames }>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User;