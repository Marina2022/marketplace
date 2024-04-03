import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Catalog from "@/pages/Catalog.jsx";
import Auth from "@/pages/Auth.jsx";
import Product from "@/pages/Product.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Category from "@/pages/Category.jsx";
import Favorites from "@/pages/Favorites.jsx";
import Cart from "@/pages/Cart.jsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (      
        <Router>
          <Routes>
            <Route  element={<MainLayout/>}>
              <Route path='/' index element={<Home/>}/>
              <Route path='/category' element={<Catalog/>}/>
              <Route path='/category/:category' element={<Category/>}/>
              <Route path='/login' element={<Auth/>}/>
              <Route path='/product/:slug' element={<Product/>}/>
              <Route path='/favorites' element={<ProtectedRoute> <Favorites/> </ProtectedRoute>}/>              
              <Route path='/cart' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </Router>      
  );
}

export default App;