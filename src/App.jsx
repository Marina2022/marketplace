import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Catalog from "@/pages/Catalog.jsx";
import Auth from "@/pages/Auth.jsx";
import Product from "@/pages/Product.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Category from "@/pages/Category.jsx";

function App() {
  return (      
        <Router>
          <Routes>
            <Route  element={<MainLayout/>}>
              <Route path='/' index element={<Home/>}/>
              <Route path='/category' element={<Catalog/>}/>
              <Route path='/category/:slug' element={<Category/>}/>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/product/:slug' element={<Product/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </Router>      
  );
}

export default App;