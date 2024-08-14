import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../redux/actions/user.actions.js';
import User from '../components/User.js';
import AccountCard from '../components/AccountCard.js';
import AccountCardData from '../datas/account-data.json';

/* User profile page */
function Profile () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    /* Asynchronous function that retrieves user data and updates it with useEffect */
    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        /* 
                            Checking that the query response is indeed retrieved
                            console.log(data) 
                        */
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName
                        }
                        /* Return user data in redux state */
                        dispatch(userProfile(userData));
                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]);

    return (
        <main className='main bg-dark'>
            {/* Return user componant */}
            < User />
            {/* Return items from json file with map */}
            {AccountCardData.map((data) => (
                /* Return AccountCard component */
                <AccountCard 
                    key={data.userId}
                    title={data.title}
                    amount={data.amount}
                    description={data.description}
                />
            ))}
        </main>
    )
}

export default Profile;