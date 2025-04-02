import s from './ManageProductPage.module.scss';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import StepsNav from "@/components/lk-InnerPages/ManageProduct/StepsNav/StepsNav.jsx";
import MainStep from "@/components/lk-InnerPages/ManageProduct/MainStep/MainStep.jsx";
import CharacteristicsStep from "@/components/lk-InnerPages/ManageProduct/CharacteristicsStep/CharacteristicsStep.jsx";
import MediaStep from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaStep.jsx";
import PreviewStep from "@/components/lk-InnerPages/ManageProduct/PreviewStep/PreviewStep.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import WarningPopup from "@/components/lk-InnerPages/ManageProduct/WarningPopup/WarningPopup.jsx";

const ManageProductPage = () => {

  const [step, setStep] = useState('main')

  const [loading, setLoading] = useState(true)

  const [showWarningPopup, setShowWarningPopup] = useState(false)

  const [sending, setSending] = useState(false)


  const {productIdParam} = useParams()

  // когда edit - будем сетать при загрузке товара

  const [cats, setCats] = useState(null)
  const [attributes, setAttributes] = useState(null)

  // console.log('attributes', attributes)

  const navigate = useNavigate()


  const profileId = useSelector(getActiveProfileId)

  const isNew = productIdParam === 'new'


  const [instructionFile, setInstructionFile] = useState(null)
  const [documentationFile, setDocumentationFile] = useState(null)
  const [certificateFile, setCertificateFile] = useState(null)

  const [productPhotos, setProductPhotos] = useState([])
  const [presentationPhotos, setPresentationPhotos] = useState([])

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
        {value: 'article'},
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


  let navItems = []

  if (getValues('productCategoryId')) navItems = [
    {name: 'main', label: 'Главное о товаре'},
    {name: 'characteristics', label: 'Характеристики'},
    {name: 'media', label: 'Медиа'},
    {name: 'preview', label: 'Предварительный просмотр'},
  ]

  if (!getValues('productCategoryId')) navItems = [
    {name: 'main', label: 'Главное о товаре'},
    {name: 'media', label: 'Медиа'},
  ]

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


  const activeProfileId = useSelector(getActiveProfileId)
  const profilesData = useSelector(getUserProfilesData)
  // console.log(profilesData)

  useEffect(() => {

    // редирект на страницу с магазином, если профиль не = company или если isHasShop = false

    if (activeProfileId && profilesData) {
      const currentProfile = profilesData.find(item => item.profileId === activeProfileId)
      const type = currentProfile.type
      const isHasShop = currentProfile.isHasShop
      if (type !== 'company' || !isHasShop) navigate('/lk/shop')
    }
  }, [profilesData, activeProfileId]);

  
  

  // подгрузка данных для редактирования товара
  
  const [product, setProduct] = useState(null)
  const [productLoading, setProductLoading] = useState(isNew ? true : false)


  useEffect(() => {
    if (isNew) return
    if (!profileId) return

    const getProduct = async()=>{

      try {
        setProductLoading(true)
        const resp = await axiosInstance(`seller/${profileId}/products/${productIdParam}/update-details`)
        setProduct(resp.data)
       
        setValue('productCategoryId', resp.data.productCategoryId)
        
      } catch (err) {
        console.log(err)
      } finally {
        setProductLoading(false)
      }
    }

    getProduct()


  }, [profileId]);

  console.log('product = ', product)
  

  // подгрузка данных для создания нового товара   

  useEffect(() => {
    // if (!isNew) return

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
    // if (!isNew) return
    if (!profileId) return

    // грузим атрибуты
    const getAttributes = async () => {

      try {
        if (!cats) setLoading(true)

        let categoryURL = `/seller/${profileId}/attributes`
        if (categoryValue) categoryURL += `?categoryId=${categoryValue}`
        const response = await axiosInstance(categoryURL)

        setAttributes(response.data)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getAttributes()

  }, [productIdParam, profileId, categoryValue]);


  // При нажатии "Назад к списку товаров" и кнопки Cancel
  const handleCancel = () => {

    // проверяем, вносились ли изменения в форму
    let formEdited = false
    const newArr = fields.map(field => {
      return getValues(field.value)
    })

    formEdited = newArr.some(item => item !== undefined)

    // если хоть одно поле заполнено, либо загружено фото либо документ:    
    if (formEdited || productPhotos.length > 0 || presentationPhotos.length > 0 || instructionFile || documentationFile || certificateFile) {
      setShowWarningPopup(true)
    } else {
      navigate(`/lk/shop`)
    }
  }


  const onSubmit = async () => {
    let payloadFields = {}
    let characteristics = []

    fields.forEach(field => {
      const value = getValues(field.value)

      // это значение отправится в форме
      let payloadValue
      // если это select
      if (value?.value) {
        payloadValue = value.valueId
      } else {
        payloadValue = value?.trim()
      }

      if (!payloadValue) return  // undefined (для необязат.полей) не посылаем


      if (attributes && attributes.categorySpecificFields.characteristics.find(item => ('char_' + item.name) === field.value)) {
        if (!getValues(field.value)) return
        characteristics.push({
          productOptionValueId: getValues(field.value).valueId,
          isVariant: getValues(field.value).isVariant
        })

        return;
      }
      payloadFields[field.value] = payloadValue
    })

    payloadFields.characteristics = characteristics

    // пока захардкодила
    payloadFields.isSecondHand = false
    payloadFields.isDiscounted = false
    payloadFields.tnvdCode = "11112"
    payloadFields.barcode = "1231231"

    try {

      setSending(true)
      const response = await axiosInstance.post(`seller/${activeProfileId}/products/add`, payloadFields)
      const productVariantId = response.data.productVariantId


      // // Отправка фотографий:

      const formData = new FormData();

      productPhotos.forEach((photoFile, index) => {
        formData.append(`images[${index}].File`, photoFile);
        formData.append(`images[${index}].Order`, index);
      })


      await axiosInstance.post(`seller/${activeProfileId}/products/${productVariantId}/add-main-imgs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })


      // Отправка презентационных материалов:

      if (presentationPhotos.length > 0) {
        const formDataPresentations = new FormData();

        presentationPhotos.forEach((photoFile, index) => {
          formDataPresentations.append(`images[${index}].File`, photoFile);
          formDataPresentations.append(`images[${index}].Order`, index);
        })

        await axiosInstance.post(`seller/${activeProfileId}/products/${productVariantId}/add-overview-imgs`, formDataPresentations, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

      }

      // отправка документов:

      const formDataDocs = new FormData();

      if (instructionFile) {
        formDataDocs.append(`documents[0].File`, instructionFile);
        formDataDocs.append(`documents[0].DocumentType`, 'instruction');
      }

      if (documentationFile) {
        formDataDocs.append(`documents[1].File`, documentationFile);
        formDataDocs.append(`documents[1].DocumentType`, 'documentation');
      }

      if (certificateFile) {
        formDataDocs.append(`documents[2].File`, certificateFile);
        formDataDocs.append(`documents[2].DocumentType`, 'certificate');
      }

      if (!instructionFile && !documentationFile && certificateFile) return

      await axiosInstance.post(`seller/${activeProfileId}/products/${productVariantId}/add-document`, formDataDocs, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })


    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
      navigate('/lk/shop')
    }
  }


  if (isNew && loading) return <Spinner/>
  if (!isNew && (catsLoading || productLoading) ) return <Spinner/>


  return (
    <div className={s.manageProductWrapper}>
      {
        showWarningPopup &&
        <WarningPopup setShowWarningPopup={setShowWarningPopup} showWarningPopup={showWarningPopup}/>
      }
      <div className={s.topPart}>
        <div className={s.linkAndTitleWrapper}>
          <button type="button" className={s.backLink} onClick={handleCancel}>
            <svg className={s.backArrow} width="6" height="11" viewBox="0 0 6 11" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10L1 5.5L5 1" stroke="#658092"/>
            </svg>
            <span className={s.backLinkText}>Назад к списку товаров</span>
          </button>
          <h1 className={s.mainTitle}>
            {
              isNew ? "Создание товара" : "Редактирование товара"
            }
          </h1>
        </div>

        <nav className={s.stepsNav}>
          <StepsNav navItems={navItems} step={step} setStep={setStep} trigger={trigger} productPhotos={productPhotos}/>
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
              watch={watch}
            />
          }

          {
            step === 'media' && <MediaStep
              setStep={setStep}
              productPhotos={productPhotos}
              setProductPhotos={setProductPhotos}
              presentationPhotos={presentationPhotos}
              setPresentationPhotos={setPresentationPhotos}
            />
          }

          {
            step === 'preview' && <PreviewStep
              setStep={setStep}
              attributes={attributes}
              getValues={getValues}
              cats={cats}
              onSubmit={onSubmit}
              sending={sending}
            />
          }
        </form>
      </div>
    </div>
  )
}

export default ManageProductPage;