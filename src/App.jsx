import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Auth from "@/pages/Auth.jsx";
import Product from "@/pages/Product.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Category from "@/pages/Category.jsx";
import Favourites from "@/pages/Favourites.jsx";
import Cart from "@/pages/Cart.jsx";
import Lk from "@/pages/Lk/Lk.jsx";
import LkMain from "@/pages/Lk/LkMain.jsx";
import LkShop from "@/pages/Lk/LkShop.jsx";
import LkOrders from "@/pages/Lk/LKOrders/LkOrders.jsx";
import LkRequests from "@/pages/Lk/LkRequests.jsx";
import LkChat from "@/pages/Lk/LkChat.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
import CreateReview from "@/components/ProductPage/CreateReview/CreateReview.jsx";
import CreateQuestion from "@/components/ProductPage/CreateQuestion/CreateQuestion.jsx";
import CreateMessage from "@/components/ProductPage/CreateMessage/CreateMessage.jsx";
import Order from "@/pages/Order.jsx";
import ManageProductPage from "@/components/lk-InnerPages/ManageProduct/ManageProductPage.jsx";
function App() {


  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/category/:category' element={<Category/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/product/:slug' element={<Product/>}/>                    
          <Route path='/product/:slug/new-review' element={<ProtectedRoute><CreateReview/></ProtectedRoute>}/>
          <Route path='/product/:slug/new-question' element={<ProtectedRoute><CreateQuestion/></ProtectedRoute>}/>
          <Route path='/product/:productHandle/:sku/new-message' element={<ProtectedRoute><CreateMessage/></ProtectedRoute>}/>
                              
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='/cart' element={<Cart/>}/>          
          
          <Route path='/lk' element={<ProtectedRoute> <Lk/> </ProtectedRoute>}>
            <Route index element={<Navigate to="main" replace/>}/> {/* Перенаправление на /lk/main */}
            <Route path='main' element={<LkMain/>}/>
            <Route path='shop' element={<LkShop/>}/>
            <Route path='orders' element={<LkOrders/>}/>
            <Route path='search-requests' element={<LkRequests/>}/>
            <Route path='chat' element={<LkChat/>}/>
            <Route path='orders/:orderId' element={<Order/>}/>
            
            <Route path='edit-product/:productIdParam' element={<ManageProductPage/>}/>
          </Route>

          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;