import s from './MiniSpinnerPagination.module.scss'

const MiniSpinnerPagination = () => {

  return (
    <div className={s.spinner}>
      <div className={s.dot}/>
      <div className={s.dot}/>
      <div className={s.dot}/>
    </div>
  )
}

export default MiniSpinnerPagination;

