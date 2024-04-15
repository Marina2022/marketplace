import axios from "axios";

// import { store } from "../redux/store";

// AXIOS GLOBAL CONFIG
// axios.defaults.baseURL = 'http://185.178.44.121/api/'
axios.defaults.baseURL = 'https://i-rif.com/api/'
axios.interceptors.request.use((request) => {
  
  // если  появится токен
  // const { auth, profile } = store.getState();
  // const token = auth.token;
  // if (auth?.token !== null) {
  //   request.headers["authorization"] = `Bearer ${token}`;
  // }
  // const { id, name, email } = profile?.currentUserInfo ?? {}
  // Bugsnag.setUser(id, email, name)

  return request;
});
axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      
      // Обработка ошибок 
      // if (!error.message) {
      //   console.log(errorMessage);
      //   return Promise.reject("Something went wrong");
      // } 
      //
      // console.log(error);
      
      // if (error.message) store.dispatch(setGlobalErrorMessage(errorMessage));

      // const errorStatus = error?.response?.data?.status;
      //
      // if (parseInt(errorStatus) === 401) { // Unauthorized
      //   store.dispatch(userLogout("Token is Expired."));
      //   // setTimeout(() => {
      //   //    store.dispatch(refreshAuthTokenAsync());
      //   // }, 2000);
      // }
      return Promise.reject(error);
    }
);

export default axios;
