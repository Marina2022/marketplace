import s from "./DimensionsInputs.module.scss";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import Input from "@/components/ui/Input/Input.jsx";

const DimensionsInputs = ({register, errors, trigger, getValues, setValue}) => {
  return (
    <div>
      <h3 className={s.title}>Вес и габариты</h3>

      <div className={s.dimensionsWrapper}>
        <div className={s.inputsWrapper}>

          <div className={s.inputWrapper}>
            <Input
              isError={errors.weight}
              trigger={trigger}
              getValues={getValues}
              required={true}
              setValue={setValue}
              placeholder="Вес упаковки, г"
              {...register('weight',
                {
                  required: notEmptyMessage,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Можно вводить только цифры'
                  }
                })}
            />
            {
              errors.weight && <p className={s.errorMessage}>{errors.weight.message}</p>
            }
          </div>

          <div className={s.inputWrapper}>
            <Input
              isError={errors.length}
              trigger={trigger}
              getValues={getValues}
              required={true}
              setValue={setValue}
              placeholder="Длина упаковки, мм"
              {...register('length',
                {
                  required: notEmptyMessage,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Можно вводить только цифры'
                  }
                })}
            />
            {
              errors.length && <p className={s.errorMessage}>{errors.length.message}</p>
            }
          </div>


        </div>

        <div className={s.inputsWrapper}>


          <div className={s.inputWrapper}>
            <Input
              isError={errors.width}
              trigger={trigger}
              getValues={getValues}
              required={true}
              setValue={setValue}
              placeholder="Ширина упаковки, мм"
              {...register('width',
                {
                  required: notEmptyMessage,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Можно вводить только цифры'
                  }
                })}
            />
            {
              errors.width && <p className={s.errorMessage}>{errors.width.message}</p>
            }
          </div>

          <div className={s.inputWrapper}>
            <Input
              isError={errors.height}
              trigger={trigger}
              getValues={getValues}
              required={true}
              setValue={setValue}
              placeholder="Высота упаковки, мм"
              {...register('height',
                {
                  required: notEmptyMessage,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Можно вводить только цифры'
                  }
                })}
            />
            {
              errors.height && <p className={s.errorMessage}>{errors.height.message}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionsInputs;