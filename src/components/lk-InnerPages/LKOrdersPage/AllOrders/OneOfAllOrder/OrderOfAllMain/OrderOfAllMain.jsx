import s from './OrderOfAllMain.module.scss';
import btnClosed from '@/assets/img/cart/dropdown.svg'
import btnOpened from '@/assets/img/cart/dropdownOpen.svg'
const OrderOfAllMain = ({order, productListIsOpen, setProductListIsOpen}) => {
  return (
    <div className={s.oneOrderOfAllWrapper}>
      <div className={s.orderInfo}>orderInfo</div>
      <div className={s.price}>price</div>
      
      <ul className={s.pictures}>pictures</ul>

      <button onClick={()=>setProductListIsOpen(prev=>!prev)} className={s.toggleBtn}>
        <img src={productListIsOpen ? btnOpened : btnClosed} alt=""/>        
      </button>
      <div className={s.additional}>
        <div className={s.status}>Заказ доставлен</div>
        <div className={s.repeat}>Повторить</div>
        <div className={s.docs}>Документы</div>
        
      </div>

    </div>
  );
};

export default OrderOfAllMain;