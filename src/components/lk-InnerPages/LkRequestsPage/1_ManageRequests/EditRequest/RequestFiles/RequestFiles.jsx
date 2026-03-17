import s from './RequestFiles.module.scss';
import {useDropzone} from "react-dropzone";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import pictureIcon from '@/assets/img/picture.svg'
import {toast} from "sonner";
import InitialFile
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/RequestFiles/InitialFile/InitialFile.jsx";
import {v4 as uuidv4} from "uuid";
import UploadedFile
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/RequestFiles/UploadedFile/UploadedFile.jsx";
import axiosInstance from "@/api/axiosInstance.js";

const RequestFiles = ({
                        filesLoading,
                        setFilesLoading,
                        initialFiles,
                        setInitialFiles,
                        files,
                        setFiles,
                        requestId,
                        activeProfileId,
                        initialPreview,
                        preview
                      }) => {

  const FILES_LIMIT = 20


  const upload = async (file) => {
    try {

      setFilesLoading(prev => [...prev, file.id])

      const bodyA = {
        profileId: activeProfileId,
        ownerEntity: 1,   // 1 - значит request
        ownerId: requestId,
        kind: 2,   // 2 - значит attachment
        fileName: file.file.name,
        contentType: file.file.type,
        fileSize: file.file.size
      }

      const respA = await axiosInstance.post(`requests/${requestId}/uploads/init?profileId=${activeProfileId}`, bodyA)

      const {mediaFileId, uploadUrl} = respA.data;

      let respB;

      try {
        respB = await axiosInstance.put(uploadUrl, file.file, {
            headers: {
              "Content-Type": file.file.type
            }
          }
        )
      } catch (err) {
        console.log('Первая попытка загрузки не удалась, пробуем ещё раз')
        respB = await axiosInstance.put(uploadUrl, file.file);
      }

      // запрос C (complete) с retry
      let respC
      try {
        respC = await axiosInstance.post(
          `media/${mediaFileId}/complete?profileId=${activeProfileId}`
        )
      } catch (err) {

        if (
          err?.response?.data?.detail === 'File not found' ||
          err?.response?.data?.detail === "File size mismatch"
        ) {
          console.log('complete вернул ошибку, пробуем заново через новый init')

          const respA2 = await axiosInstance.post(
            `requests/${requestId}/uploads/init?profileId=${activeProfileId}`,
            bodyA
          )

          const {mediaFileId: mediaFileId2, uploadUrl: uploadUrl2} = respA2.data

          await axiosInstance.put(uploadUrl2, file.file)

          respC = await axiosInstance.post(
            `media/${mediaFileId2}/complete?profileId=${activeProfileId}`
          )
        } else {
          throw err
        }
      }

      // console.log("respA = ", respA)
      // console.log("respB = ", respB)
      // console.log("respC = ", respC)
      setFiles(prev => prev.map(item => item.id === file.id ? {...item, mediaFileId} : item))
    } catch (err) {

      setFiles(prev => prev.filter(item => item.id !== file.id))
      toast.error(`Не удалось загрузить файл ${file.file.name}`)

      console.log(err)
    } finally {
      setFilesLoading(prev => prev.filter(item => item !== file.id))
    }
  }

  const isMobile = useMobileScreen();

  const onDrop = (acceptedFiles) => {

    if (!requestId) {
      toast.error('Сначала введите название')
      return
    }

    const uploaded = acceptedFiles

    // когда пользователь загрузил файл:
    if (uploaded) {

      const filesToState = uploaded.map(file => ({
        file: file,
        id: uuidv4(),
        mediaFileId: null
      }))

      // проверка на дубликаты
      const filesToStateNew = filesToState.filter(file => {
        const isInInitialFiles = initialFiles.find(initialFile => {
          return initialFile.fileName === file.file.name && initialFile.fileSize === file.file.size
        })
        const isInFiles = files.find(uploadedFile => {
          return uploadedFile.file.name === file.file.name && uploadedFile.file.size === file.file.size
        })
        const isInPreviews = preview?.file.name === file.file.name && preview?.file.size === file.file.size
          || initialPreview?.fileName === file.file.name && initialPreview?.fileSize === file.file.size

        if (isInInitialFiles || isInFiles || isInPreviews) {
          toast.error(`Файл ${file.file.name} уже загружен`)
        }

        return !isInInitialFiles && !isInFiles && !isInPreviews
      })

      // проверка на кол-во
      const canBeUploaded = FILES_LIMIT - (initialFiles.length + files.length)

      let filesToStateFinal = filesToStateNew

      if (filesToStateNew.length > canBeUploaded) {
        toast.error(`Максимальное количество файлов - ${FILES_LIMIT}`)
        filesToStateFinal = filesToStateNew.slice(0, canBeUploaded)
      }


      setFiles(
        prev => [...prev, ...filesToStateFinal]
      )

      // отправляем в загрузку

      filesToStateFinal.forEach(file => {
        upload(file)

      })

      //setFilesLoading(prev => [...prev, previewId])

      // загрузка в S3
      // по окончании загрузки

      // setFilesLoading - filter от текущего previewId
    }
  }

  const {getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    noClick: true
  });

  return (
    <div>
      <div
        className={s.filesInputArea}
        {...getRootProps()}

        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!requestId) {
            toast.error("Сначала введите название");
            return;
          }
          open();
        }}
      >
        <div className={s.content}>
          <img src={pictureIcon} alt=""/>
          <div className={s.text}>
          <span className="mobile-hidden">
          Выберите файлы или перетащите
          </span>
            <span className="mobile-visible">
          Добавить файлы
          </span>
          </div>
        </div>


        <input {...getInputProps()} />

        {/*{*/}
        {/*filesLoading.includes(preview?.id) && (*/}
        {/*    <div className={s.clockIndicator}>*/}
        {/*      <RxClock />*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*}*/}
      </div>


      <div className={s.filesGrid}>
        {
          initialFiles.map((file) => <InitialFile key={file.mediaFileId} initialFile={file}
                                                  setInitialFiles={setInitialFiles}/>)
        }

        {
          files.map((file) => <UploadedFile key={file.id} uploadedFile={file} setFiles={setFiles}
                                            filesLoading={filesLoading}/>)
        }
      </div>
    </div>
  );
};

export default RequestFiles;