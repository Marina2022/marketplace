import s from './NewCompanyPopup.module.scss';
import Popup from "@/components/ui/Popup/Popup.jsx";
import {useState} from "react";
import axios from "@/api/axiosInstance.js";
import Button from "@/components/ui/Button/Button.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {getUserCompanies} from "@/store/userSlice.js";
import {useDispatch} from "react-redux";

const NewCompanyPopup = ({setPopupIsOpen}) => { 
  const dispatch = useDispatch()
  const handleAddCompany = async () => {

    if (!info) return

    const body = {
      companyName: info.shortName,
      inn: info.inn,
      kpp: info.kpp,
      ogrn: info.ogrn,
      legalAdress: info.address,
      postalAdress: info.address
    }

    try {
      setInfoIsLoading(true)
      const resp = await axios.post('companies/addDetails', body)
      setPopupIsOpen(false)
      dispatch(getUserCompanies())
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    } finally {
      setInfoIsLoading(false)
    }
  }

  const sendInn = async () => {
    try {
      setInfoIsLoading(true)
      const resp = await axios.post('companies/findDetails', {inn: innValue})
      setInfo(resp.data)
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    } finally {
      setInfoIsLoading(false)
    }
  }

  const [info, setInfo] = useState(null)
  const [infoIsLoading, setInfoIsLoading] = useState(false)
  const handleInnChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    setInnValue(inputValue)
  }
  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      sendInn()
    }
  }

  const [innValue, setInnValue] = useState('')

  return (
    <Popup setIsPopupOpen={setPopupIsOpen} popupClassName={s.popup} withCloseBtn={true}>
      <h3 className={s.title}>Добавить организацию</h3>
      <p className={s.label}>ИНН</p>
      <p className={s.miniText}>Введите ИНН организации, остальные данные будут взяты из базы</p>
      <input disabled={infoIsLoading} value={innValue} onKeyDown={enterHandler} onChange={handleInnChange} autoFocus
             className={s.input} type="text"/>
      {
        info && <div className={s.detailsBlock}>
          <h4 className={s.subTitle}>Основная информация об организации</h4>
          <p className={s.name}>{info.shortName}</p>

          <p className={s.infoLabel}>ИНН</p>
          <p className={s.infoValue}>{info.inn}</p>

          <p className={s.infoLabel}>КПП</p>
          <p className={s.infoValue}>{info.kpp}</p>

          <p className={s.infoLabel}>ОГРН</p>
          <p className={s.infoValue}>{info.ogrn}</p>

          <p className={s.infoLabel}>Юридический адрес</p>
          <p className={s.infoValue}>{info.address}</p>

          <p className={s.infoLabel}>Фактический адрес</p>
          <p className={s.infoValue}>{info.address}</p>

          <Button onClick={handleAddCompany} className={s.btn}>
            {
              infoIsLoading ? <MiniSpinner/> : <span>Добавить&nbsp;организацию</span>
            }
          </Button>
        </div>
      }
    </Popup>
  );
};

export default NewCompanyPopup;