import s from './RequestFiles.module.scss';
import FilesBlock from "@/components/RequestDetailsPage/request-components/RequestFiles/FilesBlock/FilesBlock.jsx";

const RequestFiles = ({request}) => {
  return (
    <div className={s.requestFiles}>
      <h3 className={s.title}>Файлы</h3>

      <FilesBlock files={request.attachments} />
    </div>
  );
};

export default RequestFiles;