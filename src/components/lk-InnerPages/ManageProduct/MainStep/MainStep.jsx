import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";


const MainStep = ({register, fields, errors, getValues, cats}) => {

  const notEmptyMessage = "Это поле не может быть пустым"

  // console.log('fields', fields)
  // console.log('errors', errors)


  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Главное о товаре</h2>

      <div>
        <Input
          getValues={getValues}
          required={true}
          placeholder="Название товара"
          {...register('productName',
            {
              required: notEmptyMessage,
              // minLength: {value: 3, message: "Минимум 3 буквы"}
            })}
        />

        {
          errors.productName && <p className={s.errorMessage}>{errors.productName.message}</p>
        }

      </div>

      <EditProductCategory
        cats={cats.categories}
        getValues={getValues}
        {...register('productCategoryId',
          {
            required: notEmptyMessage,            
          })}
      />
      
      {/*<Button onClick={() => append({value: "Memory"})}>Добавь новое поле Animal</Button>*/}

      <Button>Submit</Button>

    </div>
  );
};

export default MainStep;