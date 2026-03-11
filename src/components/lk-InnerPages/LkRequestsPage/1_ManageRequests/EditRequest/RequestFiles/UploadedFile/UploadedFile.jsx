import s from './UploadedFile.module.scss';
import pdfIcon from "@/assets/img/pdfIcon.svg";
import trashMobile from "@/assets/img/trash-mobile.svg";
import trash from "@/assets/img/trash.svg";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";


const UploadedFile = ({uploadedFile, setFiles, filesLoading}) => {

  const isImage = uploadedFile.file.type.startsWith("image")
  const imgSrc = isImage ? URL.createObjectURL(uploadedFile.file)  : pdfIcon
  const isMobile = useMobileScreen()

  const handleDelete = () => {
    setFiles(prev => prev.filter(file => file.id !== uploadedFile.id))
  }

  return (
    <div className={s.fileContainer}>
      {
        isImage && <div className={s.imageContainer}>
          <img className={s.pictureImage} src={imgSrc} alt="img"/>
        </div>
      }

      {
        !isImage && (
          <div className={s.pdfContainer}>
            <img className={s.img} src={pdfIcon} alt="pdf"/>
            <div className={s.name}>
              {uploadedFile.file.name}
            </div>
          </div>
        )
      }

      <button className={s.trashButton} onClick={handleDelete}>
        <img src={isMobile ? trashMobile: trash} alt=""/>
      </button>

      {
        filesLoading.includes(uploadedFile.id) && (
          <div className={s.clockIndicator}>
            <MiniSpinner />
          </div>
        )
      }

    </div>
  )
}

export default UploadedFile;