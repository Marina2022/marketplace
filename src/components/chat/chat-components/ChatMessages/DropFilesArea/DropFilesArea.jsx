// import s from './DropFilesArea.module.scss';
// import {useEffect, useState} from "react";
//
// const DropFilesArea = ({files, setFiles, setFilesLoading, filesLoading, dropProcess}) => {
//
//   const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = dropProcess
//
//   const [isWindowDragging, setIsWindowDragging] = useState(false);
//
//
//   useEffect(() => {
//     let dragCounter = 0;
//
//     const handleDragEnter = (e) => {
//       e.preventDefault();
//       dragCounter++;
//       if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
//         setIsWindowDragging(true);
//       }
//     }
//
//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       dragCounter--;
//       if (dragCounter === 0) {
//         setIsWindowDragging(false);
//       }
//     };
//
//     const handleDrop = () => {
//       dragCounter = 0;
//       setIsWindowDragging(false);
//     };
//
//     // Слушаем события перетаскивания на уровне всего окна браузера
//     window.addEventListener('dragenter', handleDragEnter);
//     window.addEventListener('dragleave', handleDragLeave);
//     window.addEventListener('drop', handleDrop);
//
//     return () => {
//       window.removeEventListener('dragenter', handleDragEnter);
//       window.removeEventListener('dragleave', handleDragLeave);
//       window.removeEventListener('drop', handleDrop);
//     };
//   }, []);
//
//   // Если пользователь не перетаскивает файлы в окно браузера,
//   // компонента вообще нет в DOM — скролл и клики работают на 100% штатно
//   if (!isWindowDragging) return null;
//
//   console.log("isDragActive = ", isDragActive)
//
//   return (
//     <div
//       {...getRootProps()}
//       className={`${s.dropFilesArea} ${isDragActive ? s.dropFilesAreaActive : ""}`}
//     >
//
//        <input {...getInputProps()} />
//     </div>
//   )
// }
//
// export default DropFilesArea;


import s from './DropFilesArea.module.scss';
import { useEffect, useState } from "react";

// const DropFilesArea = ({ files, setFiles, setFilesLoading, filesLoading, dropProcess }) => {
const DropFilesArea = ({ dropProcess }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = dropProcess;
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

  // todo - fileRejections описать!

  return (
    <div
      {...getRootProps()}
      className={`${s.dropFilesArea} ${isWindowDragging ? s.visible : ""} 
      ${isDragActive ? s.dropFilesAreaActive : ""}
      ${isDragReject ? s.dropFilesAreaReject : ""}
      `}
    >
      <input {...getInputProps()} />
    </div>
  );
};

export default DropFilesArea;
