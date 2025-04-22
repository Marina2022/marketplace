import s from './CategoriesModalOnMobile.module.scss';
import {useEffect} from "react";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const CategoriesModalOnMobile = ({setEditing,  children, trigger}) => {
  const handleClose = () =>{
    trigger('productCategoryId')
    setEditing(false)  
  }
  
const isMobile = useMobileScreen()
  useEffect(()=>{
    document.documentElement.style.overflow = 'hidden';
    
    return ()=>{
      document.documentElement.style.overflow = 'auto';
    }
  }, [isMobile])
  
  return (
    <div className={s.modal}>
      <div className={s.header}>
        <p>Выберите категорию</p>
        <button onClick={handleClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M0.790866 1.06997C0.30271 1.55813 0.30271 2.34959 0.790866 2.83774L6.09307 8.13995L0.788724 13.4443C0.300569 13.9325 0.300568 14.7239 0.788724 15.2121C1.27688 15.7002 2.06834 15.7002 2.55649 15.2121L7.86084 9.90772L13.1652 15.2121C13.6534 15.7003 14.4448 15.7003 14.933 15.2121C15.4212 14.724 15.4212 13.9325 14.933 13.4443L9.62861 8.13995L14.9309 2.8377C15.419 2.34954 15.419 1.55808 14.9309 1.06993C14.4427 0.581773 13.6512 0.581772 13.1631 1.06993L7.86084 6.37218L2.55863 1.06997C2.07048 0.581819 1.27902 0.581819 0.790866 1.06997Z"
                  fill="#3E5067"/>
          </svg>
        </button>
      </div>
      {children}
    </div>
    
  );
};

export default CategoriesModalOnMobile;