import s from './NoProducts.module.scss';

const NoProducts = ({noCompany=false, shopRegistered=false}) => {
  return (         
    <div className={s.noProducts}>

      {
        !noCompany && !shopRegistered && <span>Нет активных товаров</span>
      }

      {
        noCompany && <div className={s.textWrapper}>
          <div>Вам недоступна продажа товаров</div>
        <p className={s.text}>Чтобы начать продавать в IRIF, добавьте вашу компанию и зарегистрируйте магазин. Это просто и откроет новые возможности для вашего бизнеса!</p>
        </div>

      }

    </div>
  );
};

export default NoProducts;