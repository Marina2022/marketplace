import s from './DropFilesArea.module.scss';

const DropFilesArea = ({files, setFiles, setFilesLoading, filesLoading, dropProcess}) => {

  const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = dropProcess


  return (
    <div
      {...getRootProps()}
      className={`${s.dropFilesArea} ${isDragActive ? s.dropFilesAreaActive : ""}`}
    >

       <input {...getInputProps()} />
    </div>
  )
}

export default DropFilesArea;