// src/store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import apiReducer from "./reducers/api";
// import loginReducer from "./reducers/login";
// import accountReducer from "./reducers/account";
import { authReducer } from "./reducers/auth.reducer";
import { userReducer } from "./reducers/user.reducer";

const rootReducer = combineReducers({
	// api: apiReducer,
	// login: loginReducer,
	// account: accountReducer,
	// user: userReducer,
	auth: authReducer,
	user: userReducer
 });

/* Creating a store with the reducers. */
const store = configureStore({
	reducer: rootReducer,
    devTools: true 
});

export default store;