import {useEffect, useRef, useState} from "react";
import s from './ContextMenu.module.scss';
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";

const ContextMenu = ({product, linked = false, getProducts}) => {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const profileId = useSelector(getActiveProfileId)

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);


  const handleEdit = () => {
    navigate(`/lk/edit-product/${product.productVariantId}`)
    setOpen(false)
  }

  const handleCopy = async () => {
    await axiosInstance.post(`/seller/${profileId}/products/${product.productVariantId}/copy`)
    getProducts()
    setOpen(false)
  }

  const handleArchive = async () => {
    await axiosInstance.post(`/seller/product/${product.productVariantId}/archivate`)
    getProducts()
    setOpen(false)
  }


  const handleRestore = async () => {
    await axiosInstance.post(`/seller/product/${product.productVariantId}/restore-archivated`)
    getProducts()
    setOpen(false)
  }

  const handleUnlink = async () => {
    await axiosInstance.post(`/seller/${profileId}/products/${product.productVariantId}/unlink`)
    getProducts()
    setOpen(false)
  }

  return (
    <div className={s.contextMenuWrapper} ref={menuRef}>
      <button onClick={() => setOpen(true)} className={s.btn}>
        <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.16619 12.3217C3.16619 12.7436 3.01705 13.1058 2.71875 13.4084C2.41619 13.7067 2.05398 13.8558 1.6321 13.8558C1.21449 13.8558 0.856534 13.7067 0.558239 13.4084C0.259943 13.1058 0.110795 12.7436 0.110795 12.3217C0.110795 11.9126 0.259943 11.5547 0.558239 11.2479C0.856534 10.9411 1.21449 10.7876 1.6321 10.7876C1.91335 10.7876 2.17116 10.8601 2.40554 11.005C2.63565 11.1456 2.82102 11.331 2.96165 11.5611C3.09801 11.7912 3.16619 12.0447 3.16619 12.3217ZM3.16619 6.9604C3.16619 7.38228 3.01705 7.7445 2.71875 8.04705C2.41619 8.34535 2.05398 8.4945 1.6321 8.4945C1.21449 8.4945 0.856534 8.34535 0.558239 8.04705C0.259943 7.7445 0.110795 7.38228 0.110795 6.9604C0.110795 6.55131 0.259943 6.19336 0.558239 5.88654C0.856534 5.57972 1.21449 5.42631 1.6321 5.42631C1.91335 5.42631 2.17116 5.49876 2.40554 5.64364C2.63565 5.78427 2.82102 5.96964 2.96165 6.19975C3.09801 6.42987 3.16619 6.68342 3.16619 6.9604ZM3.16619 1.59908C3.16619 2.02095 3.01705 2.38317 2.71875 2.68572C2.41619 2.98402 2.05398 3.13317 1.6321 3.13317C1.21449 3.13317 0.856534 2.98402 0.558239 2.68572C0.259943 2.38317 0.110795 2.02095 0.110795 1.59908C0.110795 1.18999 0.259943 0.832031 0.558239 0.525213C0.856534 0.218395 1.21449 0.0649857 1.6321 0.0649857C1.91335 0.0649857 2.17116 0.137429 2.40554 0.282315C2.63565 0.42294 2.82102 0.60831 2.96165 0.838423C3.09801 1.06854 3.16619 1.32209 3.16619 1.59908Z"
            fill="#676767"/>
        </svg>
      </button>

      {open && (
        <div className={s.menuBlock}>

          {/*Пункты для обычного товара*/}
          {!linked && product.productStatus !== 'В архиве' && <ul>

            <li onClick={handleEdit} className={s.menuItem}>Редактировать товар</li>
            <li onClick={handleCopy} className={s.menuItem}>Создать копию</li>
            <li onClick={handleArchive} className={s.menuItem}>Перенести в архив</li>

          </ul>}

          {/*Пункты для товара в архиве*/}
          {!linked && product.productStatus === 'В архиве' && <ul>
            <li onClick={handleRestore} className={s.menuItem}>Восстановить</li>
          </ul>}

          {/*Пункты для связанного товара*/}
          {linked && <ul>
            <li onClick={handleEdit} className={s.menuItem}>Редактировать товар</li>
            <li onClick={handleCopy} className={s.menuItem}>Создать копию</li>
            <li onClick={handleUnlink} className={s.menuItem}>Отвязать товар</li>
          </ul>}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
