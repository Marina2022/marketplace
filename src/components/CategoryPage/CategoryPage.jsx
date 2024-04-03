import s from './CategoryPage.module.scss'
import Filters from "@/components/CategoryPage/Filters/Filters.jsx";
import Sort from "@/components/CategoryPage/Sort/Sort.jsx";
import Products from "@/components/CategoryPage/Products/Products.jsx";
import CardView from "@/components/CategoryPage/CardView/CardView.jsx";
import {useEffect, useState} from "react";

const CategoryPage = ({products, filters, path}) => {

  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1720)

  useEffect(() => {

    const onWindowResize = () => {
      if (window.innerWidth <= 1720) {
        setIsBigScreen(false)
      } else {
        setIsBigScreen(true)
      }
    }

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }

  }, []);

  console.log(products)

  if (!products) return <p>Loading...</p>

  return (
      <div className='container'>
        <div>breadcrumbs</div>
        <h1 className={s.title}>{path[0].name}</h1>

        <div className={s.wrapper}>

          <Filters filters={filters}/>

          <div className={s.rightPart}>
            <div className={s.sortAndView}>
              <Sort/>

              {
                  isBigScreen && <CardView/>
              }

            </div>

            <Products products={products} isBigScreen={isBigScreen}/>

          </div>


          <div className={s.cardsWrapper}></div>
        </div>

      </div>
  );
};

export default CategoryPage;