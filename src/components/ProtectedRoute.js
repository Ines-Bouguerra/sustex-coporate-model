import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;
