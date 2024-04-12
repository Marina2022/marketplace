import s from './CategoryBlock.module.scss'
import DesktopFilters from "@/components/CategoryBlock/Filters/DesktopFilters/DesktopFilters.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import {useRef} from "react";
import TopBlock from "@/components/CategoryBlock/TopBlock/TopBlock.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts.jsx"


const CategoryBlock = ({allFilters}) => {

  const isBigScreen = useBigScreen()
  const isMobile = useMobileScreen()

  const rightPartRef = useRef()


  return (
      <div className='container'>

        <TopBlock/>

        <div className={s.wrapper}>

          {
              !isMobile && <DesktopFilters allFilters={allFilters} rightPartRef={rightPartRef}/>
          }
          <div className={s.rightPartWrapper}>
            <div className={s.rightPart} ref={rightPartRef}>
              <Products isBigScreen={isBigScreen} allFilters={allFilters} rightPartRef={rightPartRef}/>
            </div>

            <ViewedProducts />
            
          </div>
        </div>

      </div>
  );
};

export default CategoryBlock;