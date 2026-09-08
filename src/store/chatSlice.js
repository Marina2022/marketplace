import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getChatConnection} from "@/services/chatConnection.js";
import axiosInstance from "@/api/axiosInstance.js";

const LIMIT = 20

// Инициализация чата (Шаг 1 из вашего руководства)
export const initChat = createAsyncThunk(
  "chat/initChat",
  async (currentProfileId, {dispatch, getState}) => {
    const connection = getChatConnection()

    // если уже подключаемся или подключены — выходим
    if (connection.state !== "Disconnected") return;

    dispatch(setConnectionState("Connecting"))


    let isTypingTimerId = null
    //UserTyping  /  UserStoppedTyping  { chatRoomId, profileId }
    connection.on("UserTyping", async ({chatRoomId}) => {

      const state = getState()
      if (state.chat.currentChat.chatRoomId !== chatRoomId) return

      dispatch(setIsTyping(true))

      if (isTypingTimerId) {
        clearTimeout(isTypingTimerId);
      }

      isTypingTimerId = setTimeout(() => {
        if (state.chat.currentChat?.chatRoomId !== chatRoomId) return

        dispatch(setIsTyping(false))
        isTypingTimerId = null
      }, 6000)
    })

    connection.on("UserStoppedTyping", ({chatRoomId}) => {

      const state = getState()

      if (state.chat.currentChat?.chatRoomId !== chatRoomId) return

      dispatch(setIsTyping(false))

      if (isTypingTimerId) {
        clearTimeout(isTypingTimerId)
        isTypingTimerId = null
      }
    })

    connection.on("ReceiveMessage", async (message) => {

      const state = getState()

      if (!message) return;
      if (!message?.chatRoomId) return;

      if (message.chatRoomId === state.chat.currentChat.chatRoomId) {
        if (message.senderProfileId !== state.user.activeProfileId) {
          dispatch(setNewMessage(message))
        }
      }

      // защита от дубликатов:
      const messages = state.chat.messagesData.messages;

      const alreadyExists = messages.some(
        m => m.messageId === message.messageId
      );

      if (alreadyExists) return;

      // *** Перерисовать чаты ***
      // есть ли текущий message.chatRoomId в чатах в стейте
      const chats = state.chat.chats;

      if (!chats?.items) return;

      const index = chats.items.findIndex(
        c => c.chatRoomId === message.chatRoomId
      )

      // 0. Добавить сообщение в сам чат, если чат = текущий

      const currentChatId = state.chat.currentChat?.chatRoomId;

      if (message.chatRoomId === currentChatId) {

        if (message.senderProfileId !== state.user.activeProfileId) {
          dispatch(setMessagesData({
            ...state.chat.messagesData,
            messages: [message, ...state.chat.messagesData.messages]
          }))
        }
      }


      // 1. если чат НЕ найден — обновляем список с бека
      if (index === -1) {
        try {
          let requestUrl = `chat?limit=${LIMIT}`
          const filter = state.chat.filter
          const requestId = state.chat.currentRequest
          const search = state.chat.chatSearch

          if (filter) requestUrl += `&filter=${filter}`
          if (requestId) requestUrl += `&requestId=${requestId}`
          if (search) requestUrl += `&searchContacts=${search}`

          const chatsResponse = await axiosInstance(requestUrl);
          dispatch(setChats(chatsResponse.data));
        } catch (error) {
          console.error("Ошибка загрузки чатов:", error)
          dispatch(setChatError(true))
        }
      }

      // если найден — поднимаем наверх
      if (index !== -1) {

        const updatedChat = chats.items[index]

        const newUpdatedChat = {
          ...updatedChat,
          lastMessageText: message.text,
          lastMessageAt: message.createdAt,
        }
        const newItems = [
          newUpdatedChat,
          ...chats.items.filter(c => c.chatRoomId !== message.chatRoomId)
        ]

        dispatch(setChats({
          ...chats,
          items: newItems
        }))
      }
    })

    connection.on("UpdateUnreadCount", async (data) => {
      // chatRoomId, newCount
      dispatch(updateChatUnread({
        chatRoomId: data.chatRoomId,
        unreadCount: data.newCount
      }))

      try {
        const unreadResponse = await axiosInstance("/chat/unread-count")
        dispatch(setUnreadCount(unreadResponse.data));

      } catch (error) {
        console.error("Ошибка загрузки кол-ва непрочитанных:", error);
        // можно добавить флаг ошибки (нужно ли)
        dispatch(setChatError(true));
      }

      // перезагрузить чаты, если чата нет в списке чатов

      const state = getState()
      const chats = state.chat.chats;

      if (!chats?.items) return;

      const index = chats.items.findIndex(
        c => c.chatRoomId === data.chatRoomId
      )


      // 1. если чат НЕ найден — обновляем список с бэка - переносим в событие UpdateUnreadCount
      if (index === -1) {

        try {
          let requestUrl = `chat?limit=${LIMIT}`
          const filter = state.chat.filter
          const requestId = state.chat.currentRequest
          const search = state.chat.chatSearch

          if (filter) requestUrl += `&filter=${filter}`
          if (requestId) requestUrl += `&requestId=${requestId}`
          if (search) requestUrl += `&searchContacts=${search}`

          const chatsResponse = await axiosInstance(requestUrl);
          dispatch(setChats(chatsResponse.data));
        } catch (error) {
          console.error("Ошибка загрузки чатов:", error)
          dispatch(setChatError(true))
        }
      } else {
        // чат найден, обновляем счетчик

        const newItems = [...chats.items];

        newItems[index] = {
          ...newItems[index],
          unreadCount: data.newCount
        }

        dispatch(setChats({
          ...chats,
          items: newItems
        }))
      }
    })

    connection.on("ProfileSwitched", async () => {

      console.log("ProfileSwitched прошел")
      dispatch(setChatProfileStatus("registered"))

      let requestUrl = 'chat?limit=20'

      const {filter, currentRequest, chatSearch} = getState().chat;
      if (filter) requestUrl += `&filter=${filter}`
      if (currentRequest) requestUrl += `&requestId=${currentRequest}`
      if (chatSearch) requestUrl += `&searchContacts=${chatSearch}`

      try {
        const [chatsResponse, unreadResponse] = await Promise.all([
          axiosInstance(requestUrl),
          axiosInstance("/chat/unread-count")
        ]);

        dispatch(setChats(chatsResponse.data));
        dispatch(setUnreadCount(unreadResponse.data));

      } catch (error) {
        console.error("Ошибка загрузки чатов:", error);

        // важно: не ломаем всё приложение
        dispatch(setChats([]));
        dispatch(setUnreadCount(0));

        // можно добавить флаг ошибки
        dispatch(setChatError(true));
      }
    })

    // MessageEdited  { chatRoomId, messageId, newText } — глобальный обработчик находит сообщение по id и заменяет текст.
    connection.on("MessageEdited", async ({chatRoomId, messageId, newText}) => {

      const state = getState()

      let isLastMessage = false

      if (state.chat.currentChat.chatRoomId === chatRoomId) {

        const updatedMessages = state.chat.messagesData.messages.map((message, index) => {

          if (message.messageId === messageId) {
            if (index === 0) isLastMessage = true
            return (
              {
                ...message,
                text: newText,
                isEdited: true,
                editedAt: new Date().toISOString()
              }
            )
          } else {
            return message
          }
        })

        dispatch(
          setMessagesData({
            ...state.chat.messagesData,
            messages: updatedMessages
          })
        )

        if (isLastMessage) {
          // найти чат с chatRoomId
          // исправить в нем lastMessage

          const chats = state.chat.chats;
          if (!chats?.items) return;

          const index = chats.items.findIndex(
            c => c.chatRoomId === chatRoomId
          )

          if (index !== -1) {

            const newItems = [...chats.items]

            newItems[index] = {
              ...newItems[index],
              lastMessageText: newText,
            }

            dispatch(setChats({
              ...chats,
              items: newItems
            }))
          }
        }
      }
    })


// Автоматическое восстановление состояния при переподключении библиотеки -- todo
    connection.onreconnected(async () => {
      console.log("onreconnected")
      // console.log("Сеть восстановлена. Повторно инициализируем профиль на сервере...");
      // try {
      //   await connection.invoke("SwitchActiveProfile", currentProfileId);
      // } catch (err) {
      //   console.error("Не удалось восстановить профиль после переподключения:", err);
      // }
    })

    try {
      // 1. Запуск веб-сокет соединения
      await connection.start();
      dispatch(setConnectionState("Connected"))

      // 2. Представляемся бэкенду текущим профилем
      dispatch(setChatProfileStatus("sending"))
      await connection.invoke("SwitchActiveProfile", currentProfileId);

    } catch (error) {
      console.error("Ошибка инициализации SignalR:", error);
      dispatch(setConnectionState("Disconnected"));
      throw error;
    }
  }
)

export const switchProfile = createAsyncThunk(
  "chat/switchProfile",
  async (newProfileId, {dispatch}) => {
    const connection = getChatConnection();
    dispatch(setChatProfileStatus("sending"))
    await connection.invoke("SwitchActiveProfile", newProfileId);
  }
)

export const logoutChat = createAsyncThunk(
  "chat/logoutChat",
  async (_, {dispatch}) => {
    const connection = getChatConnection();

    try {
      // 1. Меняем статус в сторе
      dispatch(setConnectionState("Disconnecting"));

      if (connection) {
        // Очищаем все глобальные подписки хаба (.on),
        // чтобы старые колбэки не срабатывали во время закрытия или после него
        connection.off();

        // Проверяем текущее состояние соединения SignalR (если библиотека используется напрямую)
        // Тормозим соединение, только если оно не отключено
        if (connection.state !== "Disconnected") {
          await connection.stop();
          console.log("SignalR соединение успешно закрыто после логаута");
        }
      }
    } catch (err) {
      console.error("Ошибка при остановке SignalR во время логаута:", err);
    } finally {
      // 2. В любом случае (даже если сокет упал с ошибкой) чистим фронтенд:

      // Полностью очищаем чат-стор (сообщения, счетчики, список чатов)
      dispatch(clearChatStore());

      // Переводим финальный статус в Disconnected
      dispatch(setConnectionState("Disconnected"));
    }
  }
)

// Экшен для отправки сообщения из компонентов - dummy
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({chatId, text}) => {
    const connection = getChatConnection();
    if (connection.state === "Connected") {
      await connection.invoke("SendMessage", chatId, text);
    }
  }
);

const initialState = {
  chats: null,
  unreadCount: 0,
  connectionState: "Disconnected", // Disconnected | Connecting | Connected
  updatedChatBadge: null,
  filter: "all",   // filter=all, asCustomer, asExecutor
  currentRequest: null,
  currentChat: null,
  chatError: false,
  chatSearch: "",
  chatProfileStatus: "notSent", // notSent | sending | registered
  messagesData: null,
  isTyping: false,
  editingMessage: null,  // либо само сообщение
  newMessage: null  // сюда попадает новое received сообщение, при условии, что оно не мое и принадлежит текущему chatRoom
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    setConnectionState: (state, action) => {
      state.connectionState = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setChatFilter: (state, action) => {
      state.filter = action.payload;
    },
    setChatError: (state, action) => {
      state.chatError = action.payload;
    },
    setChatProfileStatus: (state, action) => {
      state.chatProfileStatus = action.payload;
    },
    setChatSearch: (state, action) => {
      state.chatSearch = action.payload;
    },
    clearChatStore: (state) => {
      return {
        ...initialState,
        connectionState: state.connectionState
      };
    },
    setCurrentChatRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setMessagesData: (state, action) => {
      state.messagesData = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },
    updateChatUnread: (state, action) => {
      const {chatRoomId, unreadCount} = action.payload;

      if (!state.chats?.items) return;

      const chat = state.chats.items.find(
        chat => chat.chatRoomId === chatRoomId
      );

      if (!chat) return;

      chat.unreadCount = unreadCount;
    },
  },
});

export const {
  setUnreadCount,
  setConnectionState,
  setChats,
  clearChatStore,
  setChatFilter,
  setCurrentChatRequest,
  setCurrentChat,
  setChatError,
  setChatSearch,
  setChatProfileStatus,
  updateChatUnread,
  setMessagesData,
  setIsTyping,
  setEditingMessage,
  setNewMessage
} = chatSlice.actions;

export const getUnreadCount = (state) => {
  return state.chat.unreadCount
}

export const getChatFilter = (state) => {
  return state.chat.filter
}

export const getCurrentChatRequest = (state) => {
  return state.chat.currentRequest
}

export const getChatSearch = (state) => {
  return state.chat.chatSearch
}

export const getCurrentChat = (state) => {
  return state.chat.currentChat
}

export const getIsTyping = (state) => {
  return state.chat.isTyping
}

export const getChats = (state) => {
  return state.chat.chats
}

export const getChatError = (state) => {
  return state.chat.chatError
}

export const getConnectionState = (state) => {
  return state.chat.connectionState
}

export const getChatProfileStatus = (state) => {
  return state.chat.chatProfileStatus
}
export const getEditingMessage = (state) => {
  return state.chat.editingMessage
}

export const getNewMessage = (state) => {
  return state.chat.newMessage
}

export const getMessagesData = (state) => {
  return state.chat.messagesData
}

export default chatSlice.reducer;
