import s from './MainStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import Input from "@/components/ui/Input/Input.jsx";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";
import EditProductPageSelect from "@/components/ui/EditProductPageSelect/EditProductPageSelect.jsx";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";
import ProductDescription
  from "@/components/lk-InnerPages/ManageProduct/MainStep/ProductDescription/ProductDescription.jsx";
import PriceInputs from "@/components/lk-InnerPages/ManageProduct/MainStep/PriceInputs/PriceInputs.jsx";
import DimensionsInputs from "@/components/lk-InnerPages/ManageProduct/MainStep/DimensionsInputs/DimensionsInputs.jsx";
import DocsFileInputs from "@/components/lk-InnerPages/ManageProduct/MainStep/DocsFileInputs/DocsFileInputs.jsx";


const MainStep = ({
                    register,
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
                    attributes,
                    watch,
                    instructionFile, setInstructionFile,
                    documentationFile, setDocumentationFile,
                    certificateFile, setCertificateFile,
                    handleCancel,
                    setStep,
                    product,
                    setProduct,
                    setFormWasEdited
                  }) => {


  const goToNextStep = async () => {

    let fieldsToValidate = ["productName", "productCategoryId", "article", "model",
      "price", "regularPrice", "weight", "height", "width", "length"]

    attributes.categorySpecificFields.commonFields.forEach(field => {
      fieldsToValidate.push(field.name)
    })

    attributes.standartFields.forEach(field => {
        fieldsToValidate.push(field.name)
      }
    )
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      console.log('Ошибки есть, дальше нельзя')
    } else {
      setStep('characteristics')
    }
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Главное о товаре</h2>
      <div>
        <Input
          setFormWasEdited={setFormWasEdited}
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
            setFormWasEdited={setFormWasEdited}
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
          setFormWasEdited={setFormWasEdited}
          isError={errors.article}
          trigger={trigger}
          getValues={getValues}
          required={true}
          placeholder="Артикул"
          setValue={setValue}
          {...register('article',
            {
              required: notEmptyMessage,
            })}
        />

        {
          errors.article && <p className={s.errorMessage}>{errors.article.message}</p>
        }
      </div>


      <div>
        <Input
          setFormWasEdited={setFormWasEdited}
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


      {/*/!*common fields*!/*/}

      {
        attributes?.categorySpecificFields.commonFields.length > 0 && attributes.categorySpecificFields.commonFields.map(commonField => {
          return (

            <div key={commonField.name}>

              {
                commonField.type === 'select' && <div>
                  <EditProductPageSelect
                    {...register(commonField.name,
                      commonField.isRequired && {
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
                    watch={watch}
                    setFormWasEdited={setFormWasEdited}
                  />
                </div>
              }

              {
                commonField.type === 'input' && <div>
                  <Input
                    setFormWasEdited={setFormWasEdited}
                    isError={errors[commonField.name]}
                    trigger={trigger}
                    getValues={getValues}
                    required={commonField.isRequired}
                    setValue={setValue}
                    placeholder={commonField.label}
                    {...register(commonField.name,
                      commonField.isRequired && {
                        required: notEmptyMessage,
                      })}
                  />

                  {
                    errors[commonField.name] && <p className={s.errorMessage}>{errors[commonField.name].message}</p>
                  }
                </div>
              }
            </div>
          )
        })
      }

      {
        attributes?.standartFields.length > 0 && attributes.standartFields.map(standardField => {
          return (
            standardField.type === 'select' &&
            (
              <div key={standardField.name}>
                <EditProductPageSelect
                  {...register(standardField.name,
                    standardField.isRequired && {
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
                  watch={watch}
                  setFormWasEdited={setFormWasEdited}
                />
              </div>
            )
          )
        })
      }

      <ProductDescription
        name='productDescription'
        setValue={setValue}
        getValues={getValues}
        setFormWasEdited={setFormWasEdited}
      />
      <PriceInputs
        register={register}
        errors={errors}
        trigger={trigger}
        getValues={getValues}
        setValue={setValue}
        setFormWasEdited={setFormWasEdited}
      />

      <DimensionsInputs
        register={register}
        errors={errors}
        trigger={trigger}
        getValues={getValues}
        setFormWasEdited={setFormWasEdited}
        setValue={setValue}
      />

      <DocsFileInputs
        instructionFile={instructionFile}
        setInstructionFile={setInstructionFile}
        documentationFile={documentationFile}
        setDocumentationFile={setDocumentationFile}
        certificateFile={certificateFile}
        setCertificateFile={setCertificateFile}
        product={product}
        setProduct={setProduct}
      />

      <div className={s.buttons}>
        <Button className={s.backButton} type="button" onClick={handleCancel}>Отменить</Button>
        <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>
      </div>
    </div>
  );
};

export default MainStep;