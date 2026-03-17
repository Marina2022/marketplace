import axios from "axios";
import {store} from "@/main.jsx";
import {getActiveProfileId, logout} from "@/store/userSlice.js";
import {useSelector} from "react-redux";

axios.defaults.baseURL = 'https://i-rif.com/api/'
axios.interceptors.request.use((request) => {

  const token = store.getState().user.token;

  const profileId = store.getState().user.activeProfileId;

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

    // console.log('из интерсептора ошибка', error.response?.status)

    if (error.response?.status === 401) {
      store.dispatch(logout())
    }


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
