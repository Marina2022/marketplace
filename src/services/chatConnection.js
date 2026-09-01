import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import axios from "axios";
import {logout} from "@/store/userSlice.js";


let connection = null;

// store будет передан позже из main.jsx
let appStore = null;

export const injectStore = (store) => {
  appStore = store;
};

async function getValidToken() {
  let token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("accessTokenExpiresAt");

  if (!token) return null;

  try {
    const expiryTime = Date.parse(expiresAt);

    let isExpired = false;

    if (isNaN(expiryTime)) {
      isExpired = true;
    } else {
      // Если дата валидна, проверяем стандартным способом (запас 10 секунд)
      isExpired = expiryTime - 10000 < Date.now();
    }

    if (isExpired) {
      const res = await axios.post("/auth/refresh");
      const newToken = res.data.accessToken;

      // Предполагаем, что бэкенд возвращает новое время (например, res.data.expiresAt или похожее)
      // Если имя поля другое, замените его ниже:
      const newExpiresAt = res.data.accessTokenExpiresAt || res.data.expiresAt;

      localStorage.setItem("token", newToken);
      localStorage.setItem("accessTokenExpiresAt", newExpiresAt);

      token = newToken;
    }
  } catch (error) {
    console.error("Ошибка обновления токена для SignalR:", error);

    // Если бэкенд отклонил рефреш (сессия полностью устарела)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      appStore.dispatch(logout())
    }
  }
  return token;
}

export function getChatConnection() {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl("https://i-rif.com/hubs/chat", {
        accessTokenFactory: async () => await getValidToken()
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();
  }
  return connection;
}
