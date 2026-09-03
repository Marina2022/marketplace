import axios from "axios";

axios.defaults.baseURL = 'https://i-rif.com/api/';
axios.defaults.withCredentials = true;

// store будет передан позже из main.jsx
let appStore = null;

export const injectStore = (store) => {
  appStore = store;
};

//********************************  request ******************************

axios.interceptors.request.use((request) => {
  request.headers = request.headers || {};

  const token = localStorage.getItem('token');
  const profileId = localStorage.getItem('activeProfile');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const regionId = localStorage.getItem('regionId');

  request.headers['X-Client-Timezone'] = timezone;

  if (regionId) {
    request.headers['X-User-Region'] = regionId;
  }

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  if (profileId) {
    request.headers["X-ProfileId"] = profileId;
  }

  return request;
});

//********************************  response ******************************

let isRefreshing = false;
let queue = [];

// флаги для отслеживания сессии
let isSessionExpired = false;
let logoutPromise = null;

// очередь
const processQueue = (error, token = null) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  queue = [];
};

// единый logout
const runLogoutOnce = async () => {
  if (!appStore) return;

  if (!logoutPromise) {
    const { logout } = await import("@/store/userSlice.js");

    logoutPromise = appStore.dispatch(logout())
      .finally(() => {
        logoutPromise = null;
      });
  }

  return logoutPromise;
};

axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    console.log("error.response?.status из интерцептора = ", status)

    // не трогаем refresh
    if (originalRequest?.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // если не 401 — дальше
    if (status !== 401) {
      return Promise.reject(error);
    }

    // если уже знаем, что сессия умерла — ничего не делаем
    if (isSessionExpired) {
      return Promise.reject(error);
    }

    // защита от повторного retry
    if (originalRequest._retry) {
      // тут тоже logout
      isSessionExpired = true;
      await runLogoutOnce();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // если уже идет refresh
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axios(originalRequest));
          },
          reject
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await axios.post("/auth/refresh");
      const newToken = res.data.accessToken;

      localStorage.setItem("token", newToken);
      localStorage.setItem("accessTokenExpiresAt", res.data.accessTokenExpiresAt);

      processQueue(null, newToken);

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return axios(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError, null);

      //  что сессия умерла
      isSessionExpired = true;

      await runLogoutOnce();

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default axios;