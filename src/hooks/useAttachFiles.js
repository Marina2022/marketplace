import {useDropzone} from "react-dropzone";
import {v4 as uuidv4} from "uuid";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";


// •	isDragActive — тащат файл
// •	isDragReject — файл не подходит по accept
// •	fileRejections — список отклонённых файлов


const useAttachFiles = ({files, setFiles, filesLoading, setFilesLoading}) => {

  const FILES_LIMIT = 10

  const onDrop = (acceptedFiles) => {

    const uploaded = acceptedFiles

    console.log("uploaded = ", uploaded)

    // когда пользователь загрузил файл:
    // if (uploaded) {
    //
    //   const filesToState = uploaded.map(file => ({
    //     file: file,
    //     id: uuidv4(),
    //     mediaFileId: null
    //   }))
    //
    //   // проверка на дубликаты
    //   const filesToStateNew = filesToState.filter(file => {
    //     const isInInitialFiles = initialFiles.find(initialFile => {
    //       return initialFile.fileName === file.file.name && initialFile.fileSize === file.file.size
    //     })
    //     const isInFiles = files.find(uploadedFile => {
    //       return uploadedFile.file.name === file.file.name && uploadedFile.file.size === file.file.size
    //     })
    //     const isInPreviews = preview?.file.name === file.file.name && preview?.file.size === file.file.size
    //       || initialPreview?.fileName === file.file.name && initialPreview?.fileSize === file.file.size
    //
    //     if (isInInitialFiles || isInFiles || isInPreviews) {
    //       showErrorToast(`Файл ${file.file.name} уже загружен`)
    //     }
    //
    //     return !isInInitialFiles && !isInFiles && !isInPreviews
    //   })
    //
    //   // проверка на кол-во
    //   const canBeUploaded = FILES_LIMIT - (initialFiles.length + files.length)
    //
    //   let filesToStateFinal = filesToStateNew
    //
    //   if (filesToStateNew.length > canBeUploaded) {
    //     showErrorToast(`Максимальное количество файлов - ${FILES_LIMIT}`)
    //     filesToStateFinal = filesToStateNew.slice(0, canBeUploaded)
    //   }
    //
    //
    //   setFiles(
    //     prev => [...prev, ...filesToStateFinal]
    //   )
    //
    //   // отправляем в загрузку
    //
    //   filesToStateFinal.forEach(file => {
    //     upload(file)
    //
    //   })
    //
    //   //setFilesLoading(prev => [...prev, previewId])
    //
    //   // загрузка в S3
    //   // по окончании загрузки
    //
    //   // setFilesLoading - filter от текущего previewId
    // }
  }

  const upload = async(file) => {
    console.log("гружу файл", file)
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
