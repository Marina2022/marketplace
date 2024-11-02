import s from './EmptyPageAllOrders.module.scss';

const EmptyPageAllOrders = () => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Здесь пусто :(</h2>
      <p className={s.text}>В настоящий момент у вас еще не было заказов!</p>      
    </div>
  );
};

export default EmptyPageAllOrders;