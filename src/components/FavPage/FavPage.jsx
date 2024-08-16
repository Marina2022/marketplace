import s from './FavPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getFavCategories, getFavs, getFavsLoadingStatus, loadFavs} from "@/store/favSlice.js";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import FavList from "@/components/FavPage/FavList/FavList.jsx";
import FavCategoriesDesktop from "@/components/FavPage/FavCategories/FavCategoriesDesktop.jsx";
import FavCategoriesMobile from "@/components/FavPage/FavCategories/FavCategoriesMobile.jsx";
import {useEffect, useState} from "react";
import inlineHeart from '@/assets/img/cart/inlineHeart.svg'
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const FavPage = () => {
  const favs = useSelector(getFavs)
  const cats = useSelector(getFavCategories)
  const favsLoadingStatus = useSelector(getFavsLoadingStatus)

  let favsToShow
  if (favs) {
    favsToShow = favs.map(fav => {
      const newFav = {...fav}
      newFav.isFavourite = true
      return newFav
    })
  }

  const isMobile = useMobileScreen()
  const [productCategoryId, setProductCategoryId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadFavs(productCategoryId))
  }, [productCategoryId]);  
  if (favsLoadingStatus =='loading' && !favs ) return <Spinner/>

  return (
    <div className='container'>
      {
        favs?.length !== 0 && favsLoadingStatus !=='loading' && favsLoadingStatus === 'success' &&
        <h1 className={s.mainTitle}>Избранное</h1>
      }

      <div className={s.wrapper}>
        {
          !isMobile && favs?.length !== 0  && favsLoadingStatus !=='loading' &&  <FavCategoriesDesktop
            cats={cats}
            productCategoryId={productCategoryId}
            setProductCategoryId={setProductCategoryId}/>
        }

        {
          isMobile && favs?.length !== 0 && favsLoadingStatus !=='loading' &&  <FavCategoriesMobile
            cats={cats}
            productCategoryId={productCategoryId}
            setProductCategoryId={setProductCategoryId}/>
        }

        <div className={ !cats ? s.rightPartWrapperNoCats : s.rightPartWrapper}>
                    
          {
            favs?.length === 0 && favsLoadingStatus === 'success' && <div className={s.emptyPage}>
              <h2 className={s.emptyPageTitle}>Здесь пусто :(</h2>
              <p className={s.emptyPageText}>
                <span>Нажимайте</span>
                <img className={s.inlineHeart} src={inlineHeart} alt="heart"/>
                <span>и добавляйте товары!</span>
              </p>
              <p className={s.emptyPageText}>
                А чтобы найти любимые товары, начните покупки.
              </p>
            </div>
          }

          {

          favs?.length !== 0 && favsLoadingStatus === 'success' && <div className={s.rightPart}>              
              {
                favsToShow && <FavList products={favsToShow} fullSize={cats ? false : true} />
              }
            </div>
          }

          {
            favsLoadingStatus !=='loading' && <ViewedProducts fullSize={cats ? false : true} />
          }         
          
        </div>
      </div>
    </div>
  );
};

export default FavPage;