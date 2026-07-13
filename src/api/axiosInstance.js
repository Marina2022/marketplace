import axios from "axios";
import {store} from "@/main.jsx";
import {logout} from "@/store/userSlice.js";


axios.defaults.baseURL = 'https://i-rif.com/api/'
axios.defaults.withCredentials = true;
axios.interceptors.request.use((request) => {

  const token = localStorage.getItem('token')
  const profileId = localStorage.getItem('activeProfile')

  if (token !== null) {
    request.headers["authorization"] = `Bearer ${token}`;
  }

  if (profileId !== null) {
    request.headers["X-ProfileId"] = profileId;
  }

  return request;
});


// состояние refresh
let isRefreshing = false;
let queue = [];

// вспомогат. функция
const processQueue = (error, token = null) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  })
  queue = [];
};



// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       //store.dispatch(logout())
//     }
//     return Promise.reject(error);
//   }
// )


// ===== response =====
axios.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    const status = error.response?.status;

    // если ошибка не 401, просто ошибка
    if (status !== 401 ) {
      return Promise.reject(error);
    }

    // защита от бесконечного цикла
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // если уже идёт refresh, ставим в очередь
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axios(originalRequest));
          },
          reject,
        })
      })
    }

    isRefreshing = true;

    try {
      const res = await axios.post("/auth/refresh");

      const newToken = res.data.accessToken;

      localStorage.setItem("token", newToken);

      processQueue(null, newToken);

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return axios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      store.dispatch(logout())
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
)


export default axios;




