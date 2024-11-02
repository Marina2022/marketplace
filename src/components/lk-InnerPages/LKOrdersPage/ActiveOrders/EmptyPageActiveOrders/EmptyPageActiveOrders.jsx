import s from './EmptyPageActiveOrders.module.scss';

const EmptyPageActiveOrders = () => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Здесь пусто :(</h2>
      <p className={s.text}>В настоящий момент у вас нет активных заказов!</p>
    </div>
  );
};

export default EmptyPageActiveOrders;