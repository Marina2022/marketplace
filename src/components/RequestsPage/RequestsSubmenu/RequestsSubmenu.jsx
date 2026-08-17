import s from './RequestsSubmenu.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getRecentCategories} from "@/store/requestsSlice.js";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";

const RequestsSubmenu = () => {

  const recentCategories = useSelector(getRecentCategories)
  const tabs = useSelector(getTabs)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [popCats, setPopCats] = useState([])

  useEffect(() => {

    const getPopCats = async () => {
      try {
        const resp = await axios('/request-categories/popular')
        setPopCats(resp.data)

      } catch (err) {
        console.log(err)
      }
    }

    getPopCats()

  }, [])

  const handleCatClick = (node) => {
    const url = `/requests/${node.slug}-${node.shortId}`
    const isInTabs = tabs.find((tab) => tab === url)
    navigate(url, {
      state: { fromApp: true }
    })

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
  }


  return (
    <div className={s.submenuWrapper}>
      <div className={s.subheader}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.5 2.5V6.5H9.5M12.5 6.5C12.5 7.28793 12.3448 8.06815 12.0433 8.7961C11.7417 9.52405 11.2998 10.1855 10.7426 10.7426C10.1855 11.2998 9.52405 11.7417 8.7961 12.0433C8.06815 12.3448 7.28793 12.5 6.5 12.5C5.71207 12.5 4.93185 12.3448 4.2039 12.0433C3.47595 11.7417 2.81451 11.2998 2.25736 10.7426C1.70021 10.1855 1.25825 9.52405 0.956723 8.7961C0.655195 8.06815 0.5 7.28793 0.5 6.5C0.5 4.9087 1.13214 3.38258 2.25736 2.25736C3.38258 1.13214 4.9087 0.5 6.5 0.5C8.0913 0.5 9.61742 1.13214 10.7426 2.25736C11.8679 3.38258 12.5 4.9087 12.5 6.5Z"
            stroke="#658092" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Недавние категории</span>
      </div>
      <ul className={s.list1}>
        {
          [...recentCategories].reverse().map((category) => {
            return (
              <li onClick={() => handleCatClick(category)} className={s.catItem} key={category.id}>{category.name}</li>
            )
          })
        }
      </ul>

      <div className={s.subheader}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.5 2.5V6.5H9.5M12.5 6.5C12.5 7.28793 12.3448 8.06815 12.0433 8.7961C11.7417 9.52405 11.2998 10.1855 10.7426 10.7426C10.1855 11.2998 9.52405 11.7417 8.7961 12.0433C8.06815 12.3448 7.28793 12.5 6.5 12.5C5.71207 12.5 4.93185 12.3448 4.2039 12.0433C3.47595 11.7417 2.81451 11.2998 2.25736 10.7426C1.70021 10.1855 1.25825 9.52405 0.956723 8.7961C0.655195 8.06815 0.5 7.28793 0.5 6.5C0.5 4.9087 1.13214 3.38258 2.25736 2.25736C3.38258 1.13214 4.9087 0.5 6.5 0.5C8.0913 0.5 9.61742 1.13214 10.7426 2.25736C11.8679 3.38258 12.5 4.9087 12.5 6.5Z"
            stroke="#658092" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Популярные сегодня</span>
      </div>
      <ul className={s.list2}>
        {
          popCats.map((category) => {
            return (
              <li onClick={() => handleCatClick(category)} className={s.catItem} key={category.id}>{category.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default RequestsSubmenu;