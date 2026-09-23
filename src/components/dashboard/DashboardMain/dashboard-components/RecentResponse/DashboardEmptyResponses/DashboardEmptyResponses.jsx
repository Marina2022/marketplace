import s from './DashboardEmptyResponses.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const DashboardEmptyResponses = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tabs = useSelector(getTabs)

  const handleGoToCatalog = () => {
    const url = "/requests"

    const isInTabs = tabs.find((tab) => tab === url)

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }

    navigate(url, {
      state: {fromApp: true}
    })
  }

  return (
    <div className={s.emptyWrapper}>
      <div className={s.iconWrapper}>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 0.75H8.75V16.75L4.75 14.25L0.75 16.75V0.75Z" stroke="#3D4A66" strokeWidth="1.5"
                strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={s.title}>Откликов нет</div>
      <div className={s.text}>Отклики на ваши заявки и ваши ответы <br/>
        исполнителю появятся тут.
      </div>
      <Button onClick={handleGoToCatalog} white className={s.createRequestButton}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.125 10.0625C8.29962 10.0625 10.0625 8.29962 10.0625 6.125C10.0625 3.95038 8.29962 2.1875 6.125 2.1875C3.95038 2.1875 2.1875 3.95038 2.1875 6.125C2.1875 8.29962 3.95038 10.0625 6.125 10.0625Z"
            stroke="#3A3F49" strokeWidth="1.3125"/>
          <path d="M9.1875 9.1875L11.8125 11.8125" stroke="#3A3F49" strokeWidth="1.3125" strokeLinecap="round"/>
        </svg>
        <span>В каталог</span>
      </Button>
    </div>
  )
}

export default DashboardEmptyResponses;