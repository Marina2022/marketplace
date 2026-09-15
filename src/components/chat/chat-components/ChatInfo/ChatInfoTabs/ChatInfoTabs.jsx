import s from './ChatInfoTabs.module.scss';
import {useEffect} from "react";
import {getCurrentChat, getCurrentChatRequest, getMessagesData} from "@/store/chatSlice.js";
import {useSelector} from "react-redux";
import axiosInstance from "@/api/axiosInstance.js";

const ChatInfoTabs = ({tab, setTab, tabCounts, setTabCounts}) => {

  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)

  const getTabCounts = async () => {
    try {

      let url = `chat/attachments/counters?requestId=${requestId}`
      if (currentChat) url +=  `&chatRoomId=${currentChat.chatRoomId}`

      const response = await axiosInstance(url)
      setTabCounts(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    getTabCounts()

  }, [requestId, currentChat])


  const messagesData = useSelector(getMessagesData)
  const lastMessage = messagesData?.messages[0]

  useEffect(() => {

    if (!lastMessage) return

    // чтобы не грузилось при оптимистичной отправке (когда у attachment fileLoading = true)
    if (lastMessage.attachments[0].fileLoading) return

    if (!lastMessage.attachments.length) return
    getTabCounts()
  }, [lastMessage])


  if (!tabCounts) return null

  return (
    <ul className={s.tabs}>
      <li className={`${s.tab} ${tab === "media" ? s.tabActive : "" } `} onClick={()=>setTab("media")} >
        <svg className={s.tabIcon} width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 8L3.93933 4.56067C4.07862 4.42138 4.24398 4.31089 4.42597 4.2355C4.60796 4.16012 4.80302 4.12132 5 4.12132C5.19698 4.12132 5.39204 4.16012 5.57403 4.2355C5.75602 4.31089 5.92138 4.42138 6.06067 4.56067L9.5 8M8.5 7L9.43933 6.06067C9.57862 5.92138 9.74398 5.81089 9.92597 5.7355C10.108 5.66012 10.303 5.62132 10.5 5.62132C10.697 5.62132 10.892 5.66012 11.074 5.7355C11.256 5.81089 11.4214 5.92138 11.5607 6.06067L13.5 8M1.5 10.5H12.5C12.7652 10.5 13.0196 10.3946 13.2071 10.2071C13.3946 10.0196 13.5 9.76522 13.5 9.5V1.5C13.5 1.23478 13.3946 0.980429 13.2071 0.792893C13.0196 0.605357 12.7652 0.5 12.5 0.5H1.5C1.23478 0.5 0.98043 0.605357 0.792893 0.792893C0.605357 0.980429 0.5 1.23478 0.5 1.5V9.5C0.5 9.76522 0.605357 10.0196 0.792893 10.2071C0.98043 10.3946 1.23478 10.5 1.5 10.5ZM8.5 3H8.50533V3.00533H8.5V3ZM8.75 3C8.75 3.0663 8.72366 3.12989 8.67678 3.17678C8.62989 3.22366 8.5663 3.25 8.5 3.25C8.4337 3.25 8.37011 3.22366 8.32322 3.17678C8.27634 3.12989 8.25 3.0663 8.25 3C8.25 2.9337 8.27634 2.87011 8.32322 2.82322C8.37011 2.77634 8.4337 2.75 8.5 2.75C8.5663 2.75 8.62989 2.77634 8.67678 2.82322C8.72366 2.87011 8.75 2.9337 8.75 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className={s.tabName}>Медиа</div>
        {
          tabCounts.media > 0 && (
            <div className={s.counterBadge}>{tabCounts.media}</div>
          )
        }
      </li>
      <li className={`${s.tab} ${tab === "files" ? s.tabActive : "" } `} onClick={()=>setTab("files")} >
        <svg className={s.tabIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.58203 1.16406H3.4987C3.18928 1.16406 2.89253 1.28698 2.67374 1.50577C2.45495 1.72456 2.33203 2.02131 2.33203 2.33073V11.6641C2.33203 11.9735 2.45495 12.2702 2.67374 12.489C2.89253 12.7078 3.18928 12.8307 3.4987 12.8307H10.4987C10.8081 12.8307 11.1049 12.7078 11.3237 12.489C11.5424 12.2702 11.6654 11.9735 11.6654 11.6641V5.2474L7.58203 1.16406Z" stroke="#8A8F98" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.58203 1.16406V5.2474H11.6654" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <div className={s.tabName}>Файлы</div>
        {
          tabCounts.files > 0 && (
            <div className={s.counterBadge}>{tabCounts.files}</div>
          )
        }
      </li>
      <li className={`${s.tab} ${tab === "links" ? s.tabActive : "" } `} onClick={()=>setTab("links")} >
        <svg className={s.tabIcon} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.23231 4.46185C7.6322 4.65278 7.98043 4.93688 8.24775 5.2903C8.51508 5.64372 8.69368 6.05614 8.76857 6.4929C8.84345 6.92966 8.81242 7.37801 8.6781 7.80029C8.54377 8.22257 8.31007 8.60645 7.99661 8.91969L5.22739 11.6889C4.70806 12.2082 4.00369 12.5 3.26924 12.5C2.53479 12.5 1.83042 12.2082 1.31109 11.6889C0.791758 11.1696 0.5 10.4652 0.5 9.73076C0.5 8.99631 0.791758 8.29195 1.31109 7.77261L2.39232 6.69138M10.6077 6.30862L11.6889 5.22739C12.2082 4.70806 12.5 4.00369 12.5 3.26924C12.5 2.53479 12.2082 1.83042 11.6889 1.31109C11.1696 0.791758 10.4652 0.5 9.73076 0.5C8.99631 0.5 8.29195 0.791758 7.77261 1.31109L5.00339 4.08031C4.68994 4.39355 4.45623 4.77743 4.3219 5.19971C4.18758 5.62199 4.15655 6.07035 4.23143 6.50711C4.30632 6.94387 4.48492 7.35628 4.75225 7.7097C5.01957 8.06312 5.3678 8.34722 5.76769 8.53815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <div className={s.tabName}>Ссылки</div>
        {
          tabCounts.links > 0 && (
            <div className={s.counterBadge}>{tabCounts.links}</div>
          )
        }
      </li>
    </ul>
  )
}

export default ChatInfoTabs;