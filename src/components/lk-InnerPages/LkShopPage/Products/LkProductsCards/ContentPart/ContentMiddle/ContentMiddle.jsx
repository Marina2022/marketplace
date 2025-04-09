import s from './ContentMiddle.module.scss';
import ContentMiddleHeader
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddleHeader/ContentMiddleHeader.jsx";

const ContentMiddle = ({products}) => {
  return (

    <div className={`${s.contentMiddleWrapper} `}>
      <div className={s.contentMiddle}>
        <ContentMiddleHeader />
      </div>
    </div>
  );
};

export default ContentMiddle;