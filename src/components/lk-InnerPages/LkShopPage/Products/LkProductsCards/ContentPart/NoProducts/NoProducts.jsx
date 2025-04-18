import s from './NoProducts.module.scss';

const NoProducts = ({noCompany=false, noShop=false}) => {
  return (         
    <div className={s.noProducts}>

      {
        !noCompany && !noShop && <span>Нет активных товаров</span>
      }

      {
        noCompany && <div className={s.textWrapper}>
          <div>Вам недоступна продажа товаров</div>
        <p className={s.text}>Чтобы начать продавать в IRIF, добавьте вашу компанию и зарегистрируйте магазин. Это просто и откроет новые возможности для вашего бизнеса!</p>
        </div>
      }
      
      {
        noShop && <div className={s.textWrapper}>
          <div>Магазин не зарегистрирован</div>
          <p className={s.text}>Чтобы добавить товары и начать продавать, зарегистрируйте магазин в IRif. Это ваш первый шаг к новым возможностям!</p>
        </div>
      }

    </div>
  );
};

export default NoProducts;