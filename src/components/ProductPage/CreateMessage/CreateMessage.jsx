import s from './CreateMessage.module.scss';
import {Link, useParams} from "react-router-dom";
import backArrow from "@/assets/img/back-arror.svg";
import axios from "@/api/axiosInstance.js";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import ProductCardForMessage
  from "@/components/ProductPage/CreateMessage/ProductCardForMessage/ProductCardForMessage.jsx";

import docThumbnail from '@/assets/img/docThumbnail.svg'
import Button from "@/components/ui/Button/Button.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const CreateMessage = () => {

  const FILES_MAX_NUMBER = 5
  const {productHandle, sku} = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMobileScreen()

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
      setFilesInputError(`Вы можете добавить только  ${availableSlots === 0 ? "5" : availableSlots} файл(ов)`);
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
      {
        !isMobile && <Link className={s.backLink} to={`/product/${productHandle}?sku=${sku}`}>
          <img src={backArrow} alt="back arror"/>
          <span>Назад к карточке товара</span>
        </Link>
      }
      <h1 className={s.title}>
        {
          isMobile ? <Link to={`/product/${productHandle}?sku=${sku}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.38094 12.5466C6.25427 12.5466 6.1276 12.5 6.0276 12.4L1.98094 8.35329C1.7876 8.15996 1.7876 7.83996 1.98094 7.64662L6.0276 3.59996C6.22094 3.40662 6.54094 3.40662 6.73427 3.59996C6.9276 3.79329 6.9276 4.11329 6.73427 4.30662L3.04094 7.99996L6.73427 11.6933C6.9276 11.8866 6.9276 12.2066 6.73427 12.4C6.64094 12.5 6.5076 12.5466 6.38094 12.5466Z"
                fill="#292D32"/>
              <path
                d="M13.6653 8.5H2.44531C2.17198 8.5 1.94531 8.27333 1.94531 8C1.94531 7.72667 2.17198 7.5 2.44531 7.5H13.6653C13.9386 7.5 14.1653 7.72667 14.1653 8C14.1653 8.27333 13.9386 8.5 13.6653 8.5Z"
                fill="#292D32"/>
            </svg>
          </Link> : ''
        }
        <span>Сообщение продавцу</span>
      </h1>
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
        <Button className={s.btn}>Отправить</Button>
      </form>
    </div>
  );
};

export default CreateMessage;