// component imports
import React from 'react'
import App from './App.jsx'
// css imports
import './index.css'
// library imports
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/store.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>
    <App />
    <Toaster/>
</BrowserRouter>
</Provider>
);
