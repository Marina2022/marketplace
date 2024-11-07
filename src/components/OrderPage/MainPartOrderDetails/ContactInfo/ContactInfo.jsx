import s from './ContactInfo.module.scss';
import buyerIcon from '@/assets/img/orderPage/buyerIcon.svg'
import paymentMethodIcon from '@/assets/img/orderPage/payMethod.svg'

const ContactInfo = ({order, mobile = false}) => {
  return (
    <div className={mobile ? s.contactInfoWrapperMobileVisible : s.contactInfoWrapper}>
      {
        mobile && (
          <>
            <h2 className={s.contactInfoTitle}>Информация о заказе</h2>
            <div className={s.rowsWrapperNumber}>
              <img className={s.icon} src={paymentMethodIcon} alt="icon"/>
              <div className={s.rowPayMethod}>
                <div className={s.label}>Заказ:</div>
                <div className={s.value}>№{order.orderNumber}</div>
              </div>
            </div>
          </>
        )
      }
      <h2 className={s.contactInfoTitle}>Контактная информация</h2>
      <div className={s.rowsWrapper}>
        <img className={s.icon} src={buyerIcon} alt="icon"/>
        <div className={s.twoRows}>
          <div className={s.row}>
            <div className={s.label}>Покупатель</div>
            <div className={s.value}>{order.customer}</div>
          </div>
          <div className={s.row}>
            <div className={s.label}>Получатель</div>
            <div className={s.value}>{order.recipient}</div>
          </div>
        </div>
      </div>
      <h2 className={s.contactInfoTitleSecond}>Информация об оплате</h2>
      <div className={s.rowsWrapper}>
        <img className={s.icon} src={paymentMethodIcon} alt="icon"/>
        <div className={s.rowPayMethod}>
          <div className={s.label}>Способ оплаты:</div>
          <div className={s.value}>{order.paymentMethod}</div>
        </div>
      </div>
      {
        mobile && (
          <div className={s.additionalPart}>
            <div className={s.topBlock}>
              <div className={s.wrapper}>
                <span>Товары:</span>
                <span className={s.value}>{order.totalProductCount}</span>
              </div>
              <div className={s.wrapper}>
                <span>Доставка:</span>
                <span className={s.value}>{order.deliveryPrice.toLocaleString('ru')}&nbsp;₽</span>
              </div>
              <div className={s.total}>
                <div className={s.sumLabel}>Итого:</div>
                <div className={s.sumValue}>{order.orderTotalPrice.toLocaleString('ru')}&nbsp;₽</div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ContactInfo;