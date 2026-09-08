import { useState, useEffect, useRef } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import axiosInstance from "@/api/axiosInstance.js"

export const useChatReadReceipts = ({
                                      chatContainerRef,
                                      currentChatRoomId,
                                      newMessage
                                    }) => {

  const [pendingRead, setPendingRead] = useState(null)
  const debouncedPendingRead = useDebounce(pendingRead, 500)

  // Реф для защиты от дублирующих запросов при скролле в одной и той же зоне
  const lastSentMessageIdRef = useRef(null)

  // Проверка: находится ли скролл у самого низа чата (с зазором 150px)
  const chatScrollIsNearBottom = () => {
    const el = chatContainerRef.current
    if (!el) return false
    return el.scrollHeight - el.scrollTop - el.clientHeight < 150
  }

  const maybeMarkAsRead = (msg, forceCheck = false) => {
    // Если сообщения нет (например, при открытии чата оно null), ничего не делаем
    if (!msg || !currentChatRoomId) return

    const isVisible = document.visibilityState === "visible"
    const isAtBottom = chatScrollIsNearBottom()
    const isAlreadySent = lastSentMessageIdRef.current === msg.messageId

    // Условия: вкладка активна, скролл внизу (или это принудительный чеклист при скролле) и сообщение еще не отправлялось
    if (isVisible && (isAtBottom || forceCheck) && !isAlreadySent) {
      setPendingRead({ chatRoomId: msg.chatRoomId, messageId: msg.messageId })
    }
  }

  // Эффект отправки POST-запроса на бэкенд после прохождения дебаунса
  useEffect(() => {
    if (!debouncedPendingRead) return

    const { chatRoomId, messageId } = debouncedPendingRead
    lastSentMessageIdRef.current = messageId

    axiosInstance.post(`chat/${chatRoomId}/read`, {
      messageId: messageId
    })
      .catch((err) => {
        console.error("Ошибка отправки статуса прочтения:", err)
        // Если запрос упал с ошибкой, сбрасываем реф, чтобы была возможность повторить попытку
        if (lastSentMessageIdRef.current === messageId) {
          lastSentMessageIdRef.current = null
        }
      })

  }, [debouncedPendingRead])

  // Полный сброс состояний дебаунса и истории отправки при переключении комнат
  useEffect(() => {
    setPendingRead(null)
    lastSentMessageIdRef.current = null
  }, [currentChatRoomId])

  // ТРИГГЕР 1: Срабатывает только тогда, когда в Redux реально прилетает новое сообщение по сокету
  useEffect(() => {
    maybeMarkAsRead(newMessage)
  }, [newMessage?.messageId])

  // ТРИГГЕР 2: Срабатывает при возвращении пользователя на вкладку браузера
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return
      maybeMarkAsRead(newMessage)
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [currentChatRoomId, newMessage?.messageId])

  // ТРИГГЕР 3: Функция-обработчик ручного скролла для контейнера сообщений
  const handleScroll = () => {
    maybeMarkAsRead(newMessage, true) // forceCheck = true (позволяет прочитать принудительно)
  }

  return { handleScroll }
}
