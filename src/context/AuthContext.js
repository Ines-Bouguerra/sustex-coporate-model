import { createContext, useContext, useState, useEffect } from "react";
import { login as authServiceLogin, signup as authServiceSignup, logout as authServiceLogout } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = async (email, password) => {
        const data = await authServiceLogin(email, password);
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
    };

    const signup = async (email, password, username) => {
        const data = await authServiceSignup(email, password, username);
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await authServiceLogout();
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
