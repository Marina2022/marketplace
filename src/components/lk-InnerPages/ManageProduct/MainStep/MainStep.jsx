import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";


const MainStep = ({register, fields, errors, getValues}) => {

  const notEmptyMessage = "Это поле не может быть пустым"

  console.log('fields', fields)
  console.log('errors', errors)


  return (
    <div className={s.wrapper}>
      <h2>Главное о товаре</h2>

      <div>
        <Input
          getValues={getValues}
          required={true}
          placeholder="Название товара"
          {...register('productTitle',
            {
              required: notEmptyMessage,
              // minLength: {value: 3, message: "Минимум 3 буквы"}
            })}
        />

        {
          errors.productTitle && <p className={s.errorMessage}>{errors.productTitle.message}</p>
        }

      </div>
      
      {/*<Button onClick={() => append({value: "Memory"})}>Добавь новое поле Animal</Button>*/}

      <Button>Submit</Button>

    </div>
  );
};

export default MainStep;