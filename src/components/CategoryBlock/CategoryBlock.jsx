import s from './CategoryBlock.module.scss'
import Filters from "@/components/CategoryBlock/Filters/Filters.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";

const CategoryBlock = ({products, filters, path}) => {
  
  const isBigScreen = useBigScreen()
  
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

              {
                <MobileFilters />
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