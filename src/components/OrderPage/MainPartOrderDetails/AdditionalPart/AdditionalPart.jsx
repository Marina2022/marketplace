import s from './AdditionalPart.module.scss';

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

      </div>

    </div>
  );
};

export default AdditionalPart;