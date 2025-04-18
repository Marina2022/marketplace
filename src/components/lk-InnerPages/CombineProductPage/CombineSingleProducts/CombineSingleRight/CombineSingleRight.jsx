import s from './CombineSingleRight.module.scss';
import SingleMergeStatus
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleRight/SingleMergeStatus/SingleMergeStatus.jsx";

const CombineSingleRight = ({setCheckedProducts, productsToMerge, checkedProducts}) => {

  const handleDelete = (id) => {

     

    setCheckedProducts(checkedProducts.filter(productVariantId => productVariantId !== id))
  }

  return (
    <div className={s.combineSingleRight}>
      <div className={s.rightHeader}>Статус</div>
      {
        productsToMerge.map(product => <div className={s.row} key={product.productVariantId}>

          <div className={s.flexWrapper}>
            <SingleMergeStatus status={product.mergeStatus}/>
            <button disabled={checkedProducts.length <= 2} onClick={() => handleDelete(product.productVariantId)}>
              <svg className={checkedProducts.length <= 2 ? s.binIconDisabled : s.binIcon} width="16" height="16" viewBox="0 0 16 16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0024 4.48669C13.9891 4.48669 13.9691 4.48669 13.9491 4.48669C10.4224 4.13336 6.90238 4.00002 3.41572 4.35336L2.05572 4.48669C1.77572 4.51336 1.52905 4.31336 1.50239 4.03336C1.47572 3.75336 1.67572 3.51336 1.94905 3.48669L3.30905 3.35336C6.85572 2.99336 10.4491 3.13336 14.0491 3.48669C14.3224 3.51336 14.5224 3.76002 14.4957 4.03336C14.4757 4.29336 14.2557 4.48669 14.0024 4.48669Z"
                />
                <path
                  d="M5.66456 3.81337C5.63789 3.81337 5.61122 3.81337 5.57789 3.80671C5.31122 3.76004 5.12456 3.50004 5.17122 3.23337L5.31789 2.36004C5.42456 1.72004 5.57122 0.833374 7.12456 0.833374H8.87122C10.4312 0.833374 10.5779 1.75337 10.6779 2.36671L10.8246 3.23337C10.8712 3.50671 10.6846 3.76671 10.4179 3.80671C10.1446 3.85337 9.88456 3.66671 9.84456 3.40004L9.69789 2.53337C9.60456 1.95337 9.58456 1.84004 8.87789 1.84004H7.13122C6.42456 1.84004 6.41122 1.93337 6.31122 2.52671L6.15789 3.39337C6.11789 3.64004 5.90456 3.81337 5.66456 3.81337Z"
                />
                <path
                  d="M10.1377 15.1667H5.85765C3.53099 15.1667 3.43765 13.88 3.36432 12.84L2.93099 6.12672C2.91099 5.85338 3.12432 5.61338 3.39765 5.59338C3.67765 5.58005 3.91099 5.78672 3.93099 6.06005L4.36432 12.7734C4.43765 13.7867 4.46432 14.1667 5.85765 14.1667H10.1377C11.5377 14.1667 11.5643 13.7867 11.631 12.7734L12.0643 6.06005C12.0843 5.78672 12.3243 5.58005 12.5977 5.59338C12.871 5.61338 13.0843 5.84672 13.0643 6.12672L12.631 12.84C12.5577 13.88 12.4643 15.1667 10.1377 15.1667Z"
                />
                <path
                  d="M9.10281 11.5H6.88281C6.60948 11.5 6.38281 11.2733 6.38281 11C6.38281 10.7267 6.60948 10.5 6.88281 10.5H9.10281C9.37615 10.5 9.60281 10.7267 9.60281 11C9.60281 11.2733 9.37615 11.5 9.10281 11.5Z"
                />
                <path
                  d="M9.66927 8.83337H6.33594C6.0626 8.83337 5.83594 8.60671 5.83594 8.33337C5.83594 8.06004 6.0626 7.83337 6.33594 7.83337H9.66927C9.9426 7.83337 10.1693 8.06004 10.1693 8.33337C10.1693 8.60671 9.9426 8.83337 9.66927 8.83337Z"
                />
              </svg>
            </button>
          </div>


        </div>)
      }

    </div>
  );
};

export default CombineSingleRight;