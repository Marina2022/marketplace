import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.scss'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import cartSlice from "@/store/cartSlice.js";
import userSlice from "@/store/userSlice.js";

const store = configureStore({
      reducer: {        
        cart: cartSlice,
        user: userSlice,
      }
    }
)

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    // </React.StrictMode>,
)
