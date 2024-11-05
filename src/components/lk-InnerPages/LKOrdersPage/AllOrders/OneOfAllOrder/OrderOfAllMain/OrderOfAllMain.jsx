import s from './OrderOfAllMain.module.scss';
import btnClosed from '@/assets/img/cart/dropdown.svg'
import btnOpened from '@/assets/img/cart/dropdownOpen.svg'
import {getStringFromISO} from "@/utils/fromISO.js";
import {BASE_URL} from "@/consts/baseURL.js";
import {getProductQuantityString} from "@/utils/cart.js";
import {useNavigate} from "react-router-dom";

const OrderOfAllMain = ({order, productListIsOpen, setProductListIsOpen}) => {
  const handleToggleBtnClick = (e) => {
    e.stopPropagation()
    setProductListIsOpen(prev => !prev)
  }
  const handleRepeatBtnClick = (e) => {
    e.stopPropagation()
  }
  const handleDownloadClick = (e) => {
    e.stopPropagation()
  }

  const navigate = useNavigate()
  const handleOrderClick = () => {
    navigate(`/lk/orders/${order.orderId}`)
  }

  return (
    <div className={s.oneOrderOfAllWrapper} onClick={handleOrderClick}>
      <div className={s.orderInfo}>
        <p className={s.orderNumber}>Заказ №{order.orderNumber}</p>
        <p className={s.orderDate}>от {getStringFromISO(order.orderDate)}</p>
      </div>

      <div className={s.price}>
        <span className={s.priceLabel}>сумма</span>
        <span>{order.orderPrice.toLocaleString('ru')}&nbsp;₽</span>
      </div>

      <div className={s.pictures}>
        <ul className={s.picturesList}>
          {
            order.productImages.map((img, i) => {
              return <li key={i}>
                <img className={s.productImg} src={`${BASE_URL}${img.productImageUrl}`} alt={`image-${i}`}/>
              </li>
            })
          }
        </ul>
        {
          order.additionalProductCount !== 0 &&
          <p className={s.moreProducts}>еще {getProductQuantityString(order.additionalProductCount)}</p>
        }
      </div>

      <button onClick={handleToggleBtnClick} className={s.toggleBtn}>
        <img src={productListIsOpen ? btnOpened : btnClosed} alt=""/>
      </button>
      <div className={s.additional}>
        <div className={order.orderStatus === "canceled" ? s.redStatus : s.blueStatus}>{order.orderStatusDisplay}</div>
        <button className={s.repeat} onClick={handleRepeatBtnClick}>
          <svg width="20" height="21" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.5278 10.5C16.5279 9.05404 16.0267 7.65276 15.1094 6.53493C14.1922 5.41711 12.9158 4.6519 11.4976 4.3697C10.0794 4.0875 8.60726 4.30576 7.33198 4.9873C6.05669 5.66884 5.05717 6.77148 4.50373 8.10735C3.95029 9.44322 3.87716 10.9297 4.29682 12.3134C4.71647 13.6971 5.60294 14.8926 6.80517 15.696C8.00741 16.4994 9.45103 16.8611 10.8901 16.7195C12.3291 16.5778 13.6745 15.9416 14.697 14.9192C14.7354 14.8794 14.7814 14.8476 14.8322 14.8258C14.8831 14.804 14.9377 14.7925 14.9931 14.792C15.0484 14.7915 15.1033 14.8021 15.1545 14.823C15.2057 14.844 15.2522 14.8749 15.2913 14.914C15.3304 14.9531 15.3614 14.9997 15.3823 15.0509C15.4033 15.1021 15.4138 15.1569 15.4133 15.2123C15.4129 15.2676 15.4014 15.3223 15.3795 15.3731C15.3577 15.4239 15.3259 15.4699 15.2861 15.5084C14.1271 16.6669 12.6022 17.3876 10.9713 17.5479C9.3404 17.7081 7.70438 17.2979 6.34201 16.3872C4.97964 15.4764 3.97521 14.1215 3.49985 12.5532C3.0245 10.9848 3.10764 9.30024 3.73511 7.78637C4.36257 6.27249 5.49554 5.02301 6.94097 4.25082C8.3864 3.47864 10.0549 3.23152 11.6621 3.55158C13.2693 3.87164 14.7158 4.73907 15.7551 6.00607C16.7945 7.27307 17.3623 8.86126 17.362 10.5H18.2686C18.3016 10.5 18.3338 10.5097 18.3612 10.528C18.3886 10.5462 18.41 10.5722 18.4226 10.6026C18.4353 10.633 18.4387 10.6665 18.4323 10.6988C18.426 10.7311 18.4102 10.7608 18.387 10.7842L17.1203 12.05C17.0891 12.0811 17.0468 12.0985 17.0028 12.0985C16.9588 12.0985 16.9165 12.0811 16.8853 12.05L15.6203 10.7834C15.5971 10.76 15.5813 10.7303 15.575 10.698C15.5686 10.6657 15.572 10.6322 15.5847 10.6018C15.5973 10.5714 15.6187 10.5454 15.6461 10.5271C15.6735 10.5089 15.7057 10.4992 15.7386 10.4992H16.527L16.5278 10.5Z"
            />
          </svg>
          <span>Повторить</span>
        </button>

        {
          order.orderStatus !== "canceled" && (
            <div className={s.docs}>
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8333 11.9107L13.4554 9.2887C13.6181 9.12599 13.8819 9.12599 14.0446 9.2887C14.2073 9.45142 14.2073 9.71524 14.0446 9.87796L10.7113 13.2113C10.5486 13.374 10.2848 13.374 10.122 13.2113L6.7887 9.87796C6.62599 9.71524 6.62599 9.45142 6.7887 9.2887C6.95142 9.12599 7.21524 9.12599 7.37796 9.2887L10 11.9107V2.91667C10 2.68655 10.1865 2.5 10.4167 2.5C10.6468 2.5 10.8333 2.68655 10.8333 2.91667V11.9107ZM16.6667 12.9167C16.6667 12.6865 16.8532 12.5 17.0833 12.5C17.3135 12.5 17.5 12.6865 17.5 12.9167V15.4167C17.5 16.5673 16.5673 17.5 15.4167 17.5H5.41667C4.26607 17.5 3.33333 16.5673 3.33333 15.4167V12.9167C3.33333 12.6865 3.51988 12.5 3.75 12.5C3.98012 12.5 4.16667 12.6865 4.16667 12.9167V15.4167C4.16667 16.107 4.72631 16.6667 5.41667 16.6667H15.4167C16.107 16.6667 16.6667 16.107 16.6667 15.4167V12.9167Z"
                />
              </svg>
              <a onClick={handleDownloadClick} download target="_blank"
                 href={`${BASE_URL}${order.orderBilsLink.slice(1)}`}>Документы по заказу</a>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default OrderOfAllMain;