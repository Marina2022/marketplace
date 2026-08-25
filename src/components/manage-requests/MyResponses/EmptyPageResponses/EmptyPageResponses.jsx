import s from './EmptyPageResponses.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const EmptyPageResponses = ({tab}) => {

  const titleText = tab === "all" ? "Откликов пока нет" : "Тут пусто";

  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/requests", {state: {fromApp: true}});
  }

  return (
    <div className={s.emptyPage}>
      <div className={s.emptyPageContent}>
        <svg className={s.mainIcon} width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="104" height="104" rx="18" fill="#ECEFF5"/>
          <path d="M42 34H54L64 44V70C64 70.5304 63.7893 71.0391 63.4142 71.4142C63.0391 71.7893 62.5304 72 62 72H42C41.4696 72 40.9609 71.7893 40.5858 71.4142C40.2107 71.0391 40 70.5304 40 70V36C40 35.4696 40.2107 34.9609 40.5858 34.5858C40.9609 34.2107 41.4696 34 42 34Z" stroke="#3D4A66" strokeWidth="2.4" strokeLinejoin="round"/>
          <path d="M54 34V44H64" stroke="#3D4A66" strokeWidth="2.4" strokeLinejoin="round"/>
          <path d="M47 54H57M47 61H53" stroke="#3D4A66" strokeWidth="2.4" strokeLinecap="round"/>
          <rect x="59" y="64" width="24" height="24" rx="6" fill="#3D4A66"/>
          <path d="M70.0554 79.3998C72.4548 79.3998 74.3998 77.4548 74.3998 75.0554C74.3998 72.656 72.4548 70.7109 70.0554 70.7109C67.656 70.7109 65.7109 72.656 65.7109 75.0554C65.7109 77.4548 67.656 79.3998 70.0554 79.3998Z" stroke="white" strokeWidth="1.7"/>
          <path d="M73.2656 78.2656L75.7212 80.7212" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
        </svg>


        <div className={s.title}>{titleText}</div>
        <div className={s.text}>
          Вы ещё не&nbsp;откликались на&nbsp;заявки. Найдите подходящие в&nbsp;каталоге и отправьте отклик — здесь появятся ваши предложения и их&nbsp;статусы.
        </div>
        <Button onClick={handleClick} className={s.button}>
          <svg className={s.svg} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.11241 11.553C9.56701 11.553 11.5569 9.56311 11.5569 7.10851C11.5569 4.65391 9.56701 2.66406 7.11241 2.66406C4.65781 2.66406 2.66797 4.65391 2.66797 7.10851C2.66797 9.56311 4.65781 11.553 7.11241 11.553Z" stroke="white" strokeWidth="1.51111"/>
            <path d="M10.668 10.6641L13.3346 13.3307" stroke="white" strokeWidth="1.51111" strokeLinecap="round"/>
          </svg>
          <span className={s.btnText}>Открыть каталог заявок</span>
        </Button>
      </div>
    </div>
  )
}

export default EmptyPageResponses;