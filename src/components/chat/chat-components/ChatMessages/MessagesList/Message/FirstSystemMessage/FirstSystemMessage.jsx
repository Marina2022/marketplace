import s from './FirstSystemMessage.module.scss';
import {useSelector} from "react-redux";
import {getCurrentChat} from "@/store/chatSlice.js";
import {formatTelegramTime} from "@/utils/chat.js";

const FirstSystemMessage = ({message}) => {

  const currentChat = useSelector(getCurrentChat)

  console.log("currentChat = ", currentChat)

  return (
    <div className={s.message}>
      <svg className={s.icon} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="8" fill="#FAF1DF"/>
        <path d="M15 9.375L21.0938 20.1562H8.90625L15 9.375Z" stroke="#8A6420" strokeWidth="1.21875"
              strokeLinejoin="round"/>
        <path d="M15 13.5938V16.4063M15 18.0938V18.1031" stroke="#8A6420" strokeWidth="1.21875" strokeLinecap="round"/>
      </svg>

      <div className={s.textPart}>
        <div className={s.header}>
          <div className={s.title}>
            Начало диалога
          </div>
          <div className={s.time}>
            {formatTelegramTime(message.createdAt)}
          </div>
        </div>
        <div className={s.text}>
          {message.text}
        </div>

        <div className={s.subText}>
          Платформа не контролирует и не несёт ответственности за действия сторон вне сервиса. Все договорённости —
          между вами.
        </div>

        <div className={s.safeDeal}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="26" height="26" rx="4" fill="#3D4A66"/>
            <path
              d="M12.9987 6.39062L18.6654 8.4684V11.8684C18.6654 15.0795 16.4931 17.2517 12.9987 18.4795C9.50425 17.2517 7.33203 15.0795 7.33203 11.8684V8.4684L12.9987 6.39062Z"
              stroke="white" strokeWidth="1.41667" strokeLinejoin="round"/>
            <path d="M10.6406 12.9983L12.2462 14.6038L15.5517 11.1094" stroke="white" strokeWidth="1.41667"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={s.rightPart}>
            <div className={s.safeDealTitle}>Безопасная сделка</div>
            <div className={s.safeDealText}>Безопасная сделка</div>
          </div>

          <button className={s.arrowBtn}>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.01521 5.05333C5.01521 5.46167 4.85771 5.87 4.54854 6.17917L0.745208 9.9825C0.576041 10.1517 0.296042 10.1517 0.126875 9.9825C-0.0422917 9.81333 -0.0422917 9.53333 0.126875 9.36417L3.93021 5.56083C4.21021 5.28083 4.21021 4.82583 3.93021 4.54583L0.126875 0.7425C-0.0422917 0.573333 -0.0422917 0.293332 0.126875 0.124166C0.296042 -0.0450009 0.576041 -0.0450009 0.745208 0.124166L4.54854 3.9275C4.85771 4.23667 5.01521 4.645 5.01521 5.05333Z"
                fill="#3D4A66"/>
            </svg>
          </button>


        </div>

      </div>

    </div>
  );
};

export default FirstSystemMessage;