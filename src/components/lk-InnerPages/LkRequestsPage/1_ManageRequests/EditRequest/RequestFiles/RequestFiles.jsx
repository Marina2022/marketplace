import s from './RequestFiles.module.scss';
import {useDropzone} from "react-dropzone";
import {v4 as uuidv4} from "uuid";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {RxClock} from "react-icons/rx";
import pictureIcon from '@/assets/img/picture.svg'
import {toast} from "sonner";

const RequestFiles = ({filesLoading, setFilesLoading, initialFiles, setInitialFiles, files, setFiles, requestId}) => {

  console.log("files", files)


  // console.log('filesLoading = ', filesLoading)

  const isMobile = useMobileScreen();

  // const handleDelete = (e)=>{
  //   e.stopPropagation()
  //   setInitialPreview(null)
  //   setPreview(null)
  // }

  const onDrop = (acceptedFiles) => {

    if (!requestId) {
      toast.error('Сначала введите название')
      return
    }

    const uploaded = acceptedFiles.slice(0, 20);

    // когда пользователь загрузил файл:
    if (uploaded) {

      //const previewId = uuidv4()

      //{
      //         file: uploaded,
      //         id: previewId,
      //       }

      setFiles(
        prev => [...prev, ...uploaded]
      );

      //setFilesLoading(prev => [...prev, previewId])

      // загрузка в S3
      // по окончании загрузки
      // setPreview {...prev, mediaField: 1111}
      // setFilesLoading - filter от текущего previewId
    }
  }

  const {getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": []
    },
    noClick: true
  });

  return (
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
      {/*  (initialPreview || preview) && (*/}
      {/*    <button className={s.trashButton}  onClick={handleDelete}>*/}
      {/*      <img src={isMobile ? trashMobile: trash} alt=""/>*/}
      {/*    </button>*/}
      {/*  )*/}
      {/*}*/}

      {/*{*/}
      {/*filesLoading.includes(preview?.id) && (*/}
      {/*    <div className={s.clockIndicator}>*/}
      {/*      <RxClock />*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}
    </div>
  );
};

export default RequestFiles;