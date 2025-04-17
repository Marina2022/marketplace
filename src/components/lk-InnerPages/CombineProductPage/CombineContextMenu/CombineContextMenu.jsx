import s from './CombineContextMenu.module.scss';
import {useRef, useState} from "react";
import characteristics from "@/components/ProductPage/DetailedInfo/tabsContent/Characteristics/Characteristics.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";

const CombineContextMenu = ({
                              position,
                              values,
                              currentValueLabel,
                              productToMerge,
                              setMenuOpen,
                              attributes,
                              currentAttribute = null,
                              forType = 'attribute',
                              getData
                            }) => {

  const innerContainerRef = useRef()

  const profileId = useSelector(getActiveProfileId)

  
     
  const handleSelectValue = async (e, selectedValue) => {
        

    e.stopPropagation()

    // brandId    
    let brandId = ''
    if (forType === 'brand') {
      brandId = selectedValue
    } else {
      brandId = attributes.brands.find(brand => brand.brandName === productToMerge.brand).brandId
    }

    // typeId    
    let typeId = ''
    if (forType === 'type') {
      typeId = selectedValue
    } else {
      typeId = attributes.productTypes.find(type => type.typeName === productToMerge.productType).typeId
    }

    let options = []

    productToMerge.variantCharacteristicsOptions.forEach(characteristic => {

      // currentAttribute - объект опции, для которой открывается меню (цвет, например)

      let optionValueId = characteristic.optionValueId
      if (currentAttribute && currentAttribute.optionId === characteristic.optionId) optionValueId = selectedValue

      const characteristicItem = {
        optionId: characteristic.optionId,
        optionValueId: optionValueId
      }
      options.push(characteristicItem)
    })

    const payload = {
      productVariantId: productToMerge.productVariantId,
      categoryId: productToMerge.productCategoryId,
      brandId: brandId,
      typeId: typeId,
      options: options
    }

    try {      
      await axiosInstance.post(`seller/${profileId}/products/update-variables`, payload)
      await getData()
    } catch (err) {
      console.log(err)
    } 
    setMenuOpen(false)
  }

  const [heightIsSmall, setHeightIsSmall] = useState(false)
  const handleListMount = (node) => {
    if (!node) return

    const height = node.getBoundingClientRect().height

    if (height > 190) {
      setHeightIsSmall(false)
    } else {
      setHeightIsSmall(true)
    }
  }

  if (!position) return null


  return (
    <div className={s.combineContextMenu} style={{top: position?.top - 20, left: position?.left + 26}}>
      <div ref={innerContainerRef}
           className={`${s.innerContainer} ${heightIsSmall ? s.innerContainerNoPadding : ''} lk-scroll`}>
        <ul className={s.list} ref={(node) => handleListMount(node)}>
          {
            values.map((valueItem, i) => {

              let valueItemId = valueItem.optionValueId
              if (forType === 'type') valueItemId = valueItem.typeId
              if (forType === 'brand') valueItemId = valueItem.brandId

              let valueItemName = valueItem.optionValue
              if (forType === 'type') valueItemName = valueItem.typeName
              if (forType === 'brand') valueItemName = valueItem.brandName


              return (

                <li
                  key={i}
                  className={`${s.valueItem} ${heightIsSmall ? s.valueItem100 : ''}`}
                  onClick={(e) => handleSelectValue(e, valueItemId)}>
                  {valueItemName}
                  {
                    valueItemName === currentValueLabel &&
                    <svg className={s.check} width="12" height="9" viewBox="0 0 12 9" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.5L5 7.5L11 0.5" stroke="#E32636" strokeWidth="1.5"/>
                    </svg>

                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default CombineContextMenu;