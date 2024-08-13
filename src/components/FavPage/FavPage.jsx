import s from './FavPage.module.scss';
import {useSelector} from "react-redux";
import {getFavCategories, getFavs} from "@/store/favSlice.js";
import TopBlock from "@/components/CategoryBlock/TopBlock/TopBlock.jsx";
import DesktopFilters from "@/components/CategoryBlock/Filters/DesktopFilters/DesktopFilters.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import Favourites from "@/pages/Favourites.jsx";
import FavList from "@/components/FavPage/FavList/FavList.jsx";
import FavCategoriesDesktop from "@/components/FavPage/FavCategories/FavCategoriesDesktop.jsx";


const FavPage = () => {

  const favs = useSelector(getFavs) 
  const cats = useSelector(getFavCategories) 
  console.log('favs', favs)
  console.log('cats', cats)

  const isMobile = useMobileScreen()
  
  return (
    <div className='container'>
      <h1 className={s.mainTitle}>Избранное</h1>
      <div className={s.wrapper}>
        {
          !isMobile && <FavCategoriesDesktop />
        }
        <div className={s.rightPartWrapper}>
          <div className={s.rightPart} >
            <FavList />
          </div>
          <ViewedProducts/>
        </div>
      </div>
    </div>
  );
};

export default FavPage;