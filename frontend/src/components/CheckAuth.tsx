import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CheckAuth = ({ children}: { children: JSX.Element }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) return <Navigate to="/login" />
    
    const { isLoggedIn } = authContext;
    return isLoggedIn ? children : <Navigate to="/login" />
}

export default CheckAuth;