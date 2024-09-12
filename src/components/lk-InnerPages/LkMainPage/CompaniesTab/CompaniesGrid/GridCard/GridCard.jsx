import axios from "@/api/axiosInstance.js";
import s from './GridCard.module.scss';
import {useState} from "react";
import Popup from "@/components/ui/Popup/Popup.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {getUserCompanies} from "@/store/userSlice.js";
import {useDispatch} from "react-redux";

const GridCard = ({company, activeCompanyName}) => {

  let active = false
  if (company.companyName === activeCompanyName) active = true
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [showWarning, setShowWarning] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()
  const handleDelete = async () => {

    try {
      setSending(true)
      const resp = await axios(`company/${company.companyId}/deleteWarning`)

      if (resp.data.hasProductsInSale || resp.data.balance > 0) {

        setShowWarning(true)
      } else {
        setShowConfirm(true)
      }

    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  const handleRealDelete = async () => {
    try {
      setDeleting(true)
      await axios.delete(`companies/${company.companyId}`)
      dispatch(getUserCompanies())
      setShowConfirm(false)

    } catch (err) {
      console.log(err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className={active ? s.gridCardActive : s.gridCard}>
        <div className={s.cardContent}>
          <div className={s.titleWrapper}>
            <h3 className={s.title}>{company.companyName}</h3>
            <button disabled={sending} onClick={handleDelete} className={s.deleteBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="3E5067" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.9985 4.48669C13.9851 4.48669 13.9651 4.48669 13.9451 4.48669C10.4185 4.13336 6.89848 4.00002 3.41181 4.35336L2.05181 4.48669C1.77181 4.51336 1.52515 4.31336 1.49848 4.03336C1.47181 3.75336 1.67181 3.51336 1.94515 3.48669L3.30515 3.35336C6.85181 2.99336 10.4451 3.13336 14.0451 3.48669C14.3185 3.51336 14.5185 3.76002 14.4918 4.03336C14.4718 4.29336 14.2518 4.48669 13.9985 4.48669Z"/>
                <path
                  d="M5.66846 3.81337C5.6418 3.81337 5.61513 3.81337 5.5818 3.80671C5.31513 3.76004 5.12846 3.50004 5.17513 3.23337L5.3218 2.36004C5.42846 1.72004 5.57513 0.833374 7.12846 0.833374H8.87513C10.4351 0.833374 10.5818 1.75337 10.6818 2.36671L10.8285 3.23337C10.8751 3.50671 10.6885 3.76671 10.4218 3.80671C10.1485 3.85337 9.88846 3.66671 9.84846 3.40004L9.7018 2.53337C9.60846 1.95337 9.58846 1.84004 8.8818 1.84004H7.13513C6.42846 1.84004 6.41513 1.93337 6.31513 2.52671L6.1618 3.39337C6.1218 3.64004 5.90846 3.81337 5.66846 3.81337Z"/>
                <path
                  d="M10.1416 15.1667H5.86156C3.53489 15.1667 3.44156 13.88 3.36823 12.84L2.93489 6.12672C2.91489 5.85338 3.12823 5.61338 3.40156 5.59338C3.68156 5.58005 3.91489 5.78672 3.93489 6.06005L4.36823 12.7734C4.44156 13.7867 4.46823 14.1667 5.86156 14.1667H10.1416C11.5416 14.1667 11.5682 13.7867 11.6349 12.7734L12.0682 6.06005C12.0882 5.78672 12.3282 5.58005 12.6016 5.59338C12.8749 5.61338 13.0882 5.84672 13.0682 6.12672L12.6349 12.84C12.5616 13.88 12.4682 15.1667 10.1416 15.1667Z"/>
                <path
                  d="M9.10672 11.5H6.88672C6.61339 11.5 6.38672 11.2733 6.38672 11C6.38672 10.7267 6.61339 10.5 6.88672 10.5H9.10672C9.38005 10.5 9.60672 10.7267 9.60672 11C9.60672 11.2733 9.38005 11.5 9.10672 11.5Z"/>
                <path
                  d="M9.66536 8.83337H6.33203C6.0587 8.83337 5.83203 8.60671 5.83203 8.33337C5.83203 8.06004 6.0587 7.83337 6.33203 7.83337H9.66536C9.9387 7.83337 10.1654 8.06004 10.1654 8.33337C10.1654 8.60671 9.9387 8.83337 9.66536 8.83337Z"/>
              </svg>
            </button>
          </div>

          <div className={s.text}>
            <div className={s.innKpp}>
              <div>ИНН {company.inn}</div>
              <div>КПП {company.kpp}</div>
            </div>
            <div className={s.ogrn}>ОГРН {company.ogrn}</div>
            <div className={s.address}>{company.legalAdress}</div>
          </div>
          <div className={s.balance}>
            <span className={s.balanceLabel}>Баланс счета: </span>
            <span className={s.balanceValue}>{company.accountBalance.toLocaleString()}&nbsp;₽</span>
          </div>
        </div>
      </div>

      {
        showWarning && <Popup setIsPopupOpen={setShowWarning} popupClassName={s.popup}>
          <h4 className={s.popupTitle}>Перед удаление обратите внимание</h4>
          <ul className={s.warningList}>
            <li className={s.warningListItem}>Удалите оставшиеся зарегистрированные товары</li>
            <li className={s.warningListItem}>Выведите средства с вашего баланса</li>
          </ul>
          <div className={s.buttons}>
            <Button onClick={() => setShowWarning(false)} className={s.btn}>Понятно</Button>
          </div>
        </Popup>
      }

      {
        showConfirm && <Popup setIsPopupOpen={setShowConfirm} popupClassName={s.popup}>
          <h4 className={s.popupTitle}>Вы собираетесь удалить организацию</h4>
          <p className={s.continue}>Продолжить?</p>
          <div className={s.buttons}>
            <Button onClick={() => setShowConfirm(false)} className={s.grayBtn}>Не&nbsp;удалять</Button>
            <Button onClick={handleRealDelete} className={s.btn}>
              {
                deleting ? <MiniSpinner/> : <span>Удалить&nbsp;компанию</span>
              }

            </Button>
          </div>
        </Popup>
      }


    </>
  );
};

export default GridCard;