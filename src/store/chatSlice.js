import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getChatConnection} from "@/services/chatConnection.js";
import axiosInstance from "@/api/axiosInstance.js";

// Инициализация чата (Шаг 1 из вашего руководства)
export const initChat = createAsyncThunk(
  "chat/initChat",
  async (currentProfileId, {dispatch, getState}) => {
    const connection = getChatConnection()

    // если уже подключаемся или подключены — выходим
    if (connection.state !== "Disconnected") return;

    dispatch(setConnectionState("Connecting"));

    // Регистрируем обработчики хаба ОДИН раз ДО старта соединения
    connection.on("ReceiveMessage", (message) => {
      dispatch(addMessage(message));
    });

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

// добавить event
// MessageEdited  { chatRoomId, messageId, newText } — глобальный обработчик находит сообщение по id и заменяет текст.

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
  messages: [],
  unreadCount: 0,
  connectionState: "Disconnected", // Disconnected | Connecting | Connected
  updatedChatBadge: null,
  filter: "all",   // filter=all, asCustomer, asExecutor
  currentRequest: null,
  currentChat: null,
  chatError: false,
  chatSearch: "",
  chatProfileStatus: "notSent", // notSent | sending | registered
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
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
  addMessage,
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
  updateChatUnread
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

export default chatSlice.reducer;
