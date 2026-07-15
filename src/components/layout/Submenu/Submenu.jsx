import s from './Submenu.module.scss';
import {useLocation} from "react-router-dom";
import RequestsSubmenu from "@/components/RequestsPage/RequestsSubmenu/Requests.jsx";
import FavoritesSubmenu from "@/components/FavoritesNewPage/FavoritesSubmenu/FavoritesSubmenu.jsx";
import ManageRequestsSubmenu from "@/components/manage-requests/ManageRequestsSubmenu/ManageRequestsSubmenu.jsx";
import ChatSubmenu from "@/components/chat/ChatSubmenu/ChatSubmenu.jsx";
import DashboardSubmenu from "@/components/dashboard/DashboardSubmenu/DashboardSubmenu.jsx";

const Submenu = () => {

  const location = useLocation();


  return (
    <div className={s.submenu}>

      {
        location.pathname.startsWith('/dashboard') && <DashboardSubmenu />
      }

      {
        location.pathname.startsWith('/requests') && <RequestsSubmenu />
      }

      {
        location.pathname.startsWith('/favorites') && <FavoritesSubmenu />
      }

      {
        location.pathname.startsWith('/manage-requests') && <ManageRequestsSubmenu />
      }

      {
        location.pathname.startsWith('/chat') && <ChatSubmenu />
      }


    </div>
  );
};

export default Submenu;