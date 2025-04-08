import s from './ContentLeft.module.scss';
import ContentLeftHeader
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftHeader/ContentLeftHeader.jsx";

const ContentLeft = () => {
    
  return (
    <div className={s.contentLeft}>
      <ContentLeftHeader />
      
    
    </div>
  );
};

export default ContentLeft;