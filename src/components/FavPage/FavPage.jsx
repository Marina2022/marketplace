import s from './FavPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getFavCategories, getFavs, loadFavs} from "@/store/favSlice.js";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import FavList from "@/components/FavPage/FavList/FavList.jsx";
import FavCategoriesDesktop from "@/components/FavPage/FavCategories/FavCategoriesDesktop.jsx";
import FavCategoriesMobile from "@/components/FavPage/FavCategories/FavCategoriesMobile.jsx";
import {useEffect, useState} from "react";


const FavPage = () => {
  const favs = useSelector(getFavs)
  const cats = useSelector(getFavCategories)

  let favsToShow
  if (favs) {
    favsToShow = favs.map(fav => {
      const newFav = {...fav}
      newFav.isFavourite = true
      return newFav
    })
  }

  console.log('favs', favs)
  console.log('favsToShow', favsToShow)
  console.log('cats', cats)

  const isMobile = useMobileScreen()

  const [productCategoryId, setProductCategoryId] = useState(null)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadFavs(productCategoryId))
  }, [productCategoryId]);


  return (
    <div className='container'>
      <h1 className={s.mainTitle}>Избранное</h1>
      <div className={s.wrapper}>
        {
          !isMobile && <FavCategoriesDesktop
            cats={cats}
            productCategoryId={productCategoryId}
            setProductCategoryId={setProductCategoryId}/>
        }

        {
          isMobile && <FavCategoriesMobile
            cats={cats}
            productCategoryId={productCategoryId}
            setProductCategoryId={setProductCategoryId}/>
        }

        <div className={s.rightPartWrapper}>
          <div className={s.rightPart}>
            {
              favsToShow && <FavList products={favsToShow}/>
            }
          </div>
          <ViewedProducts/>
        </div>
      </div>
    </div>
  );
};

export default FavPage;