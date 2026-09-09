import s from './DropFilesArea.module.scss';
import {useEffect, useState} from "react";

const DropFilesArea = ({dropProcess}) => {
  const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = dropProcess;
  const [isWindowDragging, setIsWindowDragging] = useState(false);

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) {
        setIsWindowDragging(false);
      }
    };

    const handleDrop = () => {
      dragCounter = 0;
      setIsWindowDragging(false);
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div
      {...getRootProps()}
      className={`${s.dropFilesArea} ${isWindowDragging ? s.visible : ""} 
      ${isDragActive ? s.dropFilesAreaActive : ""}
      ${isDragReject ? s.dropFilesAreaReject : ""}
      `}
    >

      {
        isWindowDragging && isDragActive && !isDragReject && (
          <div className={s.content}>
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="104" height="104" rx="16" fill="#ECEFF5"/>
              <path d="M52 60.1854V44.3672" stroke="black" strokeWidth="2.18182" strokeLinecap="round"
                    strokeLinejoin="round"/>
              <path d="M44.9102 51.4581L52.0011 44.3672L59.092 51.4581" stroke="black" strokeWidth="2.18182"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M41.9102 63.4531H62.092" stroke="black" strokeWidth="2.18182" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
            <div className={s.title}>Отпустите чтобы прикрепить</div>
            <div className={s.text}>Файлы добавятся к сообщению — отправка по кнопке</div>
          </div>
        )
      }

      {
        isWindowDragging && isDragActive && isDragReject && (
          <div className={s.content}>
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="104" height="104" rx="16" fill="#ECEFF5"/>
              <path d="M52.0014 41.6328L63.456 61.2692H40.5469L52.0014 41.6328Z" stroke="#B0822F" strokeWidth="2.18182"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M52 49V53.9091" stroke="#B0822F" strokeWidth="2.18182" strokeLinecap="round"
                    strokeLinejoin="round"/>
              <path
                d="M52.0014 58.6825C52.5286 58.6825 52.956 58.2552 52.956 57.728C52.956 57.2008 52.5286 56.7734 52.0014 56.7734C51.4742 56.7734 51.0469 57.2008 51.0469 57.728C51.0469 58.2552 51.4742 58.6825 52.0014 58.6825Z"
                stroke="#B0822F" strokeWidth="2.18182" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className={s.title}>Некоторые файлы нельзя прикрепить</div>
            <div className={s.text}>Разрешены PDF, DWG, XLSX, DOCX и изображения</div>
          </div>
        )
      }

      <input {...getInputProps()} />
    </div>
  )
}

export default DropFilesArea;
