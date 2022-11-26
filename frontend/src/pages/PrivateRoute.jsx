import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
    const auth = useContext(AuthContext);

    
    if (!auth.userLogin) {
        return <Navigate to="/" />
    }

    return children
}