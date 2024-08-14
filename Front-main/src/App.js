// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

/**
 * App to render the Header and the pages of the application
 *
 * @category App
 * @component
 * @returns { React.Component } A React component
 */
function App() {
	const isConnected = useSelector((state) => state.auth.isConnected);

    return (
        <BrowserRouter basename="/OC_P13_ArgentBank">
			<Header />
			<Routes>
			    <Route 
					exact path="/" 
					element={<Home />} 
				/>
				<Route exact path="/login" element={<Login />} />
				<Route 
                    exact path='profile' 
                    element={isConnected ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route path='*' element={<Error />} />
			</Routes>
			<Footer />
		</BrowserRouter>
    );
}

export default App;