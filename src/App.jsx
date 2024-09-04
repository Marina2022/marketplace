import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Auth from "@/pages/Auth.jsx";
import Product from "@/pages/Product.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Category from "@/pages/Category.jsx";
import Favourites from "@/pages/Favourites.jsx";
import Cart from "@/pages/Cart.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
import Lk from "@/pages/Lk.jsx";
import Orders from "@/pages/Orders.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/category/:category' element={<Category/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/product/:slug' element={<Product/>}/>
          {/*<Route path='/favourites' element={<ProtectedRoute> <Favourites/> </ProtectedRoute>}/>*/}
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/lk' element={<Lk/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;