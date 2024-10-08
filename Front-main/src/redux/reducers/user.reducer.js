import { GET_USERPROFILE, EDIT_USERPROFILE, LOGOUT } from "../actions/type.actions";

/* Initial user state */
const initialState = {
    status: 'VOID',
    userData: {}
};

export const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_USERPROFILE:
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
        case EDIT_USERPROFILE: 
            return {
                ...state,
                status: "MODIFIED",
                userData: action.payload
            } 
        case LOGOUT: {
            return initialState;  
        }   
        default:
            return state;    
    }
};