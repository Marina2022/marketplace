import s from './CategoryBlock.module.scss'
import DesktopFilters from "@/components/CategoryBlock/Filters/DesktopFilters/DesktopFilters.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";
import {useRef} from "react";
import TopBlock from "@/components/CategoryBlock/TopBlock/TopBlock.jsx";

const CategoryBlock = ({allFilters}) => {

  const isBigScreen = useBigScreen()
  const rightPartRef = useRef()

  return (
      <div className='container'>

        <TopBlock/>

        <div className={s.wrapper}>

          <DesktopFilters allFilters={allFilters} rightPartRef={rightPartRef}/>
          <div className={s.rightPartWrapper}>
            <div className={s.rightPart} ref={rightPartRef}>             
              <Products isBigScreen={isBigScreen} allFilters={allFilters}/>
            </div>
          </div>
        </div>
        
      </div>
  );
};

export default CategoryBlock;