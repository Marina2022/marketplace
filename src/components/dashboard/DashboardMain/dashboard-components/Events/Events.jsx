import s from './Events.module.scss';
import {formatEventDate} from "@/utils/dashboard.js";
import EmptyEvents from "@/components/dashboard/DashboardMain/dashboard-components/Events/EmptyEvents/EmptyEvents.jsx";

const Events = ({events}) => {

  const eventsToShow = events.slice(0, 5)

  return (
    <div className={s.events}>
      <div className={s.title}>Лента событий</div>
      {
        eventsToShow.length === 0 && <EmptyEvents/>
      }
      <ul className={s.eventsList}>
        {
          eventsToShow.map((event, index) => {
            return (
              <li key={index} className={s.eventsListItem}>
                <div className={s.topPart}>
                  <div className={s.eventName}>{event.message}</div>
                  <div className={s.eventDate}>{formatEventDate(event.createdAt)}</div>
                </div>
                <div className={s.bottomPart}>
                  №{event.entityNumber}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Events;