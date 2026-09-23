import s from './DashboardEmptyRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";

const DashboardEmptyRequests = ({setRequestToEdit}) => {
  return (
    <div className={s.emptyWrapper}>
      <div className={s.iconWrapper}>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 0.75H8.75V16.75L4.75 14.25L0.75 16.75V0.75Z" stroke="#3D4A66" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={s.title}>Заявок нет</div>
      <div className={s.text}>Создайте заявку — она появится здесь <br/>
        и будет видна исполнителям.
      </div>
      <Button onClick={() => setRequestToEdit('new')} className={s.createRequestButton}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 2.8125V12.1875M2.8125 7.5H12.1875" stroke="white" strokeWidth="1.59375" strokeLinecap="round"/>
        </svg>
        <span>Создать заявку</span>
      </Button>
    </div>
  )
}

export default DashboardEmptyRequests;