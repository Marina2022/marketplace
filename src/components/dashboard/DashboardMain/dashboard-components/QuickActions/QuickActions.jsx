import s from './QuickActions.module.scss';

const QuickActions = ({data}) => {

  return (
    <div className={`${s.quickActions} scroll`}>
      <div className={s.title}>Быстрые действия</div>
      <div className={`${s.block} ${s.customerBlock}`}>
        <div className={s.subtitle}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="6" rx="3" fill="#3D4A66"/>
          </svg>
          <span>Как заказчик</span>
        </div>
        <div className={s.item}>
          <div className={s.itemValue}>{data.customerStats.totalCreated}</div>
          <div className={s.itemTitle}>Заявок создано</div>
        </div>
        <div className={s.item}>
          <div className={s.itemValue}>{data.customerStats.inProgress}</div>
          <div className={s.itemTitle}>В работе</div>
        </div>
        <div className={s.item}>
          <div className={s.itemValue}>{data.customerStats.totalResponses}</div>
          <div className={s.itemTitle}>Откликов получено</div>
        </div>
        <div className={s.item}>
          <div className={s.itemValue}>{data.customerStats.completed}</div>
          <div className={s.itemTitle}>Завершено</div>
        </div>
      </div>

      {
        data.executorStats && (
          <div className={`${s.block} ${s.executorBlock}`}>
            <div className={`${s.subtitle} ${s.executorSubtitle}`}>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="6" height="6" rx="3" fill="#9AA1AC"/>
              </svg>
              <span>Как исполнитель</span>
            </div>
            <div className={s.item}>
              <div className={s.itemValue}>{data.executorStats.totalResponses}</div>
              <div className={s.itemTitle}>Откликов всего</div>
            </div>
            <div className={s.item}>
              <div className={s.itemValue}>{data.executorStats.activeChats}</div>
              <div className={s.itemTitle}>Активных чатов</div>
            </div>
            <div className={s.item}>
              <div className={s.itemValue}>{data.executorStats.archived}</div>
              <div className={s.itemTitle}>В архиве</div>
            </div>
            <div className={s.item}>
              <div className={s.itemValue}>{data.executorStats.conversionPercent}%</div>
              <div className={s.itemTitle}>Конверсия</div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default QuickActions;