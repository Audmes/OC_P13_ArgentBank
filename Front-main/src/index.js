// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import './css/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* Rendering the Provider component with the store and the App component. */
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);