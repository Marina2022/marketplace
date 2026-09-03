import s from './FilesBlock.module.scss';
import {formatFileSize} from "@/utils/oneRequest.js";

const FilesBlock = ({files}) => {

  if (files.length === 0) return null


  return (
    <ul className={s.filesList}>
      {
        files.map(file => {

          const isImage = file.contentType.startsWith("image")
          const extension = file.fileName.split(".")[1]

          const fileType = isImage ? "img" : extension

          return (
            <li key={file.mediaFileId} className={s.fileItem}>
              <a className={s.fileLink} href={file.url} target="_blank" rel="noopener noreferrer">
                <div className={s.fileType}>
                  {fileType}
                </div>

                <div className={s.fileDesc}>
                  <div className={s.name}>
                    {file.fileName}
                  </div>

                  <div className={s.fileSize}>
                    <span>{formatFileSize(file.fileSize)}</span>

                    <div className={s.iconWrapper}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" fill="white"/>
                        <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="currentColor" fill="none"/>
                        <path
                          d="M5 11V12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H12C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V11M7 9L9 11L11 9M9 11V5"
                          stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          )
        })
      }
    </ul>
  );
};

export default FilesBlock;