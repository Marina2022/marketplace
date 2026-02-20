import s from './FilesBlock.module.scss';
import pdfIcon from '@/assets/img/pdfIcon.svg';

const FilesBlock = ({files}) => {

  if (files.length === 0) return null


  return (
    <div className={s.filesBlock}>
      <h4 className={s.title}>Файлы и изображения</h4>

      <ul className={s.filesList}>
        {
          files.map(file => {

            const isImage = file.contentType === "image/png"
            const imgSrc = isImage ? file.url : pdfIcon

            return (
              <li key={file.id} className={s.fileItem}>
                <a className={s.fileLink} href={file.url} target="_blank" rel="noopener noreferrer">
                  <img className={isImage ? s.imgBorder : s.img} src={imgSrc} alt="img"/>
                  <div className={s.name}>
                    {file.fileName}
                  </div>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default FilesBlock;