import s from './ManageProductPage.module.scss';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import StepsNav from "@/components/lk-InnerPages/ManageProduct/StepsNav/StepsNav.jsx";
import MainStep from "@/components/lk-InnerPages/ManageProduct/MainStep/MainStep.jsx";
import CharacteristicsStep from "@/components/lk-InnerPages/ManageProduct/CharacteristicsStep/CharacteristicsStep.jsx";
import MediaStep from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaStep.jsx";
import PreviewStep from "@/components/lk-InnerPages/ManageProduct/PreviewStep/PreviewStep.jsx";
import {set, useFieldArray, useForm} from "react-hook-form";
import Button from "@/components/ui/Button/Button.jsx";

const ManageProductPage = () => {


  const {productIdParam} = useParams()

  const [loading, setLoading] = useState(true)

  // когда edit - будем сетать при загрузке товара

  const [cats, setCats] = useState(null)
  const [step, setStep] = useState('main')
  const [attributes, setAttibutes] = useState(null)


  const profileId = useSelector(getActiveProfileId)

  const isNew = productIdParam === 'new'

  let navItems = []

  if (cats) navItems = [
    {name: 'main', label: 'Главное о товаре'},
    {name: 'characteristics', label: 'Характеристики'},
    {name: 'media', label: 'Медиа'},
    {name: 'preview', label: 'Предварительный просмотр'},
  ]

  if (!cats) navItems = ['Главное о товаре', 'Медиа']

  const [instructionFile, setInstructionFile] = useState(null)
  const [documentationFile, setDocumentationFile] = useState(null)
  const [certificateFile, setCertificateFile] = useState(null)


  const {
    trigger,
    getValues,
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    formState: {errors}
  } = useForm({
    defaultValues: {
      fields: [
        {value: 'productName'},
        {value: 'productCategoryId'},
        {value: 'sellerArticle'},
        {value: 'model'},
        {value: 'productDescription'},
        {value: 'price'},
        {value: 'regularPrice'},
        {value: 'weight'},
        {value: 'height'},
        {value: 'width'},
        {value: 'length'}

      ]
    }
  });


  const {fields, append} = useFieldArray({
    control,
    name: "fields"
  });


  useEffect(() => {

    if (!attributes) return

    attributes.standartFields.forEach(attributeField => {
      if (!fields.find(field => {
        return field.value === attributeField.name
      })) {
        append({value: attributeField.name})
      } 
    })

    attributes.categorySpecificFields.commonFields.forEach(attributeField => {
      if (!fields.find(field => {
        return field.value === attributeField.name
      })) {
        append({value: attributeField.name})
      } else {

        //если поле найдено, сбросить значение
         setValue(attributeField.name, null)
      }
    })

    attributes.categorySpecificFields.characteristics.forEach(attributeField => {
      if (!fields.find(field => {
        return field.value === attributeField.name
      })) {
        append({value: 'char_' + attributeField.name})   // будут имена полей в форме с приставкой, типа char_memory, чтобы не пересеклись с другими  
      }
    })

  }, [attributes]);

  


  const categoryValue = watch("productCategoryId")
  const [selectedCatName, setSelectedCatName] = useState('')
  const [searchCats, setSearchCats] = useState('')
  const [catsLoading, setCatsLoading] = useState(true)


  // подгрузка данных для создания нового товара   

  useEffect(() => {
    if (!isNew) return

    // грузим категории  (будут зависеть от searchCats)

    const getCats = async () => {
      try {
        setCatsLoading(true)
        let url = `/categories-tree`
        if (searchCats) url += `?searchTerms=${searchCats}`
        const response = await axiosInstance(url)
        setCats(response.data)

      } catch (err) {
        console.log(err)
      } finally {
        setCatsLoading(false)
      }
    }
    getCats()
  }, [productIdParam, profileId, searchCats]);


  useEffect(() => {
    if (!isNew) return
    if (!profileId) return

    // грузим атрибуты
    const getAttributes = async () => {

      try {
        if (!cats) setLoading(true)

        let categoryURL = `/seller/${profileId}/attributes`
        if (categoryValue) categoryURL += `?categoryId=${categoryValue}`
        const response = await axiosInstance(categoryURL)


        console.log('attributes:', response.data)
        setAttibutes(response.data)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getAttributes()

  }, [productIdParam, profileId, categoryValue]);


  const onSubmit = async (data) => {

    // if (!categoryValue) {
    //     setError("productCategoryId", {
    //       type: "manual",
    //       message: "Это поле не может быть пустым"})        
    // } else {
    //    clearErrors("productCategoryId");
    // }
    //
    // if (Object.keys(errors).length > 0) {
    //   return; 
    // }

    // console.log('errors ===', errors)    
    
    

    console.log('form data', data)


    // Отправка файлов:
    // const formData = new FormData();
    // formData.append("file", file);
  }

  const navigate = useNavigate()

  // При нажатии "Назад к списку товаров" и кнопки Cancel
  const handleCancel = () => {
    console.log('Все отменить и вернуться')
    navigate(`/lk/shop`)
  }

  if (loading) return <Spinner/>


  return (

    <div className={s.manageProductWrapper}>
      <div className={s.topPart}>
        <div className={s.linkAndTitleWrapper}>

          {/*Здесь будет кнопка и на нее обработчик с попапом предупреждения и -- handleCancel */}

          <Link className={s.backLink} to={`/lk/shop`}>
            <svg className={s.backArrow} width="6" height="11" viewBox="0 0 6 11" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10L1 5.5L5 1" stroke="#658092"/>
            </svg>
            <span className={s.backLinkText}>Назад к списку товаров</span>
          </Link>
          <h1 className={s.mainTitle}>
            {
              isNew ? "Создание товара" : "Редактирование товара"
            }
          </h1>
        </div>

        <nav className={s.stepsNav}>
          <StepsNav navItems={navItems} step={step} setStep={setStep}/>
        </nav>
      </div>

      <div className={s.stepsContainer}>

        <form onSubmit={handleSubmit(onSubmit)}>
          {
            step === 'main' &&
            <MainStep
              trigger={trigger}
              register={register}
              append={append}
              fields={fields}
              errors={errors}
              getValues={getValues}
              cats={cats}
              setValue={setValue}
              clearErrors={clearErrors}
              searchCats={searchCats}
              setSearchCats={setSearchCats}
              catsLoading={catsLoading}
              setSelectedCatName={setSelectedCatName}
              selectedCatName={selectedCatName}
              attributes={attributes}

              instructionFile={instructionFile}
              setInstructionFile={setInstructionFile}
              documentationFile={documentationFile}
              setDocumentationFile={setDocumentationFile}
              certificateFile={certificateFile}
              setCertificateFile={setCertificateFile}

              handleCancel={handleCancel}
              setStep={setStep}
              watch={watch}

            />
          }

          {
            step === 'characteristics' && <CharacteristicsStep
              attributes={attributes} 
              getValues={getValues}
              setValue={setValue}
              clearErrors={clearErrors}
              trigger={trigger}
              errors={errors}
              register={register}
              setStep={setStep}            
            />
          }

          {
            step === 'media' && <MediaStep
              setStep={setStep}
            />
          }

          {
            step === 'preview' && <PreviewStep/>
          }


          <Button className={s.submitBtn}>Test Submit</Button>
        </form>

      </div>
    </div>
  )
}

export default ManageProductPage;