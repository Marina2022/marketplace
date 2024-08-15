import s from './FavList.module.scss';
import ProductCard from "@/components/ProductCard/ProductCard.jsx";

const FavList = ({products, fullSize=false}) => {  

  return (
    <ul className={fullSize ? s.listFull : s.list}>
      {
        products.map((product, i) => {
            // manyProducts.map((product, i) => {  // для тестирование - много карточек
            return <ProductCard key={i} isBigScreen={false} product={product}/>
          }
        )
      }
    </ul>
  )

}

export default FavList;