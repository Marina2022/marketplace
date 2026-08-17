import s from './types-info.module.scss';

const TitleInfo = ({event}) => {
  return (
    <div className={s.titleChangesWrapper}>
      <div className={s.oldText}>- {event.oldText}</div>
      <div className={s.newText}>+ {event.newText}</div>
    </div>
  )
}

export default TitleInfo;