import Header from "@/components/layout/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import MobileBottomMenu from "@/components/layout/MobileBottomMenu/MobileBottomMenu.jsx";

const MainLayout = () => {
  return (
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>
        {/*<Footer />*/}
        <MobileBottomMenu />
      </div>
  );
};

export default MainLayout;