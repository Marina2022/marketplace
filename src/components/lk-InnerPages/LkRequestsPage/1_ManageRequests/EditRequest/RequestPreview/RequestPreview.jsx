import s from './RequestPreview.module.scss';
import camera from '@/assets/img/camera.svg'
import {useDropzone} from "react-dropzone";
import {v4 as uuidv4} from "uuid";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import trash from '@/assets/img/trash.svg'
import trashMobile from '@/assets/img/trash-mobile.svg'
import {toast} from "sonner";
import axiosInstance from "@/api/axiosInstance.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";


const RequestPreview = ({
                          initialPreview,
                          preview,
                          setPreview,
                          setInitialPreview,
                          filesLoading,
                          setFilesLoading,
                          requestId,
                          activeProfileId,
                          files,
                          initialFiles
                        }) => {

  // console.log('filesLoading = ', filesLoading)

  const isMobile = useMobileScreen()

  const handleDelete = (e) => {
    e.stopPropagation()
    setInitialPreview(null)
    setPreview(null)
  }

  const onDrop = async (acceptedFiles) => {

    if (!requestId) {
      toast.error('Сначала введите название')
      return
    }

    const uploaded = acceptedFiles[0];

    console.log("uploaded preview = ", uploaded)

    // когда пользователь загрузил файл:
    if (uploaded) {

      const isInInitialFiles = initialFiles.find(initialFile => {
        return initialFile.fileName === uploaded.name && initialFile.fileSize === uploaded.size
      })
      const isInFiles = files.find(uploadedFile => {
        return uploadedFile.file.name === uploaded.name && uploadedFile.file.size === uploaded.size
      })

      if (isInInitialFiles || isInFiles) {
        toast.error(`Файл ${uploaded.name} уже загружен`)
      }

      if (isInInitialFiles || isInFiles) return

      const previewId = uuidv4()
      setInitialPreview(null);

      setPreview({
        file: uploaded,
        id: previewId,
      });

      setFilesLoading(prev => [...prev, previewId])

      try {

        const bodyA = {
          profileId: activeProfileId,
          ownerEntity: 1,   // 1 - значит request
          ownerId: requestId,
          kind: 1,   // 1 - значит preview
          fileName: uploaded.name,
          contentType: uploaded.type,
          fileSize: uploaded.size
        }

        const respA = await axiosInstance.post(`requests/${requestId}/uploads/init?profileId=${activeProfileId}`, bodyA)
        const {mediaFileId, uploadUrl} = respA.data;


        let respB;

        try {
          respB = await axiosInstance.put(uploadUrl, uploaded, {
              headers: {
                "Content-Type": uploaded.type
              }
            }
          )
        } catch (err) {
          console.log('Первая попытка загрузки не удалась, пробуем ещё раз')
          respB = await axiosInstance.put(uploadUrl, uploaded);
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

            await axiosInstance.put(uploadUrl2, uploaded)

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

        setPreview(prev => ({
          ...prev, mediaFileId
        }));


      } catch (err) {

        setPreview(null);
        toast.error(`Не удалось загрузить файл ${uploaded.name}`)

        console.log(err)
      } finally {
        setFilesLoading(prev => prev.filter(item => item !== previewId))
      }
    }
  }

  const {getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    multiple: false,
    accept: {  // todo - тут не только image
      "image/*": []
    },
    noClick: true
  });

  return (
    <div
      className={s.previewWrapper}
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
      {
        initialPreview && (
          <img className={s.img} src={initialPreview.url} alt="preview"/>
        )
      }

      {
        preview && (
          <img className={s.img} src={URL.createObjectURL(preview.file)}
               alt="preview"/>
        )
      }

      {
        !(preview || initialPreview) && (
          <img src={camera} alt="preview"/>
        )
      }

      <input {...getInputProps()} />

      {
        (initialPreview || preview) && (
          <button className={s.trashButton} onClick={handleDelete}>
            <img src={isMobile ? trashMobile : trash} alt=""/>
          </button>
        )
      }

      {
        filesLoading.includes(preview?.id) && (
          <div className={s.clockIndicator}>
            <MiniSpinner/>
          </div>
        )
      }
    </div>
  )
}

export default RequestPreview;