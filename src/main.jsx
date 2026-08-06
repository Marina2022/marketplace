import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.scss'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import cartSlice from "@/store/cartSlice.js";
import userSlice, {getUser} from "@/store/userSlice.js";
import catalogSlice from "@/store/catalogSlice.js";
import reviewsSlice from "@/store/reviewsSlice.js";
import favSlice from "@/store/favSlice.js";
import lkSlice from "@/store/lkSlice.js";
import ordersSlice from "@/store/ordersSlice.js";
import lkShopSlice from "@/store/lkShopSlice.js";
import requestsSlice, {loadRequestsTree} from "@/store/requestsSlice.js";
import {injectStore} from "@/api/axiosInstance.js";
import tabsSlice from "@/store/tabsSlice.js";
import mobileMenuSlice from "@/store/mobileMenuSlice.js";
import geoSlice, {loadRegions}  from "@/store/geoSlice.js";

export const store = configureStore({
      reducer: {        
        cart: cartSlice,
        user: userSlice,
        catalog: catalogSlice,
        reviews: reviewsSlice,
        favs: favSlice,
        lk: lkSlice,
        orders: ordersSlice,
        shop: lkShopSlice,
        requests: requestsSlice,
        tabs: tabsSlice,
        geo: geoSlice,
        mobileMenu: mobileMenuSlice
      }
    }
)

injectStore(store)
store.dispatch(getUser())  // geoContext подгружается в getUser
store.dispatch(loadRegions())
store.dispatch(loadRequestsTree())


// store.dispatch(loadReviewLikes())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
)
