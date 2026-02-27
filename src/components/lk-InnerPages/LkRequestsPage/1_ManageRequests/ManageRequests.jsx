import s from './ManageRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import RequestsTabs from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestsTabs/RequestsTabs.jsx";
import RequestsSearch
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestsSearch/RequestsSearch.jsx";
import RequestFilters
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestFilters/RequestFilters.jsx";
import RequestCard from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestCard/RequestCard.jsx";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/lkRequests.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import RightPanelDetails from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/RightPanelDetails.jsx";

const ManageRequests = ({setRequestDetails, requestDetails}) => {

  const PAGE_SIZE = 12

  const [tab, setTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [requests, setRequests] = useState(null)
  const [mainLoading, setMainLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)

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
        const requestsResponse = await axiosInstance(`requests/my?pageNumber=${page + 1}&pageSize=${PAGE_SIZE}&profileId=${activeProfileId}${queryParam}`)

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
  return (
    <>
      {
        requestDetails && <RightPanelDetails
          requestDetails={requestDetails}
          setRequestDetails={setRequestDetails}
          resetRequests={resetRequests}
        />
      }

      <div>
        <div className={s.header}>
          <h1 className={s.title}>Управление заявками</h1>
          <Button className={s.creatRequestButton}>Создать заявку</Button>
        </div>
        <RequestsTabs requests={requests} setTab={setTab} tab={tab}/>
        <div className={s.searchAndFilters}>
          <RequestsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <RequestFilters/>
        </div>
        <ul className={s.requestsList}>
          {
            requests && requests.items.map((request) => <RequestCard
              resetRequests={resetRequests}
              request={request}
              key={request.requestId}
              setRequestDetails={setRequestDetails}
            />)
          }
        </ul>
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
    </>
  )
}

export default ManageRequests;