import s from './CategoryBlock.module.scss'
import Filters from "@/components/CategoryBlock/Filters/Filters.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import {useEffect, useState} from "react";
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";

const CategoryBlock = ({products, filters, path}) => {

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
  
  return (
      <div className='container'>
        <BreadCrumbs path={path} />
        <h1 className={s.title}>{path[0].name}</h1>

        <div className={s.wrapper}>

          <Filters filters={filters}/>
          <div className={s.rightPart}>
            <div className={s.sortAndView}>
              <Sort/>

              {
                  isBigScreen && <CardView />
              }

            </div>

            <Products products={products} isBigScreen={isBigScreen}   />

          </div>


          <div className={s.cardsWrapper}></div>
        </div>

      </div>
  );
};

export default CategoryBlock;