import s from './CreateMessage.module.scss';
import {Link, useParams} from "react-router-dom";
import backArrow from "@/assets/img/back-arror.svg";
import axios from "@/api/axiosInstance.js";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import ProductCardForMessage
  from "@/components/ProductPage/CreateMessage/ProductCardForMessage/ProductCardForMessage.jsx";

import docThumbnail from '@/assets/img/docThumbnail.svg'

const CreateMessage = () => {

  const FILES_MAX_NUMBER = 5

  const {productHandle, sku} = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await axios(`/products/${productHandle}?sku=${sku}`)
        setProduct(resp.data)

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getProduct()
  }, [])

  const MAX_NUMBER = 4000
  const [currentNumber, setCurrentNumber] = useState(0)
  const [messageValue, setMessageValue] = useState('')

  const inputMessageHandler = (e) => {
    if (+e.target.value.length > MAX_NUMBER) return

    setMessageValue(e.target.value)
    setCurrentNumber(e.target.value.length)
  }

  const [files, setFiles] = useState([]);
  const [filesInputError, setFilesInputError] = useState(null);

  const handleFileChange = (e) => {
    setFilesInputError(null)
    const selectedFiles = Array.from(e.target.files);

    // Проверяем, сколько файлов можно еще добавить
    const availableSlots = 5 - files.length;

    if (selectedFiles.length > availableSlots) {
      setFilesInputError(`Вы можете добавить только ${availableSlots} файл(ов)`);
      if (files.length === 5) {
        setTimeout(() => {
          setFilesInputError(null)
        }, 1500)
      }
      return;
    }

    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  if (isLoading) return <Spinner/>

  return (
    <div className="container">
      <Link className={s.backLink} to={`/product/${productHandle}?sku=${sku}`}>
        <img src={backArrow} alt="back arror"/>
        <span>Назад к карточке товара</span>
      </Link>
      <h1 className={s.title}>Сообщение продавцу</h1>
      <div className={s.shopNameBlock}>
        {product.productVendor.shopName}
      </div>
      <ProductCardForMessage product={product} sku={sku}/>

      <form>
        <div className={s.messageWrapper}>
        <textarea
          value={messageValue}
          onChange={inputMessageHandler}
          className={s.message}
          placeholder="Пожалуйста, напишите ваше сообщение. Укажите детали, спецификации и другие требования.">          
        </textarea>

          <div className={s.symbolsQuantity}>{currentNumber}/{MAX_NUMBER}</div>
        </div>
        <div className={s.fileInputBlock}>

          {/*показывать - если привьюшки есть*/}
          {
            files.length !== 0 && <div className={s.previewsWrapper}>

              <ul className={s.previews}>

                {files.map((fileData, index) => (
                  <li key={index} className={s.previewItem}>
                    {fileData.preview ? (
                      <div className={s.imgWrapper}>
                        <img
                          src={fileData.preview}
                          alt={`Preview ${index + 1}`}
                          className={s.imgThumbnail}
                        />
                      </div>
                    ) : (
                      <div className={s.docItem}>
                        <img
                          src={docThumbnail}
                          alt="Document Thumbnail"
                          className={s.thumbnail}
                        />
                        <p className={s.docText}>{fileData.file.name}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          }

          <div className={s.inputWrapper}>
            <label className={s.fileInputLabel} htmlFor="fileInput">
              Добавить файлы
            </label>
            <input onChange={handleFileChange} id="fileInput" className={s.fileInput} type="file"
                   accept="image/*, application/pdf" multiple/>
            <span className={s.added}>Добавлено ({files.length}/{FILES_MAX_NUMBER})</span>

            {
              filesInputError && <div className={s.filesInputError}>{filesInputError}</div>
            }
          </div>

        </div>

      </form>

    </div>
  );
};

export default CreateMessage;