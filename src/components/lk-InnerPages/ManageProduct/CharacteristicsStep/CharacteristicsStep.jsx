import s from './CharacteristicsStep.module.scss';
import EditProductPageSelect from "@/components/ui/EditProductPageSelect/EditProductPageSelect.jsx";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import NewCharacteristicForm
  from "@/components/lk-InnerPages/ManageProduct/CharacteristicsStep/NewCharacteristicForm/NewCharacteristicForm.jsx";
import Button from "@/components/ui/Button/Button.jsx";

const CharacteristicsStep = ({
                               attributes,
                               getValues,
                               setValue,
                               clearErrors,
                               trigger,
                               errors,
                               register,
                               setStep,
                               watch,
                               setFormWasEdited
                             }) => {

  const goToNextStep = async () => {

    let fieldsToValidate = []

    attributes.categorySpecificFields.characteristics.forEach(field => {
      fieldsToValidate.push('char_' + field.name)
    })

    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      console.log('Ошибки есть, дальше нельзя')
    } else {
      setStep('media')
    }
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
                    setFormWasEdited={setFormWasEdited}

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
                    watch={watch}
                  />
                </div>
              )
            )
          })
        }

        <NewCharacteristicForm/>

      </div>
      <div className={s.buttons}>
        <Button className={s.backButton} type="button" onClick={() => setStep('main')}>Назад</Button>
        <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>
      </div>
    </div>
  )
}

export default CharacteristicsStep;