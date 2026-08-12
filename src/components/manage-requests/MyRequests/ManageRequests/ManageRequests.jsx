import s from './ManageRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId, logout} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/requests.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import RequestsTabs from "@/components/manage-requests/MyRequests/ManageRequests/RequestsTabs/RequestsTabs.jsx";
import RequestsSearch from "@/components/manage-requests/MyRequests/ManageRequests/RequestsSearch/RequestsSearch.jsx";
import RequestFilters from "@/components/manage-requests/MyRequests/ManageRequests/RequestFilters/RequestFilters.jsx";
import RequestCard from "@/components/manage-requests/MyRequests/ManageRequests/RequestCard/RequestCard.jsx";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";

const ManageRequests = ({setRequestDetails}) => {

  const PAGE_SIZE = 12

  const [tab, setTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [requests, setRequests] = useState(null)
  const [mainLoading, setMainLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)

  const [requestToEdit, setRequestToEdit] = useState(null)

  const activeProfileId = useSelector(getActiveProfileId)
  const observerRef = useRef(null);

  const resetRequests = async () => {
    try {
      let queryParam = ""
      if (tab !== "all") queryParam = `&tab=${tab}`
      if (searchTerm) queryParam += `&searchTerms=${searchTerm}`

      setMainLoading(true)
      const requests = await axiosInstance(`requests/my?pageNumber=1&pageSize=${PAGE_SIZE}&profileId=${activeProfileId}${queryParam}`)

      const payload = getPreviewPayload(requests.data.items)
      const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload)
      const requestsWithPictures = getRequestsWithPictures({requests, pictures})
      setRequests(requestsWithPictures)

    } catch (err) {
      console.log(err)
    } finally {
      setMainLoading(false)
      setPage(1)
    }
  }

  // getRequests в т.ч. при смене вкладки
  useEffect(() => {
    if (!activeProfileId) return
    resetRequests()
  }, [tab, activeProfileId, searchTerm]);

  // подгрузка по скроллу
  const handleObserverReached = async () => {
    if (isOnScrollLoading) return

    const getRequestsOnScroll = async () => {
      if (!activeProfileId) return
      try {
        let queryParam = ""
        if (tab !== "all") queryParam = `&tab=${tab}`
        if (searchTerm) queryParam += `&searchTerms=${searchTerm}`

        setIsOnScrollLoading(true)
        // const requestsResponse = await axiosInstance(`requests/my?pageNumber=${page + 1}&pageSize=${PAGE_SIZE}&profileId=${activeProfileId}${queryParam}`)

        const requestsResponse = await axiosInstance(`requests/my?page=${page + 1}&pageSize=${PAGE_SIZE}${queryParam}`)

        const payload = getPreviewPayload(requestsResponse.data.items)
        const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload)
        const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures})

        const newRequests = {
          ...requests,
          items: [...requests.items, ...requestsWithPictures.items]
        }
        setRequests(newRequests)
        setPage(prev => prev + 1)

      } catch (err) {
        console.log(err)
      } finally {
        setIsOnScrollLoading(false)
      }
    }
    getRequestsOnScroll()
  }

  // useEffect для обзервера - для infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          handleObserverReached();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0
      }
    )
    observer.observe(observerRef.current);
    // Cleanup
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    }
  }, [requests]);


  console.log("requests = ", requests)

  return (
    <div className={s.manageRequestsWrapper}>
      <div>
        <div className={s.header}>
          <div className={s.leftHeader}>
            <h1 className={s.title}>Управление заявками</h1>
            <div className={s.subtitle}>{requests && requests.tabCount.all} заявок
              {
                requests && requests.tabCount.active > 0 && (
                  " · " + requests.tabCount.active + " активных"
                )
              }

              {
                requests && requests.tabCount.inProgress > 0 && (
                  " · " + requests.tabCount.inProgress + " в работе"
                )
              }

              {
                requests && requests.tabCount.expired > 0 && (
                  " · " + requests.tabCount.expired + " истекли"
                )
              }
            </div>
          </div>

          <Button onClick={() => setRequestToEdit('new')} className={s.createRequestButton}>
            <svg className={s.plusIconInBtn} width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2.8125V12.1875M2.8125 7.5H12.1875" stroke="white" strokeWidth="1.59375"
                    strokeLinecap="round"/>
            </svg>

            <span className={s.btnText}>Новая заявка</span>

          </Button>
        </div>

        <div className={s.wrapperForTabs}>
          <RequestsTabs requests={requests} setTab={setTab} tab={tab}/>
        </div>

        {
          mainLoading && <Spinner/>
        }

        {
          !mainLoading && (
            <ul className={`${s.requestsList} scroll`}>
              {
                requests && requests.items.map((request) => <RequestCard
                  resetRequests={resetRequests}
                  request={request}
                  key={request.requestId}
                  setRequestDetails={setRequestDetails}
                  setRequestToEdit={setRequestToEdit}
                />)
              }
            </ul>
          )
        }

        {
          requests && (requests.items.length < requests.totalItems) && (
            <div ref={observerRef} className={s.observerDiv}>
              {
                isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}><MiniSpinner/></div>
              }
            </div>
          )
        }
      </div>

      {
        requestToEdit && <EditRequest
          requestToEdit={requestToEdit}
          setRequestToEdit={setRequestToEdit}
          resetRequests={resetRequests}
        />
      }
    </div>
  )
}

export default ManageRequests;