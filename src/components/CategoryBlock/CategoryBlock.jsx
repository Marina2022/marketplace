import s from './CategoryBlock.module.scss'
import DesktopFilters from "@/components/CategoryBlock/Filters/DesktopFilters/DesktopFilters.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";
import Pagination from "@/components/CategoryBlock/Pagination/Pagination.jsx";
import {useRef} from "react";

const CategoryBlock = ({products, path, pageCountTotal, setProducts, allFilters}) => {

  const isBigScreen = useBigScreen()
  
  const rightPartRef = useRef()
  
  
  return (
      <div className='container'>
        <BreadCrumbs path={path}/>
        <h1 className={s.title}>{path[0].name}</h1>

        <div className={s.wrapper}>

          <DesktopFilters allFilters={allFilters}  rightPartRef={rightPartRef}  />
          <div className={s.rightPart} ref={rightPartRef}>
            <div className={s.sortAndView}>
              <Sort/>

              {
                  isBigScreen && <CardView/>
              }

              {
                <MobileFilters/>
              }

            </div>

            <Products products={products} isBigScreen={isBigScreen}/>

            {
              products.length > 0 && <Pagination pageCountTotal={pageCountTotal} setProducts={setProducts} products={products}
                                                 allFilters={allFilters} />
            }
            
          </div>

          <div className={s.cardsWrapper}></div>
        </div>

      </div>
  );
};

export default CategoryBlock;