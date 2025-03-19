import s from './ManageProduct.module.scss';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
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
import {useFieldArray, useForm} from "react-hook-form";

const ManageProduct = () => {

  const {productIdParam} = useParams()

  const [loading, setLoading] = useState(true)

  // когда edit - будем сетать при загрузке товара

  const [cats, setCats] = useState(null) // todo вернуть потом

  //const [cats, setCats] = useState('sdfdsf')  // todo убрать потом

  const [step, setStep] = useState('main')

  const profileId = useSelector(getActiveProfileId)

  const isNew = productIdParam === 'new'

  const isMobile = useMobileScreen()

  let navItems = []

  if (cats) navItems = [
    {name: 'main', label: 'Главное о товаре'},
    {name: 'characteristics', label: 'Характеристики'},
    {name: 'media', label: 'Медиа'},
    {name: 'preview', label: 'Предварительный просмотр'},
  ]

  if (!cats) navItems = ['Главное о товаре', 'Медиа']


  const {
    trigger,
    getValues,
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors}} = useForm({
    defaultValues: {
      fields: [
        {value: 'productName'},
        {value: 'productCategoryId'},
      ]
    }
  });

  const {fields, append} = useFieldArray({
    control,
    name: "fields"
  });


  const categoryValue = watch("productCategoryId")

  const [selectedCatName, setSelectedCatName] = useState('')

  const [searchCats, setSearchCats] = useState('')
  console.log({searchCats})

  const [catsLoading, setCatsLoading] = useState(true)
  
  // подгрузка данных для создания нового товара   

  useEffect(() => {
    if (productIdParam !== 'new') return
    if (!isNew) return

    // грузим категории  (будут зависеть от searchCats)
        
    const getCats = async () => {
      try {
         setCatsLoading(true)        
        
        let url = `/categories-tree`
        
        if (searchCats) url+=`?searchTerms=${searchCats}` 
                
        const response = await axiosInstance(url)
        console.log('cats', response)       
        setCats(response.data)

      } catch (err) {
        console.log(err)
      } finally {
         setCatsLoading(false)
      }
    }
    getCats()
  }, [productIdParam, profileId, searchCats]);
  //searchCats - добавить в зависимости
  

  useEffect(() => {
    if (!isNew) return
    if (!profileId) return

    // грузим атрибуты

    const getAttributes = async () => {

      try {
        if(!cats) setLoading(  true)
        
        let categoryURL = `/seller/${profileId}/attributes`
        if (categoryValue) categoryURL+=  `?categoryId=${categoryValue}`       
        const response = await axiosInstance(categoryURL)       
                
        console.log('attributes:', response.data)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getAttributes()

  }, [productIdParam, profileId, categoryValue]);


  const onSubmit = async(data)=>{
        
    if (!categoryValue) {
        setError("productCategoryId", {
          type: "manual",
          message: "Это поле не может быть пустым"})        
    } else {
       clearErrors("productCategoryId");
    }

    if (Object.keys(errors).length > 0) {
      return; 
    }
    
    // console.log('errors ===', errors)    
     console.log('form data', data)    
  }


  if (loading) return <Spinner/>

  return (
    <div className="container">

      <div className={s.topPart}>
        <div className={s.linkAndTitleWrapper}>
          <Link className={s.backLink} to={`/lk/shop`}>
            <svg className={s.backArrow} fill="current-color" width="6" height="11" viewBox="0 0 6 11" fill="none"
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
              setError={setError}
              searchCats={searchCats}
              setSearchCats={setSearchCats}
              catsLoading={catsLoading}
              setSelectedCatName={setSelectedCatName}
              selectedCatName={selectedCatName}
            />
          }

          {
            step === 'characteristics' && <CharacteristicsStep/>
          }

          {
            step === 'media' && <MediaStep/>
          }

          {
            step === 'preview' && <PreviewStep/>
          }
        </form>

      </div>
    </div>
)
}

export default ManageProduct;