import s from './Submenu.module.scss';
import {useLocation} from "react-router-dom";
import RequestsSubmenu from "@/components/RequestsPage/RequestsSubmenu/Requests.jsx";
import FavoritesSubmenu from "@/components/FavoritesNewPage/FavoritesSubmenu/FavoritesSubmenu.jsx";
import ManageRequestsSubmenu from "@/components/manage-requests/ManageRequestsSubmenu/ManageRequestsSubmenu.jsx";
import ChatSubmenu from "@/components/chat/ChatSubmenu/ChatSubmenu.jsx";
import DashboardSubmenu from "@/components/dashboard/DashboardSubmenu/DashboardSubmenu.jsx";
import {useSelector} from "react-redux";
import {getUserStatus} from "@/store/userSlice.js";

const Submenu = () => {

  const location = useLocation();

  const userStatus = useSelector(getUserStatus)



  return (
    <div className={s.submenu}>

      {
        userStatus !== "loading" && location.pathname.startsWith('/dashboard') && <DashboardSubmenu />
      }

      {
        userStatus !== "loading" &&  (location.pathname.startsWith('/requests') || location.pathname === "/") && <RequestsSubmenu />
      }

      {
        userStatus !== "loading" &&  location.pathname.startsWith('/favorites') && <FavoritesSubmenu />
      }

      {
        userStatus !== "loading" &&  location.pathname.startsWith('/manage-requests') && <ManageRequestsSubmenu />
      }

      {
        userStatus !== "loading" &&  location.pathname.startsWith('/chat') && <ChatSubmenu />
      }
    </div>
  )
}

export default Submenu;