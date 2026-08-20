import s from './NoChats.module.scss';

const NoChats = () => {
  return (
    <div className={s.requestResponses}>
      <div className={s.content}>
        <div className={s.iconWrapper}>
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.84375 2.71875C0.84375 2.22147 1.04129 1.74456 1.39292 1.39292C1.74456 1.04129 2.22147 0.84375 2.71875 0.84375H15.4688C15.966 0.84375 16.4429 1.04129 16.7946 1.39292C17.1462 1.74456 17.3438 2.22147 17.3438 2.71875V10.9688C17.3438 11.466 17.1462 11.9429 16.7946 12.2946C16.4429 12.6462 15.966 12.8438 15.4688 12.8438H6.84375L2.34375 16.5938V12.8438H2.71875C2.22147 12.8438 1.74456 12.6462 1.39292 12.2946C1.04129 11.9429 0.84375 11.466 0.84375 10.9688V2.71875Z"
              stroke="#C2C6CD" strokeWidth="1.6875" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={s.title}>Чатов пока нет</div>
        <div className={s.text}>
          Они появятся, когда вы создадите
          заявку или откликнетесь
          на&nbsp;чужую.
        </div>
      </div>
    </div>
  )
}

export default NoChats;