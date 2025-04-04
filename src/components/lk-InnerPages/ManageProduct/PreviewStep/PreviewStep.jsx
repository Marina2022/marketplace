import s from './PreviewStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {findCategoryPath} from "@/utils/lkShop.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const PreviewStep = ({setStep, attributes, getValues, cats, sending}) => {

  const categoryString = findCategoryPath(getValues('productCategoryId'), cats)
  

  //показывать ли заголовок для характеристик:  
  const arrOfValues = attributes.categorySpecificFields.characteristics.map(characteristic => getValues('char_' + characteristic.name))
  const someValuesAreFilledOut = arrOfValues.some(value => value !== undefined);
  
  return (
    <div className={s.preview}>
      <h2 className={s.title}>{getValues('productName')}</h2>
      <div className={s.productInfo}>
        <h3 className={s.subtitle}>Информация о товаре</h3>

        <div className={s.catRow}>
          <div className={s.catLabel}>Категория товара</div>
          <div className={s.catValue}>{categoryString}</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Цена товара</div>
          <div className={s.value}>{getValues('price') && Number(getValues('price')).toLocaleString('ru-RU')} ₽</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Артикул</div>
          <div className={s.value}>{getValues('article')}</div>
        </div>


        <div className={s.row}>
          <div className={s.label}>Длина Ширина Высота, мм</div>
          {
            getValues('length') && getValues('width') && getValues('height') && (
              <div className={s.value}>
                {getValues('length')}&#8203;х{getValues('width')}&#8203;х{getValues('height')}
              </div>
            )
          }
        </div>

        <div className={s.row}>
          <div className={s.label}>Вес с упаковкой, г</div>
          <div className={s.value}>{getValues('weight')}</div>
        </div>

             {
          getValues('guaranteePeriod') && (
            <div className={s.row}>
              <div className={s.label}>Гарантийный срок, г</div>
              <div className={s.value}>{getValues('guaranteePeriod')}</div>
            </div>
          )
        }

        {
          getValues('serviceLife') && (
            <div className={s.row}>
              <div className={s.label}>Срок годности, г</div>
              <div className={s.value}>{getValues('serviceLife')}</div>
            </div>
          )
        }
      </div>

      <div className={s.chars}>
        
        {
          someValuesAreFilledOut && (
            <h3 className={s.subtitle}>Характеристики</h3>
          )
        }


        {
          attributes.categorySpecificFields.characteristics.map(characteristic => {
            return (
              getValues('char_' + characteristic.name) && <div key={characteristic.name} className={s.row}>
                <div className={s.label}>{characteristic.label}</div>
                <div className={s.value}>{getValues('char_' + characteristic.name).value}</div>
              </div>
            )
          })

        }

      </div>

      <div className={s.buttons}>
        <Button className={s.backButton} type="button" onClick={() => setStep('media')}>Назад</Button>
        <Button disabled={sending} className={s.submitBtn} type="submit">{sending ? <MiniSpinner /> : 'Отправить на модерацию' } </Button>
      </div>

    </div>
  );
};

export default PreviewStep;