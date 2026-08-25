import s from './RequestDetailsMobile.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import RequestHeader from "@/components/RequestDetailsPage/request-components/RequestHeader/RequestHeader.jsx";
import RequestIndicators
  from "@/components/RequestDetailsPage/request-components/RequestIndicators/RequestIndicators.jsx";
import RequestDesc from "@/components/RequestDetailsPage/request-components/RequestDesc/RequestDesc.jsx";
import RequestTags from "@/components/RequestDetailsPage/request-components/RequestTags/RequestTags.jsx";
import RequestFiles from "@/components/RequestDetailsPage/request-components/RequestFiles/RequestFiles.jsx";
import RequestChats from "@/components/RequestDetailsPage/request-components/RequestChats/RequestChats.jsx";
import RequestHistory from "@/components/RequestDetailsPage/request-components/RequestHistory/RequestHistory.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import RequestButtons from "@/components/RequestDetailsPage/request-components/RequestButtons/RequestButtons.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import DropdownRequestActions
  from "@/components/manage-requests/MyRequests/ManageRequests/DropdownRequestActions/DropdownRequestActions.jsx";

const RequestDetailsMobile = ({request, loading, setRequestToEdit, resetRequest, responses, chatsLoading}) => {

  const location = useLocation()
  const navigate = useNavigate()

  // handleClickBack - кнопка Назад в хедере
  const handleClickBack = () => {
    if (location.state?.fromApp) {
      navigate(-1, {
        state: {fromApp: true}
      });
    } else {
      navigate('/manage-requests/my-requests');
    }
  }

  const tabs = [
    {
      name: "description",
      label: "Описание"
    },
    {
      name: "responses",
      label: "Отклики"
    },
    {
      name: "History",
      label: "История"
    }
  ]

  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [showMenu, setShowMenu] = useState(false)

  const menuBtnRef = useRef(null);

  const handleMenuClick = (e) => {
    console.log('here')
    e.stopPropagation();
    setShowMenu(prev => !prev)
  }

  const onClose = () => {
    setShowMenu(false)
  }

  const performAction = async (action, resetRequest) => {

    const handlePause = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/pause`)
      resetRequest()
    }

    const handleResume = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/resume`)
      resetRequest()
    }

    const handleRenew = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/renew`)
      resetRequest()
    }

    const handleComplete = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/complete`)
      resetRequest()
    }

    const handleCancel = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/cancel`)
      resetRequest()
    }

    const handleDelete = async () => {
      await axiosInstance.delete(`/requests/${request.requestId}`)
      resetRequest()
    }

    const handleSubmit = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/submit`)
      resetRequest()
    }

    const handleEdit = () => {
      setRequestToEdit(request)
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

  return (
    <div className={s.mobilePageWrapper}>
      <div className={s.mobileHeader}>
        <button onClick={handleClickBack}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="4" fill="#F7F8FB"/>
            <path d="M21 24L15 18L21 12" stroke="#131D2A" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={s.text}>
          <span>Детализация заявки</span>
          {
            <div className={s.subtitle}> {!loading && <span>#{request.requestNumber}</span>}</div>
          }
        </div>

        <div className={s.btnWrapper}>
          <button ref={menuBtnRef} className={s.menuButton} onClick={handleMenuClick}>
            <svg width="5" height="22" viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 12.25C3.32843 12.25 4 11.6904 4 11C4 10.3096 3.32843 9.75 2.5 9.75C1.67157 9.75 1 10.3096 1 11C1 11.6904 1.67157 12.25 2.5 12.25Z" fill="#131D2A"/>
              <path d="M2.5 3.5C3.32843 3.5 4 2.94036 4 2.25C4 1.55964 3.32843 1 2.5 1C1.67157 1 1 1.55964 1 2.25C1 2.94036 1.67157 3.5 2.5 3.5Z" fill="#131D2A"/>
              <path d="M2.5 21C3.32843 21 4 20.4404 4 19.75C4 19.0596 3.32843 18.5 2.5 18.5C1.67157 18.5 1 19.0596 1 19.75C1 20.4404 1.67157 21 2.5 21Z" fill="#131D2A"/>
              <path d="M2.5 12.25C3.32843 12.25 4 11.6904 4 11C4 10.3096 3.32843 9.75 2.5 9.75C1.67157 9.75 1 10.3096 1 11C1 11.6904 1.67157 12.25 2.5 12.25Z" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 3.5C3.32843 3.5 4 2.94036 4 2.25C4 1.55964 3.32843 1 2.5 1C1.67157 1 1 1.55964 1 2.25C1 2.94036 1.67157 3.5 2.5 3.5Z" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 21C3.32843 21 4 20.4404 4 19.75C4 19.0596 3.32843 18.5 2.5 18.5C1.67157 18.5 1 19.0596 1 19.75C1 20.4404 1.67157 21 2.5 21Z" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {
            showMenu && request.actions.secondaryActions.length > 0 && (
              <DropdownRequestActions
                resetRequest={resetRequest}
                inMobileHeader={true}
                menuBtnRef={menuBtnRef}
                request={request}
                performAction={performAction}
                onClose={onClose}
              />
            )
          }
        </div>
      </div>

      {
        loading && <div className={s.underHeaderContentWrapper}>
          <Spinner/>
        </div>
      }

      {
        !loading && (
          <div className={`${s.underHeaderContentWrapper} ${request.actions.primaryAction ? s.withPadding : ''}`}>
            <ul className={s.tabs}>
              {
                tabs.map((itemTab, i) => <li
                  onClick={() => setCurrentTab(itemTab)}
                  key={i}
                  className={`${s.tab} ${itemTab.name === currentTab.name ? s.tabActive : ''}`}
                >
                  {itemTab.label}
                </li>)
              }
            </ul>

            {
              currentTab.name === "description" && (
                <div className={s.descriptionWrapper}>
                  <RequestHeader request={request}/>
                  <RequestIndicators request={request}/>
                  <RequestDesc request={request}/>
                  <RequestTags request={request}/>
                  {
                    request.attachments && request.attachments.length > 0 && <RequestFiles request={request}/>
                  }
                </div>
              )
            }

            {
              currentTab.name === "responses" && (
                <div>
                  <RequestChats request={request} responses={responses} chatsLoading={chatsLoading} resetRequest={resetRequest}/>
                </div>
              )
            }

            {
              currentTab.name === "History" && (
                <div>
                  <RequestHistory request={request}/>
                </div>
              )
            }

            <RequestButtons
              request={request}
              setRequestToEdit={setRequestToEdit}
              resetRequest={resetRequest}
            />
          </div>
        )
      }
    </div>
  )
}

export default RequestDetailsMobile;