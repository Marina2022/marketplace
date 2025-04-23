import s from './AdditionalPart.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";

const AdditionalPart = ({order}) => {
  return (
    <div className={s.additionalPart}>
      <div className={s.topBlock}>
        <div className={s.wrapper}>
          <span>Товары</span>
          <span className={s.value}>{order.totalProductCount}</span>
        </div>
        <div className={s.wrapper}>
          <span>Доставка</span>
          <span className={s.value}>{order.deliveryPrice}</span>
        </div>
        <div className={s.total}>
          <div className={s.sumLabel}>Сумма</div>
          <div className={s.sumValue}>{order.orderTotalPrice}</div>
        </div>
      </div>
      <div className={s.bottomBlock}>
        {
          order.orderStatus === 'completed' &&
          // <a className={s.downloadLink} download href={`${BASE_URL}${order.orderDocs}`} target="_blank" >
          <a className={s.downloadLink} download href={order.orderDocs} target="_blank" >
            <svg className={s.downloadIcon} width="20" height="20" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8333 11.9107L13.4554 9.2887C13.6181 9.12599 13.8819 9.12599 14.0446 9.2887C14.2073 9.45142 14.2073 9.71524 14.0446 9.87796L10.7113 13.2113C10.5486 13.374 10.2848 13.374 10.122 13.2113L6.7887 9.87796C6.62599 9.71524 6.62599 9.45142 6.7887 9.2887C6.95142 9.12599 7.21524 9.12599 7.37796 9.2887L10 11.9107V2.91667C10 2.68655 10.1865 2.5 10.4167 2.5C10.6468 2.5 10.8333 2.68655 10.8333 2.91667V11.9107ZM16.6667 12.9167C16.6667 12.6865 16.8532 12.5 17.0833 12.5C17.3135 12.5 17.5 12.6865 17.5 12.9167V15.4167C17.5 16.5673 16.5673 17.5 15.4167 17.5H5.41667C4.26607 17.5 3.33333 16.5673 3.33333 15.4167V12.9167C3.33333 12.6865 3.51988 12.5 3.75 12.5C3.98012 12.5 4.16667 12.6865 4.16667 12.9167V15.4167C4.16667 16.107 4.72631 16.6667 5.41667 16.6667H15.4167C16.107 16.6667 16.6667 16.107 16.6667 15.4167V12.9167Z"
              />
            </svg>
            <span>Документы по заказу</span>
          </a>
        }
        <button className={s.repeatBtn}>Повторить заказ</button>
        {
          order.orderStatus === 'completed' && <button className={s.returnGoodsBtn}>Вернуть товары</button>
        }
        {
          (order.orderStatus === 'awaiting_payment' || order.orderStatus === 'pending' || order.orderStatus === 'preparing' ) &&  <button className={s.cancelOrderBtn}>Отменить заказ</button>
        }        
      </div>
    </div>
  );
};

export default AdditionalPart;