import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";
import {useState} from 'react';
const CreateReview = () => {



  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...newImages]);
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true, // Позволяет загружать несколько файлов
  });
  
  return (
    <div className="container">
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #cccccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >

        <input type="password" placeholder="Введи"/>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Отпустите файлы, чтобы загрузить их...</p>
        ) : (
          <p>Перетащите сюда изображения или кликните для выбора файлов</p>
        )}
      </div>
      <div className="preview">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.preview}
            alt="preview"
            style={{width: '100px', height: '100px', margin: '10px'}}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateReview;
