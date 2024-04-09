import Header from "@/components/layout/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer.jsx";

const MainLayout = () => {
  return (
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
  );
};

export default MainLayout;