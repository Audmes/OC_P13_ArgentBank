// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "../reducers/api";
import loginReducer from "../reducers/login";
import accountReducer from "../reducers/account";
import userReducer from "../reducers/user";

/* Creating a store with the reducers. */
const store = configureStore({
	reducer: {
		api: apiReducer,
		login: loginReducer,
		account: accountReducer,
		user: userReducer,
	},
});

export default store;