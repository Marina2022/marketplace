import Header from "@/components/layout/Header/Header.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
  return (
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>
        {/*<Footer />*/}
      </div>
  );
};

export default MainLayout;