import axios from "axios";
import {store} from "@/main.jsx";

axios.defaults.baseURL = 'https://i-rif.com/api/'
axios.interceptors.request.use((request) => {
  
  const token = store.getState().user.token;
    
  if (token !== null) {
    request.headers["authorization"] = `Bearer ${token}`;
  }  
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
