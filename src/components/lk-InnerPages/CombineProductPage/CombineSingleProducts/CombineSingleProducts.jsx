import s from './CombineSingleProducts.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import Button from "@/components/ui/Button/Button.jsx";
import CombineSingleLeft
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/CombineSingleLeft.jsx";
import CombineSingleRight
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleRight/CombineSingleRight.jsx";

const CombineSingleProducts = ({checkedProducts, setCheckedProducts}) => {

  const profileId = useSelector(getActiveProfileId)

  const [productsToMerge, setProductsToMerge] = useState(null)
  const [attributes, setAttributes] = useState(null)

  console.log('productsToMerge', productsToMerge)
  console.log('attributes', attributes)

  useEffect(() => {

    const getData = async () => {
      try {
        const resp1 = await axiosInstance.post(`/seller/${profileId}/products/single-merge-details`, checkedProducts)
        setProductsToMerge(resp1.data)
        const resp2 = await axiosInstance(`/seller/${profileId}/categories/${resp1.data[0].productCategoryId}/product-variation-data`)
        setAttributes(resp2.data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()

  }, [checkedProducts]);

  if (!attributes) return null

  return (
    <div className={s.combineSingleProductsWrapper}>
      <div className={s.combineProductsHeader}>
        <h1 className={s.title}>Объединение товаров</h1>
        <Button className={s.combineBtn}>Объединить в карточку</Button>
      </div>

      <div className={s.tableWrapper}>
        <CombineSingleLeft productsToMerge={productsToMerge} attributes={attributes} />
        
        <CombineSingleRight setCheckedProducts={setCheckedProducts} productsToMerge={productsToMerge} />
      </div>
    </div>
  );
};

export default CombineSingleProducts;