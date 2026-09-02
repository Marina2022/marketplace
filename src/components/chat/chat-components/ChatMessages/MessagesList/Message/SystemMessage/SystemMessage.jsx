import s from './SystemMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";

const starSvg = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="28" height="28" rx="8" fill="#ECEFF5"/>
  <path d="M13.9984 8.64844L15.7484 12.1484L19.5984 12.8484L16.7984 15.5084L17.4984 19.3584L13.9984 17.3984L10.4984 19.3584L11.1984 15.5084L8.39844 12.8484L12.2484 12.1484L13.9984 8.64844Z" fill="#3D4A66"/>
</svg>


const systemMessagDictionary =  [
  {
    name: "None",
    title: "Ничего",
    svg: starSvg
  },
  {
    name: "ChatStarted",
    title: "Чат начат",
    svg: starSvg
  },
  {
    name: "RequestUpdated",
    title: "Заявка обновлена",
    svg: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="#ECEFF5"/>
      <path d="M17 9H11C9.89543 9 9 9.55964 9 10.25V17.75C9 18.4404 9.89543 19 11 19H17C18.1046 19 19 18.4404 19 17.75V10.25C19 9.55964 18.1046 9 17 9Z" stroke="#3D4A66" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 12H17" stroke="#3D4A66" strokeLinecap="round"/>
      <path d="M11 14H17" stroke="#3D4A66" strokeLinecap="round"/>
      <path d="M11 16H17" stroke="#3D4A66" strokeLinecap="round"/>
    </svg>

  },
  {
    name: "RequestFilesUpdated",
    title: "Файлы заявки обновлены",
    svg: starSvg
  },
  {
    name: "RequestExpired",
    title: "Срок заявки истёк",
    svg: starSvg
  },
  {
    name: "RequestCancelled",
    title: "Заявка отменена",
    svg: starSvg
  },
  {
    name: "RequestCompleted",
    title: "Заявка завершена",
    svg: starSvg
  },
  {
    name: "ResponseReactivated",
    title: "Отклик восстановлен",
    svg: starSvg
  },
  {
    name: "ResponseWithdrawn",
    title: "Отклик отозван",
    svg: starSvg
  },
  {
    name: "ChatPinned",
    title: "Чат закреплен",
    svg: starSvg
  },
  {
    name: "ChatArchived",
    title: "Чат архивирован",
    svg: starSvg
  },
  {
    name: "ChatUnpinned",
    title: "Чат откреплён",
    svg: starSvg
  },
  {
    name: "WarnChatInactive",
    title: "Чат неактивен",
    svg: starSvg
  },
  {
    name: "ComplaintCreated",
    title: "Создана жалоба",
    svg: starSvg
  }
]


const SystemMessage = ({message}) => {

  let title = ""
  let svg = ""
  const currentType = systemMessagDictionary.find(item => item.name === message.systemType)
  if (currentType) {
    title = currentType.title
    svg = currentType.svg
  }


  return (
    <div className={s.message}>
      {svg}

      <div className={s.textPart}>
        <div className={s.header}>
          <div className={s.title}>
            {title}
          </div>
          <div className={s.time}>
            {formatTelegramTime(message.createdAt)}
          </div>
        </div>
        <div className={s.text}>
          {message.text}
        </div>
      </div>
    </div>
  )
}

export default SystemMessage;