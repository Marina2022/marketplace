import s from './EmptyPage.module.scss';
import Button from "@/components/ui/Button/Button.jsx";

const EmptyPage = ({tab, setRequestToEdit}) => {

  const titleText = tab === "all" ? "У вас пока нет заявок" : "Тут пусто";

  return (
    <div className={s.emptyPage}>
      <div className={s.emptyPageContent}>
        <svg className={s.icon} width="104" height="104" viewBox="0 0 104 104" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <rect width="104" height="104" rx="18" fill="#ECEFF5"/>
          <path
            d="M62 32H42C39.7909 32 38 33.7909 38 36V68C38 70.2091 39.7909 72 42 72H62C64.2091 72 66 70.2091 66 68V36C66 33.7909 64.2091 32 62 32Z"
            stroke="#3D4A66" strokeWidth="2.4"/>
          <path d="M45 43H59M45 51H59M45 59H53" stroke="#3D4A66" strokeWidth="2.4" strokeLinecap="round"/>
          <rect x="59" y="64" width="24" height="24" rx="6" fill="#3D4A66"/>
          <path d="M71 71.3125V80.6875M66.3125 76H75.6875" stroke="white" strokeWidth="1.59375" strokeLinecap="round"/>
        </svg>
        <div className={s.title}>{titleText}</div>
        <div className={s.text}>
          Создайте первую заявку — опишите задачу, добавьте файлы
          и&nbsp;требования. Исполнители увидят её в&nbsp;каталоге и&nbsp;откликнутся.
        </div>
        <Button onClick={() => setRequestToEdit('new')} className={s.createRequestButton}>
          <svg className={s.plusIconInBtn} width="15" height="15" viewBox="0 0 15 15" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 2.8125V12.1875M2.8125 7.5H12.1875" stroke="white" strokeWidth="1.59375"
                  strokeLinecap="round"/>
          </svg>
          <span className={s.btnText}>Создать заявку</span>
        </Button>
      </div>
    </div>
  )
}

export default EmptyPage;