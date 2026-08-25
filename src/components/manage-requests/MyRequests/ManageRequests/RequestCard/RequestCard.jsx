import s from './RequestCard.module.scss';
import {requestCardMenuButton, statusColors} from "@/consts/requests.jsx";
import placeHolderImg from "@/assets/img/lk/lk-requests/placeholder.png";

import {formatDate, getChatsCountText, getNewChatsNewText} from "@/utils/requests.js";
import {useRef, useState} from "react";
import RequestCardTags
  from "@/components/manage-requests/MyRequests/ManageRequests/RequestCard/RequestCardTags/RequestCardTags.jsx";
import DropdownRequestActions
  from "@/components/manage-requests/MyRequests/ManageRequests/DropdownRequestActions/DropdownRequestActions.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTabs, setTabs} from "@/store/tabsSlice.js";

const RequestCard = ({request, resetRequests, setRequestToEdit}) => {

    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tabs = useSelector(getTabs)

    const menuBtnRef = useRef(null);

    const handleMenuClick = (e) => {
      e.stopPropagation();
      setShowMenu(prev => !prev)
    }

    const onClose = () => {
      setShowMenu(false)
    }

    const performAction = async (action, resetRequest = null) => {

      const handlePause = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/pause`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest() // для EditRequest вроде
      }

      const handleResume = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/resume`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest()
      }

      const handleRenew = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/renew`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest()
      }

      const handleComplete = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/complete`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest()
      }

      const handleCancel = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/cancel`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest()
      }

      const handleDelete = async () => {
        await axiosInstance.delete(`/requests/${request.requestId}`)
        onClose()
        resetRequests()
        if (resetRequest) resetRequest()
      }

      const handleSubmit = async () => {
        await axiosInstance.post(`/requests/${request.requestId}/submit`)
        resetRequests()
        if (resetRequest) resetRequest()
        onClose()
      }

      const handleEdit = () => {
        setRequestToEdit(request)
        onClose()
      }

      if (action === "pause") {
        return await handlePause()
      }

      if (action === "resume") {
        return await handleResume()
      }

      if (action === "cancel") {
        return await handleCancel()
      }

      if (action === "renew") {
        return await handleRenew()
      }

      if (action === "complete") {
        return await handleComplete()
      }

      if (action === "delete") {
        return await handleDelete()
      }

      if (action === "submit") {
        return await handleSubmit()
      }

      if (action === "edit" || action === "edit_draft") {
        handleEdit()
      }
    }

    const primaryActionStyles = requestCardMenuButton.find((act) => act.action === request.actions.primaryAction) || {svg: ""}

    const handleCardClick = () => {
      const url = `/request/${request.requestNumber}/${request.requestId}`
      const isInTabs = tabs.find((tab) => tab === url)

      navigate(url, {
        state: {fromApp: true}
      })

      if (!isInTabs) {
        const newTabs = [...tabs, url]
        dispatch(setTabs(newTabs))
      }
    }

    const handlePrimaryActionBtnClick = async () => {
      try {
        await performAction(request.actions.primaryAction, resetRequests)
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 400) {
          err.response.data.errors.forEach((dataItem) => {
            console.log("dataItem = ", dataItem)
            showErrorToast(dataItem.message)
          })
          return
        }
        showErrorToast("Что-то пошло не так :(")
      }
    }

    return (
      <li
        className={s.requestCard}
        onClick={handleCardClick}
      >
        <div className={s.pictureBlock}>
          <div className={s.cardHeader}>
            <div
              className={s.requestStatus}
              style={{
                color: statusColors[request.status.theme].color,
                background: statusColors[request.status.theme].backgroundColor,
                border: statusColors[request.status.theme].border
              }}
            >
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="6" height="6" rx="3" fill="currentColor"/>
              </svg>
              <span>{request.status.label}</span>
            </div>
            <div className={s.requestNumber}>{request.requestNumber}</div>
          </div>
          <img className={s.img} src={request.picture ? request.picture : placeHolderImg} alt=""/>
        </div>
        <div className={s.cardContent}>
          <div className={s.title}>{request.title}</div>
          <div className={s.tagsWrapper}>
            <RequestCardTags tags={request.tags} extraTagCount={request.extraTagCount}/>
          </div>
          <div className={s.dateBlock}>
            <div className={s.date}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0269 2.32031H2.96975C2.35435 2.32031 1.85547 2.8192 1.85547 3.4346V10.0275C1.85547 10.6429 2.35435 11.1417 2.96975 11.1417H10.0269C10.6423 11.1417 11.1412 10.6429 11.1412 10.0275V3.4346C11.1412 2.8192 10.6423 2.32031 10.0269 2.32031Z"
                  stroke="#8A8F98" strokeWidth="1.11429"/>
                <path d="M1.85547 5.10491H11.1412M4.1769 1.39062V3.24777M8.81975 1.39062V3.24777" stroke="#8A8F98"
                      strokeWidth="1.11429" strokeLinecap="round"/>
              </svg>
              <span>Дата создания: {formatDate(request.createdAt)}</span>
            </div>
            {
              request.expireAt && request.status.code !== "draft" && (
                <div className={s.date}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.0269 2.32031H2.96975C2.35435 2.32031 1.85547 2.8192 1.85547 3.4346V10.0275C1.85547 10.6429 2.35435 11.1417 2.96975 11.1417H10.0269C10.6423 11.1417 11.1412 10.6429 11.1412 10.0275V3.4346C11.1412 2.8192 10.6423 2.32031 10.0269 2.32031Z"
                      stroke="#8A8F98" strokeWidth="1.11429"/>
                    <path d="M1.85547 5.10491H11.1412M4.1769 1.39062V3.24777M8.81975 1.39062V3.24777" stroke="#8A8F98"
                          strokeWidth="1.11429" strokeLinecap="round"/>
                  </svg>
                  <span>Активная до: {formatDate(request.createdAt)}</span>
                </div>
              )
            }
          </div>
          <div className={s.bottomBlock}>
            <ul className={s.stats}>
              {
                request.totalChats > 0 && <li className={s.statItem}>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.26923 4.375C5.26923 4.42473 5.24897 4.47242 5.21291 4.50758C5.17684 4.54275 5.12793 4.5625 5.07692 4.5625C5.02592 4.5625 4.97701 4.54275 4.94094 4.50758C4.90488 4.47242 4.88462 4.42473 4.88462 4.375C4.88462 4.32527 4.90488 4.27758 4.94094 4.24242C4.97701 4.20726 5.02592 4.1875 5.07692 4.1875C5.12793 4.1875 5.17684 4.20726 5.21291 4.24242C5.24897 4.27758 5.26923 4.32527 5.26923 4.375ZM5.26923 4.375H5.07692M7.19231 4.375C7.19231 4.42473 7.17205 4.47242 7.13598 4.50758C7.09992 4.54275 7.051 4.5625 7 4.5625C6.949 4.5625 6.90008 4.54275 6.86402 4.50758C6.82795 4.47242 6.80769 4.42473 6.80769 4.375C6.80769 4.32527 6.82795 4.27758 6.86402 4.24242C6.90008 4.20726 6.949 4.1875 7 4.1875C7.051 4.1875 7.09992 4.20726 7.13598 4.24242C7.17205 4.27758 7.19231 4.32527 7.19231 4.375ZM7.19231 4.375H7M9.11539 4.375C9.11539 4.42473 9.09512 4.47242 9.05906 4.50758C9.02299 4.54275 8.97408 4.5625 8.92308 4.5625C8.87207 4.5625 8.82316 4.54275 8.7871 4.50758C8.75103 4.47242 8.73077 4.42473 8.73077 4.375C8.73077 4.32527 8.75103 4.27758 8.7871 4.24242C8.82316 4.20726 8.87207 4.1875 8.92308 4.1875C8.97408 4.1875 9.02299 4.20726 9.05906 4.24242C9.09512 4.27758 9.11539 4.32527 9.11539 4.375ZM9.11539 4.375H8.92308M2 5.88C2 6.68 2.5759 7.377 3.38821 7.4935C3.94564 7.5735 4.50872 7.635 5.07692 7.678V10L7.22256 7.9085C7.3288 7.80533 7.47163 7.7459 7.62154 7.7425C8.62237 7.71849 9.62078 7.63534 10.6113 7.4935C11.4241 7.377 12 6.6805 12 5.8795V2.8705C12 2.0695 11.4241 1.373 10.6118 1.2565C9.41588 1.08536 8.20873 0.99963 7 1C5.77333 1 4.56718 1.0875 3.38821 1.2565C2.5759 1.373 2 2.07 2 2.8705V5.8795V5.88Z"
                      stroke="#8A8F98" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{getChatsCountText(request.totalChats)}</span>
                </li>
              }

              {
                request.newChats > 0 && <li className={s.statItem}>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6" height="6" rx="3" fill="#B0822F"/>
                  </svg>
                  <span>{getNewChatsNewText(request.newChats)}</span>
                </li>
              }

              {
                request.viewsCount > 0 && <li className={s.statItem}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.18644 7.18783C1.14619 7.06684 1.14619 6.93607 1.18644 6.81508C1.99553 4.38083 4.29211 2.625 6.99878 2.625C9.70428 2.625 11.9997 4.37908 12.8105 6.81217C12.8514 6.93292 12.8514 7.06358 12.8105 7.18492C12.002 9.61917 9.70544 11.375 6.99878 11.375C4.29328 11.375 1.99728 9.62092 1.18644 7.18783Z"
                      stroke="#9AA1AC" strokeLinecap="round" strokeLinejoin="round"/>
                    <path
                      d="M8.75 7C8.75 7.46413 8.56563 7.90925 8.23744 8.23744C7.90925 8.56563 7.46413 8.75 7 8.75C6.53587 8.75 6.09075 8.56563 5.76256 8.23744C5.43437 7.90925 5.25 7.46413 5.25 7C5.25 6.53587 5.43437 6.09075 5.76256 5.76256C6.09075 5.43437 6.53587 5.25 7 5.25C7.46413 5.25 7.90925 5.43437 8.23744 5.76256C8.56563 6.09075 8.75 6.53587 8.75 7Z"
                      stroke="#9AA1AC" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={s.lightText}>{request.viewsCount}</span>
                </li>
              }

              {
                request.favouritesCount > 0 && <li className={s.statItem}>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 3.125C11 1.67542 9.77558 0.5 8.26533 0.5C7.13658 0.5 6.16708 1.15683 5.75 2.09425C5.33292 1.15683 4.36342 0.5 3.23408 0.5C1.725 0.5 0.5 1.67542 0.5 3.125C0.5 7.33667 5.75 10.125 5.75 10.125C5.75 10.125 11 7.33667 11 3.125Z"
                      stroke="#9AA1AC" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={s.lightText}>{request.favouritesCount}</span>
                </li>
              }

              {
                request.status.code === "moderating" && <li className={s.statItem}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 3.5V5.375M9.5 5C9.5 5.59095 9.3836 6.17611 9.15746 6.72208C8.93131 7.26804 8.59984 7.76412 8.18198 8.18198C7.76412 8.59984 7.26804 8.93131 6.72208 9.15746C6.17611 9.3836 5.59095 9.5 5 9.5C4.40905 9.5 3.82389 9.3836 3.27792 9.15746C2.73196 8.93131 2.23588 8.59984 1.81802 8.18198C1.40016 7.76412 1.06869 7.26804 0.842542 6.72208C0.616396 6.17611 0.5 5.59095 0.5 5C0.5 3.80653 0.974106 2.66193 1.81802 1.81802C2.66193 0.974106 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.974106 8.18198 1.81802C9.02589 2.66193 9.5 3.80653 9.5 5ZM5 6.875H5.004V6.879H5V6.875Z"
                      stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Проверяется ~24ч</span>
                </li>
              }
            </ul>

            <div className={s.bottomButtons}>
              {
                request.actions.primaryAction && (
                  <button className={s.menuButton} onClick={handlePrimaryActionBtnClick}>
                    {primaryActionStyles.svg}
                  </button>
                )
              }

              <div className={s.btnWrapper}>
                <button ref={menuBtnRef} className={s.menuButton} onClick={handleMenuClick}>
                  <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.53471 3.05682C1.11284 3.05682 0.750621 2.90767 0.448065 2.60938C0.149769 2.30682 0.000621498 1.9446 0.000621498 1.52273C0.000621498 1.10511 0.149769 0.747159 0.448065 0.448864C0.750621 0.150568 1.11284 0.00142026 1.53471 0.00142026C1.9438 0.00142026 2.30176 0.150568 2.60858 0.448864C2.91539 0.747159 3.0688 1.10511 3.0688 1.52273C3.0688 1.80398 2.99636 2.06179 2.85147 2.29616C2.71085 2.52628 2.52548 2.71165 2.29537 2.85227C2.06525 2.98864 1.8117 3.05682 1.53471 3.05682ZM6.89604 3.05682C6.47417 3.05682 6.11195 2.90767 5.80939 2.60938C5.5111 2.30682 5.36195 1.9446 5.36195 1.52273C5.36195 1.10511 5.5111 0.747159 5.80939 0.448864C6.11195 0.150568 6.47417 0.00142026 6.89604 0.00142026C7.30513 0.00142026 7.66309 0.150568 7.9699 0.448864C8.27672 0.747159 8.43013 1.10511 8.43013 1.52273C8.43013 1.80398 8.35769 2.06179 8.2128 2.29616C8.07218 2.52628 7.88681 2.71165 7.65669 2.85227C7.42658 2.98864 7.17303 3.05682 6.89604 3.05682ZM12.2574 3.05682C11.8355 3.05682 11.4733 2.90767 11.1707 2.60938C10.8724 2.30682 10.7233 1.9446 10.7233 1.52273C10.7233 1.10511 10.8724 0.747159 11.1707 0.448864C11.4733 0.150568 11.8355 0.00142026 12.2574 0.00142026C12.6665 0.00142026 13.0244 0.150568 13.3312 0.448864C13.6381 0.747159 13.7915 1.10511 13.7915 1.52273C13.7915 1.80398 13.719 2.06179 13.5741 2.29616C13.4335 2.52628 13.2481 2.71165 13.018 2.85227C12.7879 2.98864 12.5344 3.05682 12.2574 3.05682Z"
                      fill="#9CA3AF"/>
                  </svg>
                </button>

                {
                  showMenu && request.actions.secondaryActions.length > 0 && (
                    <DropdownRequestActions
                      menuBtnRef={menuBtnRef}
                      request={request}
                      performAction={performAction}
                      onClose={onClose}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }

export default RequestCard;