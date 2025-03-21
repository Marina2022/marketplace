import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";
import EditProductPageSelect from "@/components/ui/EditProductPageSelect/EditProductPageSelect.jsx";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import TiptapEditor from "@/components/ui/Editor/Editor.jsx";
import ProductDescription
  from "@/components/lk-InnerPages/ManageProduct/MainStep/ProductDescription/ProductDescription.jsx";


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
                    selectedCatName,
                    attributes

                  }) => {
  
  const goToNextStep = async () => {

    const fieldNames = fields.map(fieldItem => fieldItem.value)

    // const isValid = await trigger(["productName", "productCategoryId", "sellerArticle", "model"]);
    const isValid = await trigger(fieldNames);

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
      
      
      {/*common fields*/}

      

      {
        attributes.categorySpecificFields.commonFields.length > 0 && attributes.categorySpecificFields.commonFields.map(commonField => {
          return (
            commonField.type === 'select' &&
            (
              <div key={commonField.name}>
                <EditProductPageSelect

                  {...register(commonField.name,
                    commonField.isRequired && {   // потестить бы todo
                      required: notEmptyMessage,
                    })}
                  data={commonField}
                  getValues={getValues}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  trigger={trigger}
                  isError={errors[commonField.name]}
                  placeholder={commonField.label}
                  required={commonField.isRequired}
                />

              </div>
            )
          )
        })
      }
      
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

      {
        attributes.standartFields.length > 0 && attributes.standartFields.map(standardField => {
          return (
            standardField.type === 'select' &&
            (
              <div key={standardField.name}>
                <EditProductPageSelect

                  {...register(standardField.name,
                    standardField.isRequired && {   // потестить бы todo
                      required: notEmptyMessage,
                    })}
                  data={standardField}
                  getValues={getValues}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  trigger={trigger}
                  isError={errors[standardField.name]}
                  placeholder={standardField.label}
                  required={standardField.isRequired}
                />
              </div>
            )
          )
        })
      }

      
      
      <ProductDescription
        productDescription        
        name='productDescription'
        setValue={setValue}
        getValues={getValues}
                
      
      />
      
     
      

      <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>

      <p>**************************</p>
      <Button>Submit</Button>

    </div>
  );
};

export default MainStep;