import s from './types-info.module.scss';
import {formatFileSize} from "@/utils/oneRequest.js";

const FileRemovedInfo = ({event}) => {
  return (
    <>
      <span className={s.lineThrough}>{event.file.fileName}</span> — {formatFileSize(event.file.fileSize)}
    </>
  );
};

export default FileRemovedInfo;