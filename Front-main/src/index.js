// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

import './css/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* Rendering the Provider component with the store and the App component. */
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>
);