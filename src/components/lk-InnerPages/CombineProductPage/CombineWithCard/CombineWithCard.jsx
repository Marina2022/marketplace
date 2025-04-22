import s from './CombineWithCard.module.scss';
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import Button from "@/components/ui/Button/Button.jsx";
import CombineCardLeft
  from "@/components/lk-InnerPages/CombineProductPage/CombineWithCard/CombineCardLeft/CombineCardLeft.jsx";
import CombineCardRight
  from "@/components/lk-InnerPages/CombineProductPage/CombineWithCard/CombineCardRight/CombineCardRight.jsx";
import CombineSingleLeft
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/CombineSingleLeft.jsx";
import CombineSingleRight
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleRight/CombineSingleRight.jsx";


const CombineWithCard = ({checkedProducts, setCheckedProducts}) => {

  const profileId = useSelector(getActiveProfileId)

  const [mergeData, setMergeData] = useState(null)
  const [attributes, setAttributes] = useState(null)

  const navigate = useNavigate()

  const [isCombinable, setIsCombinable] = useState(false)
  const [sending, setSending] = useState(false)

  const getData = async () => {
    try {
      const resp1 = await axiosInstance.post(`/seller/${profileId}/products/group-merge-details`, checkedProducts)
      setMergeData(resp1.data)

      const resp2 = await axiosInstance(`/seller/${profileId}/categories/${resp1.data.linkedProductsToCard[0].groupedProducts[0].productCategoryId}/product-variation-data`)
      setAttributes(resp2.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [checkedProducts]);

 
  // // делает кнопку активной
  useEffect(() => {
    if (mergeData) {
      
      const allProductsToMergeAreOK = mergeData.productsToMerge.every(product => {
        return product.mergeStatus === 'Готов к объеденению'
      })      
      setIsCombinable(allProductsToMergeAreOK && mergeData.linkedProductsToCard[0].mergeStatus === 'Готов к объединению' )
    }
  }, [mergeData])

  // Обработчик на кнопку Объединить
  const handleCombine = async () => {

    let payload = checkedProducts.map(product => ({
      productVariantId: product,
      isCardProduct: false
    }))

    console.log('mergeData.linkedProductsToCard', mergeData.linkedProductsToCard)
    
    let mainProductId = ''

    mergeData.linkedProductsToCard[0].groupedProducts.forEach(product=>{
      
      if (product.isDefault) {
        mainProductId = product.productVariantId 
        return 
      }      
    })
    
    payload = [...payload, {
      productVariantId: mainProductId,
      isCardProduct: true
    }]

            
    try {
      setSending(true)
      await axiosInstance.post(`seller/${profileId}/products/link`, payload)
      navigate("/lk/shop")
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  if (!attributes) return null

  return (
    <div className={s.combineWithCardProductsWrapper}>
      <div className={s.combineProductsHeader}>
        <h1 className={s.title}>Объединение товаров</h1>
        <Button disabled={!isCombinable || sending} onClick={handleCombine} className={s.combineBtn}>Объединить в
          карточку </Button>
      </div>

      <h2 className={s.subtitle}>Товары в карточке</h2>
      <p className={s.desc}>Эти товары уже объединены в одну карточку. Они отображаются как варианты основного
        товара.</p>

      <div className={s.tableWrapper}>
        <CombineCardLeft productsInCard={mergeData.linkedProductsToCard[0].groupedProducts} attributes={attributes}  />
       
        <CombineCardRight mergeStatus={mergeData.linkedProductsToCard[0].mergeStatus} />       
      </div>

      <div className={s.productsToCombineWrapper}>
        <h2 className={s.subtitle}>Товары для объединения</h2>
        <p className={s.desc}>Выберите товары, которые хотите присоединить. Убедитесь, что бренд и тип совпадают, и хотя
          бы одна вариативная характеристика у товаров отличается.</p>

        <div className={s.tableWrapper}>
          <CombineSingleLeft
            productsToMerge={mergeData.productsToMerge}
            attributes={attributes}
            getData={getData}
            combineWithCardVariant={true}
          />

          <CombineSingleRight
            setCheckedProducts={setCheckedProducts}
            checkedProducts={checkedProducts}
            productsToMerge={mergeData.productsToMerge}
          />
        </div>
      </div>
    </div>
  );
};

export default CombineWithCard;