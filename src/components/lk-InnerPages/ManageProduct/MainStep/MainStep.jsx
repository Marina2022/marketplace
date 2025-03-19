import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";


const MainStep = ({register, fields, errors, getValues, cats, setValue, clearErrors, setError, trigger, search, setSearch}) => {

  
  const notEmptyMessage = "Это поле не может быть пустым"
  const goToNextStep = async () => {
    const isValid = await trigger(["productName", "productCategoryId"]);

    if (!isValid) {
      console.log('ошибки есть, дальше нельзя')
    } else {
      console.log('all good, next step')
    }
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Главное о товаре</h2>
      <div>
        <Input
          trigger={trigger}
          setError={setError}
          getValues={getValues}
          required={true}
          placeholder="Название товара"
          {...register('productName',
            {
              required: notEmptyMessage,
              // minLength: {value: 3, message: "Минимум 3 буквы"}
            })}
          onChange={(e) => {
            register().onChange(e)
            trigger("productName")
          }
          }
        />

        {
          errors.productName && <p className={s.errorMessage}>{errors.productName.message}</p>
        }

      </div>

      <div>
        <EditProductCategory
          cats={cats.categories}
          getValues={getValues}
          setValue={setValue}
          clearErrors={clearErrors}
          name='productCategoryId'
          {...register('productCategoryId',
            {required: notEmptyMessage,}
          )}
        />
        {
          errors.productCategoryId && <p className={s.errorMessage}>{errors.productCategoryId.message}</p>
        }
      </div>
      {/*<Button onClick={() => append({value: "Memory"})}>Добавь новое поле Animal</Button>*/}

      <Button type="button" onClick={goToNextStep}>Далее</Button>

      {/*<Button>Submit</Button>*/}

    </div>
  );
};

export default MainStep;