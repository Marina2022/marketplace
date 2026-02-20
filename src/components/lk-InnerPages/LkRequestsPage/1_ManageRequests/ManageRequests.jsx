import s from './ManageRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import RequestsTabs from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestsTabs/RequestsTabs.jsx";
import RequestsSearch
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestsSearch/RequestsSearch.jsx";
import RequestFilters
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestFilters/RequestFilters.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import RequestCard from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestCard/RequestCard.jsx";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/lkRequests.js";

const ManageRequests = ({setRequestDetails}) => {

  const PAGE_SIZE = 12

  const [tab, setTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [requests, setRequests] = useState(null)
  const [mainLoading, setMainLoading] = useState(true)
  const [page, setPage] = useState(1)

  const activeProfileId = useSelector(getActiveProfileId)

  useEffect(() => {

    if (!activeProfileId) return

    const getRequests = async () => {
      try {

        let queryParam = ""
        if (tab !== "all") queryParam = `&tab=${tab}`
        if (searchTerm) queryParam += `&searchTerms=${searchTerm}`

        setMainLoading(true)
        const requests = await axiosInstance(`requests/my?pageNumber=${page}&pageSize=${PAGE_SIZE}&profileId=${activeProfileId}${queryParam}`)
        const payload = getPreviewPayload(requests.data.items)
        const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload)

        const requestsWithPictures = getRequestsWithPictures({requests, pictures})
        console.log('requestsWithPictures = ', requestsWithPictures)
        setRequests(requestsWithPictures)

      } catch (err) {
        console.log(err)
      } finally {
        setMainLoading(false)
      }
    }

    getRequests()

  }, [tab, activeProfileId, searchTerm]);

  // console.log("requests = ", requests)

  return (
    <div>
      <div className={s.header}>
        <h1 className={s.title}>Управление заявками</h1>
        <Button className={s.creatRequestButton}>Создать заявку</Button>
      </div>

      <RequestsTabs requests={requests} setTab={setTab} tab={tab}/>

      <div className={s.searchAndFilters}>
        <RequestsSearch c={searchTerm} setSearchTerm={setSearchTerm}/>
        <RequestFilters/>
      </div>


      <ul className={s.requestsList}>
        {
          requests && requests.items.map((request) => <RequestCard request={request} key={request.requestId}
                                                                   setRequestDetails={setRequestDetails}/>)
        }
      </ul>

    </div>
  );
};

export default ManageRequests;