import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, isLoading} = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [navigate, isAuthenticated, isLoading])

  if (isLoading) return <Spinner/>

  if (isAuthenticated) return children

};

export default ProtectedRoute;
