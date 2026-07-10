import {toast} from "sonner";
import s from "./ToastCustom.module.scss";

export const showErrorToast = (title, message, icon) => {
  toast.custom((t) => (
    <div className={s.toast}>
      <button
        className={s.close}
        onClick={() => toast.dismiss(t)}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 9.5L16.5 16.5M16.5 9.5L9.5 16.5" stroke="#C4C4C4" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {
        icon && (
          <div className={s.icon}>
            {icon}
          </div>
        )
      }

      <div className={s.content}>
        {
          title && <div className={s.title}>{title}</div>
        }
        <span className={s.message}>{message}</span>
        <div className={s.progress}/>
      </div>
    </div>
  ))
}
