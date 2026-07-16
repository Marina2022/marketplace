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
  const token = localStorage.getItem('token');
  const profileId = localStorage.getItem('activeProfile');
  if (token) {
    request.headers["authorization"] = `Bearer ${token}`;
  }
  if (profileId) {
    request.headers["X-ProfileId"] = profileId;
  }
  return request;
});


//********************************  response ******************************

let isRefreshing = false;
let queue = [];

// запустить очередь после refresh
const processQueue = (error, token = null) => {

  queue.forEach(({resolve, reject}) => {

    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  queue = []
}

axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    // НЕ обрабатываем refresh
    if (originalRequest.url.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // не 401
    if (status !== 401) {
      return Promise.reject(error)
    }

    // защита от бесконечного refresh
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // если refresh уже идёт
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            originalRequest.headers["Authorization"] =
              `Bearer ${token}`
            resolve(axios(originalRequest))
          },
          reject
        })
      })
    }

    isRefreshing = true

    try {
      const res = await axios.post("/auth/refresh")
      const newToken = res.data.accessToken

      localStorage.setItem("token", newToken)
      processQueue(null, newToken)
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`
      return axios(originalRequest)

    } catch (refreshError) {
      processQueue(refreshError, null)

      // теперь store может быть null,
      // поэтому проверяем
      if (appStore) {
        const {logout} = await import("@/store/userSlice.js")
        appStore.dispatch(logout())
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)


export default axios
