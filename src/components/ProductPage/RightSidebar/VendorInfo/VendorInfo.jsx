import s from './VendorInfo.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import star from "@/assets/img/star.svg"
import check from "@/assets/img/blue-check.svg"
const VendorInfo = ({vendor}) => {
  const startOnMarketDate = new Date(vendor.startOnMarketDate)
  const startOnMarketYear = startOnMarketDate.getFullYear() 
  const foundationDate = new Date(vendor.foundationDate).toLocaleDateString('ru')

  vendor.shopRating = 4.5
  return (
    <div className={s.wrapper}>      
      <div className={s.header}>
        {/*<img className={s.logo} src={`${BASE_URL}${vendor.shopProfileImageUrl}`} alt="company logo"/>*/}
        <img className={s.logo} src={vendor.shopProfileImageUrl} alt="company logo"/>
        <div>
          <div className={s.shopName}>{vendor.shopName}</div>
          <div className={s.companyName}>{vendor.companyName}</div>
        </div>
      </div>

      <div className={s.infoBlock}>
        <div className={s.mainInfo}>
          <div className={s.row}>
            <span className={s.infoLabel}>Рейтинг</span>
            {
              vendor.shopRating ?
                <div className={s.infoValue}>
                  <img className={s.star} src={star} alt="star"/>
                  <span>
                  {vendor.shopRating}/5
                </span>
                </div>
                :
                <div className={s.infoValue}>
                  Нет рейтинга
                </div>
            }
          </div>
          <div className={s.row}>
            <span className={s.infoLabel}>На маркете</span>
            <span className={s.infoValue}>начиная с {startOnMarketYear}</span>
          </div>
        </div>
        
        {
          vendor.isCompanySideSectionShown && (
            <div className={s.additionalBlock}>
              <h4 className={s.businessType}>{vendor.businessType}</h4>

              <div className={s.additionalInfoRow}>
                <img className={s.check} src={check} alt="check"/>
                <span className={s.additionalInfoLabel}>Количество сотрудников:</span>
                <span className={s.additionalInfoValue}>{vendor.employeesNumber}</span>
              </div>
              <div className={s.additionalInfoRow}>
                <img className={s.check} src={check} alt="check"/>
                <span className={s.additionalInfoLabel}>Год основания:</span>
                <span className={s.additionalInfoValue}> {foundationDate} </span>
              </div>
            </div>
          )
        }        
      </div>
    </div>
  );
};

export default VendorInfo;