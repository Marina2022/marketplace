import {useRef} from 'react';
import s from './UploadedFiles.module.scss';
import ChatFileItem from "@/components/chat/chat-components/ChatMessages/UploadedFiles/ChatFileItem/ChatFileItem.jsx";
import {useMediaQuery} from "react-responsive";

const UploadedFiles = ({setFiles, files, filesLoading}) => {

  const isDesktop = useMediaQuery({minWidth: 1341});

  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={s.filesBlock}>
      <button className={s.clearBtn} onClick={() => setFiles([])}>Убрать все</button>

      {
        isDesktop && (
          <ul
            ref={sliderRef}
            className={`${s.files} scroll3`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
          >
            {
              files.map(file => <ChatFileItem key={file.id} file={file} filesLoading={filesLoading} setFiles={setFiles} />)
            }
          </ul>
        )
      }

      {
        !isDesktop && (
          <ul
            ref={sliderRef}
            className={`${s.filesMobile} scroll3`}
          >
            {
              files.map(file => <ChatFileItem key={file.id} file={file} filesLoading={filesLoading}  />)
            }
          </ul>
        )
      }
    </div>
  )
}

export default UploadedFiles;
