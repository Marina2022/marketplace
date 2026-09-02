import s from './EmptyChatMessages.module.scss';

const EmptyChatMessages = () => {
  return (
    <div className={s.empty}>
      <div className={s.content}>
        <svg className={s.svg} width="104" height="104" viewBox="0 0 104 104" fill="none">
          <rect width="104" height="104" rx="16" fill="#ECEFF5"/>
          <path d="M34.2917 41.0599C34.2917 40.093 34.6758 39.1656 35.3595 38.4819C36.0432 37.7982 36.9706 37.4141 37.9375 37.4141H66.0625C67.0294 37.4141 67.9568 37.7982 68.6405 38.4819C69.3242 39.1656 69.7083 40.093 69.7083 41.0599V58.7682C69.7083 59.7352 69.3242 60.6625 68.6405 61.3462C67.9568 62.0299 67.0294 62.4141 66.0625 62.4141H46.7917L37.4167 69.7057V62.4141H36.8958C35.9289 62.4141 35.0016 62.0299 34.3178 61.3462C33.6341 60.6625 33.25 59.7352 33.25 58.7682" stroke="#3D4A66" strokeWidth="2.08333" strokeLinejoin="round"/>
          <path d="M43.668 47.3125H60.3346M43.668 53.0417H54.0846" stroke="#3D4A66" strokeWidth="2.08333" strokeLinecap="round"/>
        </svg>
        <div className={s.subtitle}>Здесь будут ваши переписки</div>
        <div className={s.text}>Как только вы начнёте взаимодействовать с&nbsp;кем-то на платформе,
          переписка появится в&nbsp;этом разделе.</div>
      </div>
    </div>
  )
}

export default EmptyChatMessages;