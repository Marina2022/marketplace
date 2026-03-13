import s from './EditRequest.module.scss';
import {useEffect, useRef, useState} from "react";
import DropdownRequestActions
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/DropdownRequestActions/DropdownRequestActions.jsx";
import Steps from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/Steps/Steps.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import InputSimple from "@/components/ui/InputSimple/InputSimple.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import EditRequestCategory
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestCategory/EditRequestCategory.jsx";
import RequestEditor
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/RequestEditor/RequestEditor.jsx";
import RequestPreview
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/RequestPreview/RequestPreview.jsx";
import RequestFiles
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/RequestFiles/RequestFiles.jsx";
import EditRequestTags
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestTags/EditRequestTags.jsx";

const EditRequest = ({requestToEdit, setRequestToEdit, resetRequests}) => {

  const isNew = requestToEdit === "new"
  const [showMenu, setShowMenu] = useState(false)
  const handleMenuClick = (e) => {
    setShowMenu(true)
    e.stopPropagation();
  }

  // console.log('request из пропсов = ', requestToEdit)

  const activeProfileId = useSelector(getActiveProfileId)

  // вроде и не надо
  // const [request, setRequest] = useState(null)

  const [requestId, setRequestId] = useState(requestToEdit.requestId);

  const [title, setTitle] = useState("")
  const [catId, setCatId] = useState("")
  const [description, setDescription] = useState("")

  const [initialPreview, setInitialPreview] = useState()  // загружаемое вместе с заявкой привью
  const [preview, setPreview] = useState() // привью, загружаемое пользователем

  const [initialFiles, setInitialFiles] = useState([]) // файлы, загружаемые вместе с заявкой
  const [files, setFiles] = useState([]) // файлы, загружаемые пользователем


  const [selectedTags, setSelectedTags] = useState([]) // выбранные теги


  const [filesLoading, setFilesLoading] = useState([])  // массив айди загружаемых файлов

  const [errors, setErrors] = useState({})


  const [loading, setLoading] = useState(!isNew)

  // console.log('catId = ', catId)
  // console.log('description = ', description)

  // console.log('initialFiles', initialFiles)
  // console.log('initialPreview', initialPreview)


  console.log('preview = ', preview)
  console.log('initialPreview = ', initialPreview)

  useEffect(() => {

    const getRequestAndAll = async () => {

      try {

        setLoading(true)
        const requestResponse = await axiosInstance(`requests/${requestToEdit.requestId}/edit-info?profileId=${activeProfileId}`)

        // console.log('requestResponse для формы = ', requestResponse)

        setTitle(requestResponse.data.title)
        setCatId(requestResponse.data.categoryId)
        setDescription(requestResponse.data.description)

        const filesForRequest = await axiosInstance(`/requests/${requestToEdit.requestId}/files?profileId=${activeProfileId}`)

        // console.log("filesForRequest = ", filesForRequest)

        if (filesForRequest.data.preview) {
          setInitialPreview(filesForRequest.data.preview)
        } else {
          setInitialPreview(null)
        }
        setInitialFiles(filesForRequest.data.attachments)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }


      // getRequest to edit

      // setCover
      // setTags
      // setFiles
      // setTitle
      // setCatId
      // setDescription

    }

    if (!isNew) {
      getRequestAndAll()
    }

  }, [isNew]);

  const handleSubmit = async (e) => {
    // валидация

    if (!title) {
      //alert('Введите название заявки')
      setErrors({title: 'Введите название заявки'})
      return
    }
  }

  const isDirty = useRef(false)  // было ли редактирование

  console.log('requestId', requestId)

  const saveDraft = async () => {
    console.log('------------ savingDraft ---------------')

    const tagsForPayload = selectedTags.map((tag) => tag.tagId)

    const body = {
      profileId: activeProfileId,
      categoryId: catId ? catId : null,
      title: title,
      description: description,
      tags: tagsForPayload
    }

//    console.log('body = ', body)

    if (!requestId) {
      // создание драфта
      try {
        const response = await axiosInstance.post(`/requests`, body)
        console.log("response - создание драфта = ", response)
        setRequestId(response.data.requestId)
      } catch (err) {
        console.log(err)
      }
    } else {
      // update драфта.

      try {
        const response = await axiosInstance.put(`/requests/${requestId}/draft`, body)
        console.log("response - update драфта = ", response)

      } catch (err) {
        console.log(err)
      }
    }


    isDirty.current = false;
  };

  useEffect(() => {

    if (requestToEdit !== "new" && requestToEdit.status.code !== "draft") return

    const interval = setInterval(() => {
      if (isDirty.current) {
        saveDraft();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [title, description, selectedTags, catId]);


  const handleCancel = async () => {
    setRequestToEdit(null)
    resetRequests()
  }

  return (
    <div className={s.editRequestForm}>
      {
        loading && <div className={s.spinnerWrapper}><Spinner/></div>
      }
      <div className={s.headerDesktop}>
        <button className={s.backButton} onClick={handleCancel}>
          <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.000157356 8.6675C0.000157356 7.9675 0.270156 7.2675 0.800156 6.7375L7.32016 0.2175C7.61016 -0.0725 8.09016 -0.0725 8.38016 0.2175C8.67016 0.5075 8.67016 0.9875 8.38016 1.2775L1.86016 7.7975C1.38016 8.2775 1.38016 9.0575 1.86016 9.5375L8.38016 16.0575C8.67016 16.3475 8.67016 16.8275 8.38016 17.1175C8.09016 17.4075 7.61016 17.4075 7.32016 17.1175L0.800156 10.5975C0.270156 10.0675 0.000157356 9.3675 0.000157356 8.6675Z"
              fill="black"/>
          </svg>
        </button>

        <h1 className={s.title}>
          {isNew ? <span>Создание заявки</span> : <span>Редактирование заявки</span>}
        </h1>
      </div>

      <div className={s.headerMobile} onClick={() => setRequestToEdit(null)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {
          isNew ? <span>Создание заявки</span> : <span>Редактирование заявки</span>
        }

        {
          !isNew && (
            <div className={s.menuBtnWrapper}>
              <button className={s.menuBtn} onClick={handleMenuClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                    fill="#131D2A"/>
                  <path
                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                    fill="#131D2A"/>
                  <path
                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                    fill="#131D2A"/>
                  <path
                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                    stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path
                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                    stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path
                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                    stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {
                showMenu && !isNew && (
                  <DropdownRequestActions
                    request={requestToEdit}
                    mobileFixed={true}
                    onClose={() => setShowMenu(false)}
                    resetRequests={resetRequests}
                    setRequestToEdit={setRequestToEdit}
                  />
                )
              }
            </div>
          )
        }

      </div>

      <Steps
        title={title}
        catId={catId}
        description={description}
        tags={selectedTags}
        initialPreview={initialPreview}
        preview={preview}
      />

      <h2 className={s.subTitle}>Главное о заявке</h2>

      <InputSimple
        value={title}
        setValue={setTitle}
        placeholder="Название заявки"
        required={true} className={s.input}
        errors={errors}
        setErrors={setErrors}
        name="title"
        isDirty={isDirty}
      />

      <EditRequestCategory
        catId={catId}
        setValue={setCatId}
        isDirty={isDirty}
      />

      <h3 className={s.littleTitle}>Описание заявки</h3>
      <RequestEditor
        value={description}
        setValue={setDescription}
        isDirty={isDirty}
        requestToEdit={requestToEdit}
      />

      <h3 className={s.littleTitle}>Обложка заявки</h3>

      <RequestPreview
        initialPreview={initialPreview}
        preview={preview}
        setPreview={setPreview}
        setInitialPreview={setInitialPreview}
        filesLoading={filesLoading}
        setFilesLoading={setFilesLoading}
        requestId={requestId}
        activeProfileId={activeProfileId}
        files={files}
        initialFiles={initialFiles}
      />


      <h3 className={s.littleTitle}>Ключевые слова</h3>
      <EditRequestTags catId={catId} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />


      <h3 className={`mobile-hidden ${s.littleTitle}`}>Дополнительные файлы</h3>
      <h3 className={`mobile-visible ${s.littleTitle}`}>Прикрепляемые файлы</h3>

      <RequestFiles
        initialFiles={initialFiles}
        setInitialFiles={setInitialFiles}
        files={files}
        setFiles={setFiles}
        filesLoading={filesLoading}
        setFilesLoading={setFilesLoading}
        requestId={requestId}
        activeProfileId={activeProfileId}
        initialPreview={initialPreview}
        preview={preview}
      />


      <div className={s.buttons}>
        <Button className={s.cancelBtn} onClick={handleCancel}>Отменить</Button>
        <Button className={s.submitBtn} onClick={handleSubmit}>Создать заявку</Button>
      </div>


      {/*в tags тоже пойдет пропс, не забыть применить - isDirty={isDirty}  isDirty.current = true  */}

    </div>
  );
};

export default EditRequest;