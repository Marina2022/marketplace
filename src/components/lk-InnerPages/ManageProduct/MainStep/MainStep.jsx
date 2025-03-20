import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";



const MainStep = ({
                    register, 
                    fields, 
                    errors, 
                    getValues, 
                    cats, 
                    setValue, 
                    clearErrors,
                    
                    trigger, 
                    searchCats, 
                    setSearchCats, 
                    catsLoading, 
                    setSelectedCatName,
                    selectedCatName

}) => {
  
  const notEmptyMessage = "Это поле не может быть пустым"
  const goToNextStep = async () => {
    const isValid = await trigger(["productName", "productCategoryId", "sellerArticle", "model"]);

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
          isError={errors.productName}
          trigger={trigger}
          getValues={getValues}
          required={true}
          placeholder="Название товара"
          setValue={setValue}
          {...register('productName',
            {
              required: notEmptyMessage,
            })}
        />

        {
          errors.productName && <p className={s.errorMessage}>{errors.productName.message}</p>
        }
      </div>

      <div>
        {
          cats && <EditProductCategory
            trigger={trigger}
            isError={errors.productCategoryId}
            catsLoading={catsLoading}
            searchCats={searchCats}
            setSearchCats={setSearchCats}
            cats={cats.categories}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            setSelectedCatName={setSelectedCatName}
            selectedCatName={selectedCatName}
            {...register('productCategoryId',
              {required: notEmptyMessage,}
            )}
          />
        }

        {
          errors.productCategoryId && <p className={s.errorMessage}>{errors.productCategoryId.message}</p>
        }
      </div>


      <div>
        <Input
          isError={errors.sellerArticle}
          trigger={trigger}
          getValues={getValues}
          required={true}          
          placeholder="Артикул"
          setValue={setValue}
          {...register('sellerArticle',
            {
              required: notEmptyMessage,
            })}
        />

        {
          errors.sellerArticle && <p className={s.errorMessage}>{errors.sellerArticle.message}</p>
        }
      </div>   
      
      <div>
        <Input
          infoButton={true}
          isError={errors.model}
          trigger={trigger}
          getValues={getValues}
          required={true}
          setValue={setValue}
          placeholder="Модель товара"
          {...register('model',
            {
              required: notEmptyMessage,
            })}
        />

        {
          errors.model && <p className={s.errorMessage}>{errors.model.message}</p>
        }
      </div>


      {/*<Button onClick={() => append({value: "Memory"})}>Добавь новое поле Animal</Button>*/}

      <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>

      <p>**************************</p>
      <Button>Submit</Button>

    </div>
  );
};

export default MainStep;