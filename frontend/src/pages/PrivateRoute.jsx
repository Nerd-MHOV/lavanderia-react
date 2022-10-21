import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
    const auth = useContext(AuthContext);

    async function validateLogin() {
        // let validate = await auth.login()
        return await auth.login()
    }
    if (!validateLogin()) {
        return <Navigate to="/" />
    }

    return children
}