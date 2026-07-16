import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
// import {getUserStatus} from "@/store/userSlice.js";

const ProtectedRoute = ({children}) => {
  
  const {isAuthenticated, getUserStatus} = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && getUserStatus !=='loading') navigate('/')
  }, [navigate, isAuthenticated, getUserStatus])

  if (getUserStatus =='loading') return <Spinner/>

  if (isAuthenticated) return children

};

export default ProtectedRoute;
