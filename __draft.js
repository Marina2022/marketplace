// Да, именно сюда это и встраивается.
//   Сейчас у тебя логика простая: 401 → logout, а нужно:
//   👉 401 → (один) refresh → повтор запроса → если не получилось → logout
// И главное — сериализация refresh.
//   ________________________________________
// 💡 Что добавляем концептуально
// 1.	Переменную:
//   let refreshPromise = null
// 2.	Функцию refresh (одну на всех)
// 3.	В response interceptor:
//   •	если 401 → не сразу logout
// •	а пробуем refresh
// •	и повторяем запрос
// ________________________________________
// 🔥 Готовый вариант (сериализация)

import axios from "axios";
import { store } from "@/main.jsx";
import { logout, setToken } from "@/store/userSlice.js";

axios.defaults.baseURL = 'https://i-rif.com/api/'

// 🔥 ОДИН refresh на всех
let refreshPromise = null;

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = axios.post('/auth/refresh', null, {
      withCredentials: true // обязательно для cookie
    })
      .then(res => {
        // допустим сервер возвращает новый access token
        const newToken = res.data.accessToken;

        store.dispatch(setToken(newToken));
        return newToken;
      })
      .catch(err => {
        store.dispatch(logout());
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

axios.interceptors.request.use((request) => {
  const { token, activeProfileId } = store.getState().user;

  if (token) {
    request.headers["authorization"] = `Bearer ${token}`;
  }

  if (activeProfileId) {
    request.headers["X-ProfileId"] = activeProfileId;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❗ защита от бесконечного цикла
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        // подставляем новый токен
        originalRequest.headers["authorization"] = `Bearer ${newToken}`;

        // повторяем исходный запрос
        return axios(originalRequest);
      } catch (e) {
        // refresh не удался
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
// ________________________________________
// 🧠 Что тут важно
// 1. 🔒 Сериализация
// if (!refreshPromise) {
//   refreshPromise = ...
// }
// return refreshPromise;
// 👉 все запросы ждут один и тот же Promise
// ________________________________________
// 2. 🔁 _retry
// originalRequest._retry = true;
// 👉 чтобы не зациклиться:
//   •	refresh тоже может вернуть 401
// ________________________________________
// 3. 🍪 withCredentials: true
// 👉 без этого cookie с refresh не уйдёт
// ________________________________________
// 4. 💣 Когда logout
// •	если refresh упал
// •	тогда уже точно всё — выкидываем пользователя
// ________________________________________
// ⚠️ Подводный камень (важный)
// Если у тебя:
//   👉 refresh endpoint тоже может вернуть 401
// нужно убедиться, что:
// if (originalRequest.url.includes('/auth/refresh'))
//   👉 не пытаться рефрешить сам рефреш
// ________________________________________
// 💬 Итог
// “сериализовать refresh” в axios =
// 👉 хранить один refreshPromise
// 👉 все 401 ждут его
// 👉 не шлют параллельные /refresh
// ________________________________________
// Если хочешь, могу дальше показать:
//   👉 как сделать очередь запросов (чтобы они ждали refresh и не падали) — это ещё один уровень выше 👍
//
