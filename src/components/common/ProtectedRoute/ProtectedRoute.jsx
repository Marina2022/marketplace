import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated,
    getUserStatus
  } = useSelector(state => state.user);


  // Пока узнаём пользователя — не показываем защищённую страницу
  if (getUserStatus === "loading") {
    return <Spinner />;
  }


  // Проверка закончилась, пользователь не найден
  if (getUserStatus === "error" || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  // Пользователь есть
  return children;
};

export default ProtectedRoute;

