import s from './ContentLeftRow.module.scss';
import LinkedProductsLeft
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftRow/LinkedProductsLeft/LinkedProductsLeft.jsx";

const ContentLeftRow = ({
                          product,
                          checkedProducts,
                          setCheckedProducts,
                          collapsedProducts,
                          setCollapsedProducts,
                          handleMouseIn,
                          handleMouseOut,
                          hoveredProducts
                        }) => {

  const hasLinked = product.linkedProducts?.length > 0

  //  потом брать нужно из внешнего стейта (сравнивать с массивом чекнутых карточек)
  const checked = checkedProducts.includes(product.productVariantId)
  const collapsed = collapsedProducts.includes(product.productVariantId)
  const hovered = hoveredProducts.includes(product.productVariantId)

  const handleCheck = () => {
    const tempCheckedProducts = [...checkedProducts]
    if (tempCheckedProducts.includes(product.productVariantId)) {
      setCheckedProducts(tempCheckedProducts.filter(item => item !== product.productVariantId))
    } else {
      tempCheckedProducts.push(product.productVariantId)
      setCheckedProducts(tempCheckedProducts)
    }
  }

  const handleCollapse = () => {
    const tempCollapsedProducts = [...collapsedProducts]

    if (tempCollapsedProducts.includes(product.productVariantId)) {
      setCollapsedProducts(tempCollapsedProducts.filter(item => item !== product.productVariantId))
    } else {
      tempCollapsedProducts.push(product.productVariantId)
      setCollapsedProducts(tempCollapsedProducts)
    }
  }

  return (

    <div className={s.leftRowWrapper}>
      <div
        className={`${s.leftRow} ${hovered ? s.hovered : ''}`}
        onMouseOver={() => handleMouseIn(product.productVariantId)}
        onMouseOut={() => handleMouseOut(product.productVariantId)}
      >
        <div className={s.photoAndCheck} onClick={handleCheck}>
          {
            checked ? (
                <svg className={s.checkedSvg} width="16" height="17" viewBox="0 0 16 17" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="16" height="16" fill="#E32636"/>
                  <path
                    d="M6.5775 12.1675C6.3775 12.1675 6.1875 12.0875 6.0475 11.9475L3.2175 9.1175C2.9275 8.8275 2.9275 8.3475 3.2175 8.0575C3.5075 7.7675 3.9875 7.7675 4.2775 8.0575L6.5775 10.3575L11.7175 5.2175C12.0075 4.9275 12.4875 4.9275 12.7775 5.2175C13.0675 5.5075 13.0675 5.9875 12.7775 6.2775L7.1075 11.9475C6.9675 12.0875 6.7775 12.1675 6.5775 12.1675Z"
                    fill="white"/>
                </svg>
              )
              : <div className={s.check}></div>
          }
          <img className={s.photo} src={product.productImgPath} alt="photo"/>
        </div>

        <div className={s.rightPartOfLeftColumn}>
          <div className={s.article}>{product.article}</div>
          {
            hasLinked && <div className={s.unitedBlock} onClick={handleCollapse}>
              <div className={s.unitedText}>Объединено ({product.linkedProducts.length})</div>
              <svg className={collapsed ? s.collapseIconReversed : s.collapseIcon} width="16" height="16"
                   viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.00292 4.79995C8.46958 4.79995 8.93625 4.97995 9.28958 5.33328L13.6362 9.67995C13.8296 9.87328 13.8296 10.1933 13.6362 10.3866C13.4429 10.5799 13.1229 10.5799 12.9296 10.3866L8.58292 6.03995C8.26292 5.71995 7.74292 5.71995 7.42292 6.03995L3.07625 10.3866C2.88292 10.5799 2.56292 10.5799 2.36958 10.3866C2.17625 10.1933 2.17625 9.87328 2.36958 9.67995L6.71625 5.33328C7.06958 4.97995 7.53625 4.79995 8.00292 4.79995Z"
                  fill="#658092"/>
              </svg>
            </div>
          }
        </div>
      </div>
      {
        hasLinked && !collapsed && <LinkedProductsLeft
          linkedProducts={product.linkedProducts}
          handleMouseOut={handleMouseOut}
          handleMouseIn={handleMouseIn}
          hoveredProducts={hoveredProducts}
        />
        
      }
    </div>

  );
};

export default ContentLeftRow;