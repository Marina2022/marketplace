import s from './RequestPreview.module.scss';
import camera from '@/assets/img/camera.svg'
import {useDropzone} from "react-dropzone";
import {v4 as uuidv4} from "uuid";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import trash from '@/assets/img/trash.svg'
import trashMobile from '@/assets/img/trash-mobile.svg'
import {RxClock} from "react-icons/rx";
import {toast} from "sonner";


const RequestPreview = ({initialPreview, preview, setPreview, setInitialPreview, filesLoading, setFilesLoading, requestId}) => {

  // console.log('filesLoading = ', filesLoading)

  const isMobile = useMobileScreen();

  const handleDelete = (e)=>{
    e.stopPropagation()
    setInitialPreview(null)
    setPreview(null)
  }

  const onDrop = (acceptedFiles) => {

    if (!requestId) {
      toast.error('Сначала введите название')
      return
    }

    const uploaded = acceptedFiles[0];

    // когда пользователь загрузил файл:
    if (uploaded) {

      const previewId = uuidv4()
      setInitialPreview(null);

      setPreview({
        file: uploaded,
        id: previewId,
      });

      setFilesLoading(prev => [...prev, previewId])

      // загрузка в S3
      // по окончании загрузки
      // setPreview {...prev, mediaField: 1111}
      // setFilesLoading - filter от текущего previewId
    }
  }

  const {getRootProps, getInputProps, open } = useDropzone({
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
          <button className={s.trashButton}  onClick={handleDelete}>
            <img src={isMobile ? trashMobile: trash} alt=""/>
          </button>
        )
      }

      {
      filesLoading.includes(preview?.id) && (
          <div className={s.clockIndicator}>
            <RxClock />
          </div>
        )
      }
    </div>
  );
};

export default RequestPreview;