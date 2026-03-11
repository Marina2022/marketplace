import s from './InitialFile.module.scss';
import pdfIcon from "@/assets/img/pdfIcon.svg";
import trashMobile from "@/assets/img/trash-mobile.svg";
import trash from "@/assets/img/trash.svg";
import useMobileScreen from "@/hooks/useMobileScreen.js";


const InitialFile = ({initialFile, setInitialFiles}) => {

  const isImage = initialFile.contentType.startsWith("image")
  const imgSrc = isImage ? initialFile.url : pdfIcon
  const isMobile = useMobileScreen()

  const handleDelete = () => {
    console.log("handleDelete")
    setInitialFiles(prev => prev.filter(file => file.mediaFileId !== initialFile.mediaFileId))
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
              {initialFile.fileName}
            </div>
          </div>
        )
      }

      <button className={s.trashButton} onClick={handleDelete}>
        <img src={isMobile ? trashMobile: trash} alt=""/>
      </button>
    </div>
  )
}

export default InitialFile;