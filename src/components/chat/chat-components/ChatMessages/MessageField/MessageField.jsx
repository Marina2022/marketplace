import s from './MessageField.module.scss';
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentChat,
  getEditingMessage, getIsTyping,
  getMessagesData, logoutChat,
  setEditingMessage,
  setMessagesData
} from "@/store/chatSlice.js";
import {normalizeFilesResponse} from "@/utils/chat.js";
import {getActiveProfileId} from "@/store/userSlice.js";
import {store} from "@/main.jsx";
import {getChatConnection} from "@/services/chatConnection.js";


const MessageField = ({
                        message,
                        setMessage,
                        fileUrlCache,
                        chatContainerRef,
                        filesLoading,
                        files,
                        setFiles
                      }) => {

  const connection = getChatConnection()
  const currentChat = useSelector(getCurrentChat)
  const profileId = useSelector(getActiveProfileId)

  const messagesData = useSelector(getMessagesData)

  const textareaRef = useRef(null)
  const baseHeightRef = useRef(null)

  const BASE_HEIGHT = 40  // высота инпута
  const dispatch = useDispatch()

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

  const editingMessage = useSelector(getEditingMessage)

// скролл при отправке, нучжно чтоб не ломал скролл при пагинации:
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el || !messagesData?.messages?.length) return;

    // 1. Берем самое последнее (нижнее в чате) сообщение в массиве.
    // Так как в массиве они идут в обратном порядке (новое в начале),
    // то самое свежее сообщение — это messages[0]
    const latestMessage = messagesData.messages[0];

    // 2. Проверяем, наше ли это сообщение (статус отправки 'sending' или флаг isMine)
    const isMyNewMessage = latestMessage?.isMine || latestMessage?.sendingStatus === "sending";

    // 3. Проверяем, находится ли пользователь и так внизу чата (с запасом в 150px).
    // Если он читает историю наверху, чат не должен насильно крутить его вниз при входящем сообщении.
    const isUserAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;

    // Скроллим вниз только если сообщение отправили мы, или если мы и так сидим внизу чата
    if (isMyNewMessage || isUserAtBottom) {
      // Используем setTimeout(..., 0), чтобы дождаться, пока React физически отрендерит ноду сообщения на экране
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
    }

// КРИТИЧЕСКИ ВАЖНО: следим ТОЛЬКО за ID самого последнего (нижнего) сообщения.
// При пагинации вверх это ID НЕ меняется, поэтому хук просто проигнорирует подгрузку истории!
  }, [messagesData?.messages?.[0]?.messageId])

  useEffect(() => {
    setMessage("")
    setFiles([])
  }, [currentChat?.chatRoomId]);


  // Редактируем сообщение
  useEffect(() => {
    if (!editingMessage) return
    setMessage(editingMessage.text)
    textareaRef.current.focus()
  }, [editingMessage])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // чтобы не добавлялся перенос строки
      handleSend();
    }
  }

  let typingTimerId = null;
  let isTypingSent = false;

  const TYPING_DELAY = 3000;

  const handleTyping = () => {
    // если это первое нажатие
    if (!isTypingSent) {
      connection.invoke("StartTyping", currentChat.chatRoomId);
      isTypingSent = true;
    }

    // сбрасываем таймер
    if (typingTimerId) {
      clearTimeout(typingTimerId);
    }

    // ставим новый
    typingTimerId = setTimeout(() => {
      connection.invoke("StopTyping", currentChat.chatRoomId);

      typingTimerId = null;
      isTypingSent = false;
    }, TYPING_DELAY);
  };

  const handleChange = (value) => {
    setMessage(value)
    handleTyping()
  }

  const attachmentsToSend = files.map((file) => ({
    contentType: file.file.type,
    fileName: file.file.name,
    fileSize: file.file.size,
    id: file.id,
    mediaFileId: file.mediaFileId,
    fileLoading: true,
    sortOrder: 1,
    type: file.file.type.startsWith("image") ? "Image" : "Document",
  }))

  const [sending, setSending] = useState(false)
  const isTyping = useSelector(getIsTyping)

  const handleSend = async () => {
    if (isTyping) {
      connection.invoke("StopTyping", currentChat.chatRoomId);
    }

    if (currentChat.isBlocked) {
      showErrorToast("Отправлять сообщения нельзя, чат заблокирован")
      return
    }

    if (sending) return

    // MediaFileIds
    let mediaFileIds = []
    if (attachmentsToSend.length > 0) {
      attachmentsToSend.forEach((attachment) => {
        if (!mediaFileIds.includes(attachment.mediaFileId)) mediaFileIds.push(attachment.mediaFileId);
      })
    }

    // если нет ни сообщения, ни файлов
    if (!message && !mediaFileIds.length) {

      if (editingMessage) showErrorToast("Можно редактировать только текст, нужно его ввести")
      return
    }

    if (filesLoading.length > 0 && !editingMessage) {
      showErrorToast("Пожалуйста, дождитесь загрузки всех файлов")
      return
    }

    // валидация
    if (message.length > 5000) {
      showErrorToast("Текст не должен превышать 5000 символов")
      return
    }


    if (editingMessage) {

      try {
        const body = {
          text: message || editingMessage.text,
        }

        await axiosInstance.put(`chat/${currentChat.chatRoomId}/messages/${editingMessage.messageId}`, body)

        dispatch(setEditingMessage(null))

        dispatch(setMessagesData({
          ...store.getState().chat.messagesData,
          messages: store.getState().chat.messagesData.messages.map(msg =>
            msg.messageId === editingMessage.messageId
              ? {
                ...msg,
                editedAt: new Date().toISOString(),
                isEdited: true,
                text: message
              }
              : msg
          )
        }))

        setFiles([])
      } catch (err) {
        console.log(err)
        if (err.response && err.response.data?.errors?.length > 0) {
          showErrorToast(err.response?.data?.errors[0].message)
        }
        return
      }
      setMessage("")
    }

    if (!editingMessage) {

      const tempId = uuidv4()

      const tempMessage = {
        attachments: attachmentsToSend,
        chatRoomId: currentChat.chatRoomId,
        createdAt: new Date().toISOString(),
        editedAt: null,
        isEdited: false,
        isMine: true,
        messageId: tempId,
        senderName: currentChat.companionName,
        senderProfileId: profileId,
        systemType: "None",
        text: message,
        sendingStatus: "sending",  // sending | error | success
      }

      const newMessages = [tempMessage, ...store.getState().chat.messagesData.messages]

      dispatch(setMessagesData({
        ...store.getState().chat.messagesData, messages: newMessages
      }))

      try {
        setSending(true)

        const body = {
          text: message,
          attachmentMediaFileIds: mediaFileIds,
        }

        const response = await axiosInstance.post(`chat/${currentChat.chatRoomId}/messages`, body)

        // подгружаем файлы в кэш
        if (mediaFileIds.length > 0) {

          try {
            const filesResponse = await axiosInstance.post(`chat/files/urls`, {
              mediaFileIds: mediaFileIds,
              ttlSeconds: 600
            });

            const normalized = normalizeFilesResponse(filesResponse.data);
            Object.assign(fileUrlCache.current, normalized);
          } catch (err) {
            console.log(err)
          }
        }

        dispatch(setMessagesData({
          ...store.getState().chat.messagesData,
          messages: store.getState().chat.messagesData.messages.map(msg =>
            msg.messageId === tempId
              ? {
                ...msg,
                messageId: response.data.messageId,
                sendingStatus: "success",
                attachments: attachmentsToSend.map(attachment => (
                  {
                    ...attachment,
                    fileLoading: false,
                  }
                ))
              }
              : msg
          )
        }))

      } catch (err) {
        console.log("err =", err)
        if (err.response && err.response.data?.errors?.length > 0) {
          showErrorToast(err.response?.data?.errors[0].message)
        }

        dispatch(setMessagesData({
          ...store.getState().chat.messagesData,
          messages: store.getState().chat.messagesData.messages.map(msg =>
            msg.messageId === tempId
              ? {
                ...msg,
                sendingStatus: "error",
                attachments: msg.attachments.map(att => ({...att, fileLoading: false}))  // уже не грузится, ошибка
              }
              : msg)
        }))

      } finally {
        setSending(false)
        setFiles([])
        setMessage("")
      }
    }
  }

  return (
    <>
      <div className={s.textareaWrapper}>
      <textarea
        autoFocus
        rows={1}
        placeholder="Написать сообщение"
        ref={textareaRef}
        value={message}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={s.messageTextarea}
      />
        <button onClick={handleSend} className={s.sendButton}>

          {
            files.length > 0 && (
              <div className={s.fileCounter}>{files.length}</div>
            )
          }


          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.5921 9.08684L1.91237 1.76995L3.63067 6.91624L12.3004 8.96567L3.49535 10.942L1.68002 15.871L17.5898 9.08449L17.5921 9.08684ZM1.13788 0.0565036L19.3102 8.53701C19.3894 8.56589 19.4617 8.6109 19.5227 8.66919C19.5837 8.72748 19.6319 8.79777 19.6643 8.8756C19.7286 9.0257 19.7308 9.19503 19.6705 9.34645C19.6101 9.49787 19.4921 9.61901 19.3424 9.68329L0.857425 17.5637C0.747114 17.6101 0.625587 17.6233 0.507721 17.6017C0.389854 17.58 0.280759 17.5245 0.193793 17.4419C0.106825 17.3593 0.0457583 17.2532 0.0180633 17.1366C-0.00963098 17.02 -0.00275069 16.8979 0.0378634 16.7853L2.9708 8.81025L0.298286 0.803769C0.260442 0.690103 0.256687 0.567928 0.287482 0.452331C0.318279 0.336733 0.382279 0.232775 0.471579 0.153295C0.560879 0.0738153 0.671568 0.0222936 0.789978 0.00509234C0.908388 -0.0121086 1.02933 0.00576423 1.13788 0.0565036Z"
              fill="#3D4A66"/>
          </svg>

        </button>
      </div>
    </>
  )
}

export default MessageField;