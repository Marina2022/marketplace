import {formatFileSize} from "@/utils/oneRequest.js";

const FileAddedInfo = ({event}) => {

  return (
    <>
      {event.file.fileName} — {formatFileSize(event.file.fileSize)}
    </>
  );
};

export default FileAddedInfo;