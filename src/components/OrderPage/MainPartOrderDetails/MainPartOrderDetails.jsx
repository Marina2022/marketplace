import s from './MainPartOrderDetails.module.scss';
import {Link} from "react-router-dom";
import ContactInfo from "@/components/OrderPage/MainPartOrderDetails/ContactInfo/ContactInfo.jsx";
import {useState} from "react";
import OrderLine from "@/components/OrderPage/MainPartOrderDetails/OrderLine/OrderLine.jsx";
import MobileButtons from "@/components/OrderPage/MainPartOrderDetails/MobileButtons/MobileButtons.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import AdditionalMobile from "@/components/OrderPage/MainPartOrderDetails/AdditionalMobile/AdditionalMobile.jsx";

const MainPartOrderDetails = ({order}) => {

  const isMobile = useMobileScreen()
  const [additionalMobileOpened, setAdditionalMobileOpened] = useState(false)
  
  return (
    <>
      {
        additionalMobileOpened && isMobile && <AdditionalMobile order={order} setAdditionalMobileOpened={setAdditionalMobileOpened} /> 
      }
      {
        (!isMobile || !additionalMobileOpened) &&  (

          <div className={s.mainPart}>
            <div className={s.headerPart}>
              <Link to='/lk/orders' className={s.link}>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10L1 5.5L5 1" stroke="#658092"/>
                </svg>
                <span className={s.linkText}>Назад к истории заказов</span>
              </Link>
              <h1 className={s.headline}>Заказ №{order.orderNumber}</h1>
            </div>
            {
              isMobile && <MobileButtons order={order} setAdditionalMobileOpened={setAdditionalMobileOpened}/>
            }
            <ContactInfo order={order}/>
            
            {
              order.orderLines.map((orderLine, i) => <OrderLine key={i} orderLine={orderLine}/>)
            }
          </div>
        )
      }
    </>
  );
};

export default MainPartOrderDetails;