import {useDropzone} from 'react-dropzone';
import {useState} from 'react';

const Lk = () => {


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

export default Lk;



//
// const handleUpload = async () => {
//   const formData = new FormData();
//
//   images.forEach((image) => {
//     formData.append('files', image);
//   });
//
//   try {
//     setUploading(true);
//     const response = await axios.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log('Успешная загрузка', response.data);
//   } catch (error) {
//     console.error('Ошибка загрузки', error);
//   } finally {
//     setUploading(false);
//   }
// };



/// location state - Link с параметрами

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import UserProfile from './UserProfile';

function App() {
  return (
    <Router>
      <div>
        <Link to="/user" state={{ id: 1, name: 'Alice' }}>Профиль пользователя Alice</Link>
        <Link to="/user" state={{ id: 2, name: 'Bob' }}>Профиль пользователя Bob</Link>

        <Routes>
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

// export default App;
//
// // UserProfile.js
// import React from 'react';
// import { useLocation } from 'react-router-dom';
//
// function UserProfile() {
//   const location = useLocation();
//   const { id, name } = location.state || {};
//
//   return (
//     <div>
//       <h1>Профиль пользователя</h1>
//       <p>ID: {id}</p>
//       <p>Имя: {name}</p>
//     </div>
//   );
// }
//
// export default UserProfile;