import axios from "axios";


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
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      //store.dispatch(logout())  // todo убрать надо будет
    }
    return Promise.reject(error);
  }
);

export default axios;
