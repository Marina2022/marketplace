import s from './BrowserPanel.module.scss';
import defaultImg from '@/assets/img/defaultImg.png';

const BrowserPanel = ({data}) => {

  console.log('data = ', data)

  return (
    <ul className={`${s.list} lk-scroll`}>
      {
        data.map(item => <li className={s.item} key={item.productId}>
            <div className={s.product}>
              <div>
                {
                  item.pictureUrl ? <img className={s.img} src={item.productImg} alt=""/> :
                    <img className={s.img} src={defaultImg} alt="picture"/>
                }
              </div>

              <div className={s.desc}>
                <div className={s.name}>{item.productName}</div>
                <div className={s.sku}>
                  <span>Артикул: {item.sku}</span>

                  <svg style={{fill: item.isLiked ? "#E32636" : "#AAB7BF"}} width="13" height="12" viewBox="0 0 13 12"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.09145 0.705091C5.38183 -0.234586 6.71192 -0.234584 7.0023 0.705093L7.71764 3.01998C7.84712 3.43899 8.2345 3.72474 8.67306 3.72474H11.0906C12.0471 3.72474 12.4578 4.93872 11.6976 5.51939L9.65691 7.07838C9.32388 7.33279 9.18481 7.76787 9.30855 8.16827L10.0674 10.6241C10.3549 11.5543 9.27864 12.305 8.50496 11.714L6.65394 10.2999C6.29554 10.0262 5.79821 10.0262 5.43981 10.2999L3.58879 11.714C2.81511 12.305 1.73886 11.5543 2.02631 10.6241L2.7852 8.16827C2.90894 7.76787 2.76987 7.33279 2.43684 7.07838L0.396109 5.51939C-0.364005 4.93872 0.046636 3.72474 1.00317 3.72474H3.42069C3.85925 3.72474 4.24663 3.43899 4.37611 3.01998L5.09145 0.705091Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

          {
            item.chat === true && <div className={s.chat}>Чат по заказу</div>
          }


          </li>
        )
      }

    </ul>
  );
};

export default BrowserPanel;