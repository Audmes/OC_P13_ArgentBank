import { GET_USERPROFILE, EDIT_USERPROFILE } from "./type.actions";

/* User data recovery action */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

/* User data update action */
export const updateProfile = (userData) => {
    return {
        type: EDIT_USERPROFILE,
        payload: userData,
    }
}