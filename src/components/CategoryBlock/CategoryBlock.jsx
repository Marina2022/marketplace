import s from './CategoryBlock.module.scss'
import Filters from "@/components/CategoryBlock/Filters/DesktopFilters/Filters.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import Products from "@/components/CategoryBlock/Products/Products.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";
import Pagination from "@/components/CategoryBlock/Pagination/Pagination.jsx";

const CategoryBlock = ({products, path, pageCountTotal, setProducts, allFilters}) => {

  const isBigScreen = useBigScreen()
  
  return (
      <div className='container'>
        <BreadCrumbs path={path}/>
        <h1 className={s.title}>{path[0].name}</h1>

        <div className={s.wrapper}>

          <Filters allFilters={allFilters}/>
          <div className={s.rightPart}>

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

            <Pagination pageCountTotal={pageCountTotal} setProducts={setProducts} products={products}
                        allFilters={allFilters} />
          </div>

          <div className={s.cardsWrapper}></div>
        </div>

      </div>
  );
};

export default CategoryBlock;