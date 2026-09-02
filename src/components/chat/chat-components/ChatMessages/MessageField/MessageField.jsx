import s from './MessageField.module.scss';
import {useEffect, useLayoutEffect, useRef} from "react";


const MessageField = ({message, setMessage}) => {

  const textareaRef = useRef(null)
  const baseHeightRef = useRef(null)

  const BASE_HEIGHT = 40  // высота инпута

  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return

    // сбрасываем, чтобы получить чистую базу
    el.style.height = 'auto'

    // высота ровно под одну строку
    baseHeightRef.current = el.scrollHeight
  }, [])

  useEffect(() => {
    const el = textareaRef.current
    if (!el || baseHeightRef.current == null) return

    el.style.height = 'auto'

    // const next = Math.max(el.scrollHeight, baseHeightRef.current)
    const next = Math.max(el.scrollHeight, BASE_HEIGHT)
    el.style.height = next + 'px'
  }, [message])

  const handleSetMessage = (value) => {
  //  const newValue = value.slice(0, 400)
    setMessage(value)
  }

  return (
    <>
      <div className={s.textareaWrapper}>
      <textarea
        rows={1}
        placeholder="Написать сообщение"
        ref={textareaRef}
        value={message}
        onChange={(e) => handleSetMessage(e.target.value) }
        className={s.messageTextarea}
      />

        <button className={s.sendButton}>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5921 9.08684L1.91237 1.76995L3.63067 6.91624L12.3004 8.96567L3.49535 10.942L1.68002 15.871L17.5898 9.08449L17.5921 9.08684ZM1.13788 0.0565036L19.3102 8.53701C19.3894 8.56589 19.4617 8.6109 19.5227 8.66919C19.5837 8.72748 19.6319 8.79777 19.6643 8.8756C19.7286 9.0257 19.7308 9.19503 19.6705 9.34645C19.6101 9.49787 19.4921 9.61901 19.3424 9.68329L0.857425 17.5637C0.747114 17.6101 0.625587 17.6233 0.507721 17.6017C0.389854 17.58 0.280759 17.5245 0.193793 17.4419C0.106825 17.3593 0.0457583 17.2532 0.0180633 17.1366C-0.00963098 17.02 -0.00275069 16.8979 0.0378634 16.7853L2.9708 8.81025L0.298286 0.803769C0.260442 0.690103 0.256687 0.567928 0.287482 0.452331C0.318279 0.336733 0.382279 0.232775 0.471579 0.153295C0.560879 0.0738153 0.671568 0.0222936 0.789978 0.00509234C0.908388 -0.0121086 1.02933 0.00576423 1.13788 0.0565036Z" fill="#3D4A66"/>
          </svg>

        </button>

      </div>
    </>
  )
}

export default MessageField;