import CurrentPageLessThanFive
  from "@/components/CategoryBlock/Pagination/CurrentPageLessThanFive/CurrentPageLessThanFive.jsx";
import CurrentPageMoreThanFive
  from "@/components/CategoryBlock/Pagination/CurrentPageMoreThanFive/CurrentPageMoreThanFive.jsx";
import {useSearchParams} from "react-router-dom";
import CurrentCloseToTotal from "@/components/CategoryBlock/Pagination/CurrentCloseToTotal/CurrentCloseToTotal.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobilePagination from "@/components/CategoryBlock/Pagination/MobilePagination/MobilePagination.jsx";

const Pagination = ({pageCountTotal, setProducts, products, allFilters}) => {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
  const isMobile = useMobileScreen()
  let showFurther = pageCountTotal >= 9
  if (isMobile) return <MobilePagination 
      setProducts={setProducts} 
      products={products} 
      allFilters={allFilters}            
      pageCountTotal={pageCountTotal}/>
  if (currentPage < 5 || !showFurther) return <CurrentPageLessThanFive pageCountTotal={pageCountTotal}/>
  if ((pageCountTotal - currentPage) <= 2 && showFurther) return <CurrentCloseToTotal pageCountTotal={pageCountTotal}/>
  if (currentPage >= 5 || showFurther) return <CurrentPageMoreThanFive pageCountTotal={pageCountTotal}/>
};

export default Pagination;