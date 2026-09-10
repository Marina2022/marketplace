import s from './ChatRequestInfo.module.scss';
import {getCurrentChatRequest} from "@/store/chatSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import axiosInstance from "@/api/axiosInstance.js";

const ChatRequestInfo = ({request}) => {
    const currentRequestId = useSelector(getCurrentChatRequest)

    const [requestDetails, setRequestDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log("requestDetails", requestDetails)

    useEffect(() => {

      const getRequestDetails = async () => {
        try {

          const response = await axiosInstance(`/messenger/requests/${currentRequestId}/context`)
          console.log(response)
          setRequestDetails(response.data)

        } catch (err) {
          console.log("err =", err)
          if (err.response && err.response.data?.errors?.length > 0) {
            showErrorToast(err.response?.data?.errors[0].message)
          }
        } finally {
          setLoading(false)
        }
      }

      getRequestDetails()

    }, [currentRequestId])

    // if (loading) {
    //   return <div className={s.chatRequestInfo}></div>
    // }


    return (
      <div className={s.chatRequestInfo}>

        <div className={s.imgWrapper}>
          {/*<img src={request.im} alt=""/>*/}

        </div>

      </div>
    );
  }
;

export default ChatRequestInfo;