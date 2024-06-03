import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
    // Ensure auth object is defined and contains isAuthenticated property
    const isAuthenticated = auth && auth.isAuthenticated;

    return isAuthenticated ? children : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
