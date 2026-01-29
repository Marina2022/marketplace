import s from './ShowCatsButton.module.scss';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import CategoryDropdownDesktop
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/CategoryDropdownDesktop.jsx";
import CatsPopupMobile
  from "@/components/layout/categoryDropdowns/CategoriesMobile/CatsPopupMobile/CatsPopupMobile.jsx";

const ShowCatsButton = () => {

  const location = useLocation()
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(true)  // todo должно быть false

  console.log({categoryDropdownOpen})

  const [categoriesForDropdown, setCategoriesForDropdown] = useState(null)
  const [requestsForDropdown, setRequestsForDropdown] = useState(null)
  const [categoriesForDropdownLoading, setCategoriesForDropdownLoading] = useState(false)
  const [requestsForDropdownLoading, setRequestsForDropdownLoading] = useState(false)

  // useEffect(() => {  // todo - раскомментируй
  //   setTimeout(() => {
  //     setCategoryDropdownOpen(false)
  //   }, 400)
  //
  // }, [location]);

  useEffect(() => {
    const getCatsForCatsDropdown = async () => {
      try {
        setCategoriesForDropdownLoading(true)
        const response = await axiosInstance('categories-tree')
        setCategoriesForDropdown(response.data.categories)
      } catch (err) {
        console.log(err)
      } finally {
        setCategoriesForDropdownLoading(false)
      }
    }

    const getRequestForCatsDropdown = async () => {
      try {
        setRequestsForDropdownLoading(true)
        const response = await axiosInstance('request-categories-tree')
        setRequestsForDropdown(response.data.requestCategories)
      } catch (err) {
        console.log(err)
      } finally {
        setRequestsForDropdownLoading(false)
      }
    }

    getCatsForCatsDropdown()
    getRequestForCatsDropdown()
  }, [])

  const handleCatsBtnClick = () => {
    setCategoryDropdownOpen(prev => !prev)
  }

  return (
    <div>
      <button onClick={handleCatsBtnClick} className={s.catalogBtnMobile}>
        <svg className={categoryDropdownOpen ? s.menuItemCatsActive : s.menuItemCats} width="20" height="21"
             viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 0.75H18.75" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0.75 5.75H18.75" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0.75 10.75H18.75" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0.75 15.541H6.375" strokeWidth="1.5" strokeLinecap="round"/>
          <path
            d="M13.125 18.6989C14.989 18.6989 16.5 17.285 16.5 15.5409C16.5 13.7967 14.989 12.3828 13.125 12.3828C11.261 12.3828 9.75 13.7967 9.75 15.5409C9.75 17.285 11.261 18.6989 13.125 18.6989Z"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.9375 18.1719L17.625 19.7509" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>


      {
        categoryDropdownOpen && <CatsPopupMobile
          setCategoryDropdownOpen={setCategoryDropdownOpen}
          categoriesForDropdown={categoriesForDropdown}
          requestsForDropdown={requestsForDropdown}
          categoriesForDropdownLoading={categoriesForDropdownLoading}
          requestsForDropdownLoading={requestsForDropdownLoading}
        />


      }

    </div>
  )
}

export default ShowCatsButton;