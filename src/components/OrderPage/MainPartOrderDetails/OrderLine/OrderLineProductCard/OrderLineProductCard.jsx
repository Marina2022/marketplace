import s from './OrderLineProductCard.module.scss';

const OrderLineProductCard = ({product}) => {
  return (
    <div className={s.orderLineProductCardWrapper}>
      <img className={s.icon} src={deliveryMethodIcon} alt="delivery icon"/>
    </div>
  );
};

export default OrderLineProductCard;