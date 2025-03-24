import s from "./PriceInputs.module.scss";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import Input from "@/components/ui/Input/Input.jsx";

const PriceInputs = ({register, errors, trigger, getValues, setValue}) => {
  return (
    <div>
      <h3 className={s.title}>Цена товара</h3>

      <div className={s.inputsWrapper}>

        <div className={s.inputWrapper}>
          <Input
            isError={errors.price}
            trigger={trigger}
            getValues={getValues}
            required={true}
            setValue={setValue}
            placeholder="Основная цена"
            {...register('price',
              {
                required: notEmptyMessage,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Можно вводить только цифры'
                }
              })}
          />
          {
            errors.price && <p className={s.errorMessage}>{errors.price.message}</p>
          }
        </div>

        <div className={s.inputWrapper}>
          <Input
            isError={errors.regularPrice}
            trigger={trigger}
            getValues={getValues}
            required={false}
            setValue={setValue}
            placeholder="Цена до скидки"
            {...register('regularPrice',
              {                
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Можно вводить только цифры'
                }
              })}
          />
          {
            errors.regularPrice && <p className={s.errorMessage}>{errors.regularPrice.message}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default PriceInputs;