import s from './EmptyEvents.module.scss';

const EmptyEvents = () => {
  return (
    <div className={s.emptyEvents}>
      <div className={s.iconWrapper}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 6.67825C0.763779 5.52613 1.109 4.40235 1.7444 3.44119C2.3798 2.48003 3.27851 1.72215 4.33314 1.25811C5.38776 0.794078 6.5537 0.643515 7.69161 0.824417C8.82952 1.00532 9.89127 1.51004 10.75 2.27825M12.75 6.67825C12.7362 7.83037 12.391 8.95415 11.7556 9.91531C11.1202 10.8765 10.2215 11.6344 9.16686 12.0984C8.11224 12.5624 6.9463 12.713 5.80839 12.5321C4.67048 12.3512 3.60873 11.8465 2.75 11.0783M10.75 1.17825V4.17825H7.75M2.75 12.1783V9.17825H5.75" stroke="#3D4A66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </div>

      <div className={s.title}>Событий пока нет</div>
      <div className={s.text}>Здесь появится хроника: отклики, сообщения, <br/>
        изменения статусов ваших заявок.
      </div>
    </div>
  );
};

export default EmptyEvents;