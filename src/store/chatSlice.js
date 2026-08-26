import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getChatConnection} from "@/services/chatConnection.js";
import axiosInstance from "@/api/axiosInstance.js";

// Инициализация чата (Шаг 1 из вашего руководства)
export const initChat = createAsyncThunk(
  "chat/initChat",
  async (currentProfileId, { dispatch, getState }) => {
    const connection = getChatConnection();

    // если уже подключаемся или подключены — выходим
    if (connection.state !== "Disconnected") return;

    dispatch(setConnectionState("Connecting"));

    // Регистрируем обработчики хаба ОДИН раз ДО старта соединения
    connection.on("ReceiveMessage", (message) => {
      dispatch(addMessage(message));
    });

     connection.on("UpdateUnreadCount", (data) => {
      dispatch(updateChatBadge({
        chatRoomId: data.chatRoomId,
        newCount: data.newCount
      }))
       dispatch(setUnreadCount(getState.unreadCount + 1))
       // потестить бы. Пока что unreadCount в навигации - у нас кружочек без цифры, и не важно одно сообщение придет или несколько
       // если потом где-то реальная цифра понадобится, то лучше перезапрашивать /chat/unread-count и диспатчить ответ
    })

    connection.on("ProfileSwitched", () => {
    })


    // добавить event
    // MessageEdited  { chatRoomId, messageId, newText } — глобальный обработчик находит сообщение по id и заменяет текст.

    // Автоматическое восстановление состояния при переподключении библиотеки -- todo
    // connection.onreconnected(async () => {
    //   console.log("Сеть восстановлена. Повторно инициализируем профиль на сервере...");
    //   try {
    //     await connection.invoke("SwitchActiveProfile", currentProfileId);
    //   } catch (err) {
    //     console.error("Не удалось восстановить профиль после переподключения:", err);
    //   }
    // })

    try {
      // 1. Запуск веб-сокет соединения
      await connection.start();
      dispatch(setConnectionState("Connected"));

      // 2. Представляемся бэкенду текущим профилем
      await connection.invoke("SwitchActiveProfile", currentProfileId);

      const [chatsResponse, unreadResponse] = await Promise.all([
        axiosInstance("/chat"),
        axiosInstance("/chat/unread-count")
      ]);

      dispatch(setChats(chatsResponse.data));
      dispatch(setUnreadCount(unreadResponse.data));

    } catch (error) {
      console.error("Ошибка инициализации SignalR:", error);
      dispatch(setConnectionState("Disconnected"));
      throw error;
    }
  }
);

export const switchProfile = createAsyncThunk(
  "chat/switchProfile",
  async (newProfileId, { dispatch, getState }) => {
    const connection = getChatConnection();

    try {
      // 1. Создаем Promise, который зарезолвится ТОЛЬКО когда прилетит событие ProfileSwitched
      const waitForProfileSwitched = new Promise((resolve, reject) => {
        // Таймаут на случай, если бэкенд зависнет (чтобы фронт не заблокировался навсегда)
        const timeout = setTimeout(() => {
          connection.off("ProfileSwitched", handleSwitch);
          reject(new Error("Таймаут ожидания события ProfileSwitched"));
        }, 5000);

        function handleSwitch(profileIdFromBackend) {

          // Проверяем, что бэк переключил именно на тот профиль, который мы просили
          if (String(profileIdFromBackend) === String(newProfileId)) {
            clearTimeout(timeout);
            connection.off("ProfileSwitched", handleSwitch); // Отписываем этот временный колбэк
            resolve();
          }
        }

        // Подписываемся на событие от хаба
        connection.on("ProfileSwitched", handleSwitch);
      });

      // Отправляем команду на бэкенд
      await connection.invoke("SwitchActiveProfile", newProfileId);

      // ждем события
      await waitForProfileSwitched;
      console.log("Событие ProfileSwitched получено успешно!");

      // 2. Полностью очистить чат-стор
      dispatch(clearChatStore());


      // 4. Загрузить всё заново через REST
      const [chatsResponse, unreadResponse] = await Promise.all([
        axiosInstance("/chat"),
        axiosInstance("/chat/unread-count")
      ])

      dispatch(setChats(chatsResponse.data));
      dispatch(setUnreadCount(unreadResponse.data));

      // Если какой-то чат должен остаться открытым
      const currentActiveChatId = getState().chat.activeChatId;
      if (currentActiveChatId) {
        await connection.invoke("JoinChat", currentActiveChatId);
      }

    } catch (error) {
      console.error("Ошибка при смене профиля:", error);
      // Здесь можно обработать ошибку (например, показать уведомление пользователю)
    }
  }
)


export const logoutChat = createAsyncThunk(
  "chat/logoutChat",
  async (_, { dispatch }) => {
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

// Экшен для отправки сообщения из компонентов
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text }) => {
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
  filter: "all"   // filter=all, asCustomer, asExecutor


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
    updateChatBadge: (state, action) => {
      state.updatedChatBadge = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    clearChatStore: (state) => {
      return {
        ...initialState,
        connectionState: state.connectionState
      };
    },
  },
});

export const { addMessage, setUnreadCount, setConnectionState, updateChatBadge, setChats, clearChatStore } = chatSlice.actions;

export const getUnreadCount = (state) => {
  return state.chat.unreadCount
}

export default chatSlice.reducer;
