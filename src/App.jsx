import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Auth from "@/pages/Auth.jsx";
import Product from "@/pages/Product.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Category from "@/pages/Category.jsx";
import Favourites from "@/pages/Favourites.jsx";
import Cart from "@/pages/Cart.jsx";
import Lk from "@/pages/Lk/Lk.jsx";
import Orders from "@/pages/Orders.jsx";
import LkMain from "@/pages/Lk/LkMain.jsx";
import LkShop from "@/pages/Lk/LkShop.jsx";
import LkOrders from "@/pages/Lk/LkOrders.jsx";
import LkRequests from "@/pages/Lk/LkRequests.jsx";
import LkChat from "@/pages/Lk/LkChat.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";

function App() {


  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/category/:category' element={<Category/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/product/:slug' element={<Product/>}/>
          
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>

          {/*<Route path='/lk'  element={<Lk/>}>*/}
          <Route path='/lk' element={<ProtectedRoute> <Lk/> </ProtectedRoute>}>
            <Route index element={<Navigate to="main" replace/>}/> {/* Перенаправление на /lk/main */}
            <Route path='main' element={<LkMain/>}/>
            <Route path='shop' element={<LkShop/>}/>
            <Route path='orders' element={<LkOrders/>}/>
            <Route path='search-requests' element={<LkRequests/>}/>
            <Route path='chat' element={<LkChat/>}/>
          </Route>

          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;