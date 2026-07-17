import s from './Steps.module.scss';

const Steps = ({
                 title,
                 catId,
                 description,
                 tags,
                 initialPreview,
                 preview

               }) => {

  const step2Active = title && catId && description

  const step3Active = step2Active && (preview || initialPreview)
  const step4Active = step3Active && tags.length > 0

  return (
    <div className={s.steps}>

      <div className={`${s.step} ${s.stepActive}`}>
        <div className={s.stepNumber}>1</div>
        <div>Главное о заявке</div>
      </div>

      <div className={`${s.step} ${step2Active ? s.stepActive : ""}`}>
        <div className={s.stepNumber}>2</div>
        <div>Обложка заявки</div>
      </div>

      <div className={`${s.step} ${step3Active ? s.stepActive : ""}`}>
        <div className={s.stepNumber}>3</div>
        <div>Ключевые слова</div>
      </div>

      <div className={`${s.step} ${step4Active ? s.stepActive : ""}`}>
        <div className={s.stepNumber}>4</div>
        <div>Дополнительные файлы</div>
      </div>

    </div>
  );
};

export default Steps;