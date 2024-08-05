import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.scss'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import cartSlice, {getCart, loadCart, loadCheckout} from "@/store/cartSlice.js";
import userSlice, {setToken} from "@/store/userSlice.js";
import catalogSlice from "@/store/catalogSlice.js";
import {loadReviewLikes} from "@/store/reviewsSlice.js";
import reviewsSlice from "@/store/reviewsSlice.js";



export const store = configureStore({
      reducer: {        
        cart: cartSlice,
        user: userSlice,
        catalog: catalogSlice,
        reviews: reviewsSlice
      }
    }
)

store.dispatch(loadCart())
store.dispatch(loadCheckout({cartId: 'cbd90aef-8adc-4f82-8b25-285e85e40b37'}))
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
