import s from './CharacteristicsStep.module.scss';
import EditProductPageSelect from "@/components/ui/EditProductPageSelect/EditProductPageSelect.jsx";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import NewCharacteristicForm
  from "@/components/lk-InnerPages/ManageProduct/CharacteristicsStep/NewCharacteristicForm/NewCharacteristicForm.jsx";

const CharacteristicsStep = ({attributes, getValues, setValue, clearErrors, trigger, errors, register}) => {


  const nextStep = () => {
    // trigger - всех имен характеристик (добавим в массив в цикле), к имени прибавь char_
  }

  return (
    <div>
      <h2 className={s.title}>Характеристики</h2>
      <div className={s.wrapper}>
        {
          attributes.categorySpecificFields.characteristics.length > 0 && attributes.categorySpecificFields.characteristics.map(charField => {
            return (
              charField.type === 'select' &&
              (
                <div key={charField.name}>
                  <EditProductPageSelect

                    {...register('char_' + charField.name,
                      charField.isRequired && {
                        required: notEmptyMessage,
                      })}
                    data={charField}
                    getValues={getValues}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    trigger={trigger}
                    isError={errors['char_' + charField.name]}
                    placeholder={charField.label}
                    required={charField.isRequired}
                    isVariant={charField.isVariant}
                  />
                </div>
              )
            )
          })
        }

        <NewCharacteristicForm />
        
      </div>
    </div>
  )
}

export default CharacteristicsStep;