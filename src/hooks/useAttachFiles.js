import {useDropzone} from "react-dropzone";
import {v4 as uuidv4} from "uuid";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {toast} from "sonner";


const useAttachFiles = ({files, setFiles, setFilesLoading, chatRoomId}) => {

  const FILES_LIMIT = 10

  const onDrop = (acceptedFiles, fileRejections) => {

    // 2. Проверяем, есть ли отклонённые библиотекой файлы
    if (fileRejections && fileRejections.length > 0) {
      //const rejectedNames = fileRejections.map(r => r.file.name).join(', ');
      showErrorToast(`Некоторые файлы не загрузились. Разрешены PDF, DWG, XLSX, DOCX и изображения`);
    }

    const uploaded = acceptedFiles

    console.log("uploaded = ", uploaded)

    // когда пользователь прикрепил файл:
    if (uploaded) {

      const filesToState = uploaded.map(file => ({
        file: file,
        id: uuidv4(),
        mediaFileId: null
      }))

      // проверка на дубликаты
      const filesToStateNew = filesToState.filter(file => {

        const isInFiles = files.find(uploadedFile => {
          return uploadedFile.file.name === file.file.name && uploadedFile.file.size === file.file.size
        })

        if (isInFiles) {
          showErrorToast(`Файл ${file.file.name} уже загружен`)
        }

        return !isInFiles
      })

      // проверка на кол-во
      const canBeUploaded = FILES_LIMIT - files.length

      let filesToStateFinal = filesToStateNew

      if (filesToStateNew.length > canBeUploaded) {
        showErrorToast(`Максимальное количество файлов - ${FILES_LIMIT}`)
        filesToStateFinal = filesToStateNew.slice(0, canBeUploaded)
      }

      setFiles(
        prev => [...prev, ...filesToStateFinal]
      )

      // отправляем в загрузку

      filesToStateFinal.forEach(file => {
        upload(file)
      })

    }
  }

  const upload = async (file) => {

    try {

      setFilesLoading(prev => [...prev, file.id])

      const bodyA = {
        ownerEntity: 2,   // 1 - значит request
        ownerId: chatRoomId,
        kind: 2,   // 2 - значит attachment
        fileName: file.file.name,
        contentType: file.file.type,
        fileSize: file.file.size
      }

      const respA = await axiosInstance.post(`/media/init`, bodyA)

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
        respB = await axiosInstance.put(uploadUrl, file.file)
      }


      // запрос C (complete) с retry
      let respC
      try {
        respC = await axiosInstance.post(
          `media/${mediaFileId}/complete`
        )

        console.log("respC = ", respC)
      } catch (err) {

        if (
          err?.response?.data?.detail === 'File not found' ||
          err?.response?.data?.detail === "File size mismatch"
        ) {
          console.log('complete вернул ошибку, пробуем заново через новый init')

          const respA2 = await axiosInstance.post(`/media/init`, bodyA)

          const {mediaFileId: mediaFileId2, uploadUrl: uploadUrl2} = respA2.data

          await axiosInstance.put(uploadUrl2, file.file)

          respC = await axiosInstance.post(
            `media/${mediaFileId2}/complete`
          )
        } else {
          throw err
        }
      }

      setFiles(prev => prev.map(item => item.id === file.id ? {...item, mediaFileId} : item))
    } catch (err) {

      setFiles(prev => prev.filter(item => item.id !== file.id))
      toast.error(`Не удалось загрузить файл ${file.file.name}`)

      console.log(err)
    } finally {
      setFilesLoading(prev => prev.filter(item => item !== file.id))
    }
  }

  const dropProcessData = useDropzone({
    onDrop,
    noClick: true,               // Вернет клики всем кнопкам и инпутам под плашкой
    noKeyboard: true,            // Вернет управление стрелочками и скролл с клавиатуры
    preventDropOnDocument: true, // Защитит от случайного открытия файла в новой вкладке браузера
    multiple: true,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  })

  return dropProcessData
}

export default useAttachFiles
