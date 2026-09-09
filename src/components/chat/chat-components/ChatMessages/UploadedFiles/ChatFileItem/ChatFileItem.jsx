import s from './ChatFileItem.module.scss';
import {formatFileSize} from "@/utils/chat.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const ChatFileItem = ({file, filesLoading, setFiles}) => {

  const arr = file.file.name.split(".")
  const ext = arr[arr.length - 1]

  const handleDelete = () => {
    setFiles(prev => prev.filter(fileItem => fileItem.id !== file.id))
  }

  return (
    <li className={s.fileItem}>
      <div className={s.extBlock}>{ext}</div>
      <div className={s.fileDesc}>
        <div className={s.name}>{file.file.name}</div>
        <div className={s.size}>{formatFileSize(file.file.size)}</div>
      </div>

      <button onClick={handleDelete} className={s.deleteBtn}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.75 2.75L8.25 8.25M8.25 2.75L2.75 8.25" stroke="#B6BBC3" strokeWidth="1.375" strokeLinecap="round"/>
        </svg>
      </button>

      {
        filesLoading.includes(file.id) && (
          <div className={s.clockIndicator}>
            <MiniSpinner black />
          </div>
        )
      }
    </li>
  );
};

export default ChatFileItem;