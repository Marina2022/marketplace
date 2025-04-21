import s from './CombineCardRight.module.scss';
import SingleMergeStatus
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleRight/SingleMergeStatus/SingleMergeStatus.jsx";

const CombineCardRight = ({productsInCard}) => {

  return (
    <div className={s.combineSingleRight}>
      <div className={s.rightHeader}>Статус</div>
      <div className={s.row}>
        <SingleMergeStatus status={productsInCard[0].mergeStatus}/>
      </div>
    </div>
  );
};

export default CombineCardRight;