import s from './EmptyRequests.module.scss';

const EmptyRequests = () => {
  return (
    <div className={s.emptyRequests}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#F4F5F7"/>
        <path d="M19.6875 25.9062C19.6875 25.2846 19.9344 24.6885 20.374 24.249C20.8135 23.8094 21.4096 23.5625 22.0312 23.5625H37.9688C38.5904 23.5625 39.1865 23.8094 39.626 24.249C40.0656 24.6885 40.3125 25.2846 40.3125 25.9062V36.2188C40.3125 36.8404 40.0656 37.4365 39.626 37.876C39.1865 38.3156 38.5904 38.5625 37.9688 38.5625H27.1875L21.5625 43.25V38.5625H22.0312C21.4096 38.5625 20.8135 38.3156 20.374 37.876C19.9344 37.4365 19.6875 36.8404 19.6875 36.2188V25.9062Z" stroke="#C2C6CD" strokeWidth="1.6875" strokeLinejoin="round"/>
      </svg>

      <div className={s.title}>Чатов пока нет</div>
      <div className={s.text}>Они появятся, когда вы создадите
        заявку или&nbsp;откликнетесь <br/>
        на&nbsp;чужую.</div>

    </div>
  );
};

export default EmptyRequests;