import s from './NewCharacteristicForm.module.scss';

const NewCharacteristicForm = () => {
  return (
    <div className={s.pageBlock}>
      <p className={s.text}>Заполните форму для добавления новой характеристики</p>
      <button className={s.btn}>Оставить заявку</button>
    </div>
  );
};

export default NewCharacteristicForm;