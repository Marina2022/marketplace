import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.scss'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import cartSlice from "@/store/cartSlice.js";
import userSlice, {getUser, setToken} from "@/store/userSlice.js";
import catalogSlice from "@/store/catalogSlice.js";
import reviewsSlice, {loadReviewLikes} from "@/store/reviewsSlice.js";
import favSlice from "@/store/favSlice.js";
import lkSlice from "@/store/lkSlice.js";
import ordersSlice from "@/store/ordersSlice.js";

export const store = configureStore({
      reducer: {        
        cart: cartSlice,
        user: userSlice,
        catalog: catalogSlice,
        reviews: reviewsSlice,
        favs: favSlice,
        lk: lkSlice,
        orders: ordersSlice,
      }
    }
)

store.dispatch(getUser())

store.dispatch(loadReviewLikes())

const token = localStorage.getItem('token')
if (token) store.dispatch(setToken(token))

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    // </React.StrictMode>,
)
