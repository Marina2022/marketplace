import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import NotFound from "@/pages/NotFound.jsx";
import LkChat from "@/pages/Lk/LkChat.jsx";
import {useViewportHeight} from "@/hooks/useViewportHeight.js";
import {Toaster} from "sonner";
import FavouritesNew from "@/pages/FavouritesNew.jsx";
import RequestsPage from "@/components/RequestsPage/RequestsPage.jsx";
import MyRequestsPage from "@/pages/manage-requests/MyRequestsPage.jsx";
import MyResponsesPage from "@/pages/manage-requests/MyResponsesPage.jsx";
import DashboardMainPage from "@/pages/dashboard/DashboardMainPage/DashboardMainPage.jsx";
import DashboardOrganizationsPage from "@/pages/dashboard/DashboardOrganizationsPage/DashboardOrganizationsPage.jsx";
import DashboardProfilePage from "@/pages/dashboard/DashboardProfilePage/DashboardProfilePage.jsx";
import ChatPage from "@/pages/chat/ChatPage.jsx";

function App() {

  useViewportHeight()

  return (
    <>
      <Toaster position="bottom-right" closeButton/>

      <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path='/' index element={<Home/>}/>

            {/*

            Новые рауты


            */}

            <Route path='/favorites' element={<FavouritesNew/>}/>
            <Route path='manage-requests/my-requests' element={<MyRequestsPage/>}/>
            <Route path='manage-requests/my-responses' element={<MyResponsesPage/>}/>

            <Route path='dashboard/main' element={<DashboardMainPage/>}/>
            <Route path='dashboard/organizations' element={<DashboardOrganizationsPage/>}/>
            <Route path='dashboard/profile' element={<DashboardProfilePage/>}/>

            <Route path='requests' element={<RequestsPage/>}/>
            <Route path='chat' element={<ChatPage/>}/>

            {/*<Route path='/category/:category' element={<Category/>}/>*/}
            {/*<Route path='/login' element={<Auth/>}/>*/}
            {/*<Route path='/product/:slug' element={<Product/>}/>*/}
            {/*<Route path='/product/:slug/new-review' element={<ProtectedRoute><CreateReview/></ProtectedRoute>}/>*/}
            {/*<Route path='/product/:slug/new-question' element={<ProtectedRoute><CreateQuestion/></ProtectedRoute>}/>*/}
            {/*<Route path='/product/:productHandle/:sku/new-message' element={<ProtectedRoute><CreateMessage/></ProtectedRoute>}/>*/}

            {/*<Route path='/favourites' element={<Favourites/>}/>*/}
            {/*<Route path='/cart' element={<Cart/>}/>*/}

            {/*<Route path='/lk' element={<ProtectedRoute> <Lk/> </ProtectedRoute>}>*/}
            {/*  <Route index element={<Navigate to="main" replace/>}/> /!* Перенаправление на /lk/main *!/*/}
            {/*  <Route path='main' element={<LkMain/>}/>*/}
            {/*  <Route path='shop' element={<LkShop/>}/>*/}
            {/*  <Route path='orders' element={<LkOrders/>}/>*/}
            {/*  <Route path='requests' element={<LkRequests/>}/>*/}
            {/*  <Route path='chat' element={<LkChat/>}/>*/}
            {/*  <Route path='orders/:orderId' element={<Order/>}/>*/}

            {/*  <Route path='edit-product/:productIdParam' element={<EditAndCreateProduct/>}/>*/}
            {/*  <Route path='combine-products' element={<CombineProductPage/>}/>*/}
            {/*</Route>*/}
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;