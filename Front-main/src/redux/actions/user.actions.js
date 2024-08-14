import { GET_USERPROFILE, EDIT_USERNAMES } from "./type.actions";

/* User data recovery action */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

/* Username update action */
export const updateUsernames = (usernames) => {
    return {
        type: EDIT_USERNAMES,
        payload: usernames,
    }
}