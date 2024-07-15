import { createContext, useContext, useState, useEffect } from "react";
import { login as authServiceLogin, signup as authServiceSignup, logout as authServiceLogout } from "../services/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const csrfToken = sessionStorage.getItem('csrftoken');
        if (csrfToken) {
            axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
        }
    }, []);

    const login = async (email, password, navigate) => {
        const data = await authServiceLogin(email, password);
        if (data.csrf_token) {
            sessionStorage.setItem('csrftoken', data.csrf_token);
            axios.defaults.headers.common['X-CSRFToken'] = data.csrf_token;
            setIsAuthenticated(true);
            navigate('/due-diligence/sec-compliance');
        }
    };

    const signup = async (email, password, username) => {
        const data = await authServiceSignup(email, password, username);
        if (data.token) {
            sessionStorage.setItem('csrftoken', data.csrf_token);
            axios.defaults.headers.common['X-CSRFToken'] = data.csrf_token;
            setIsAuthenticated(true);
        }
    };

    const logout = async () => {
        await authServiceLogout();
        sessionStorage.removeItem('csrftoken');
        delete axios.defaults.headers.common['X-CSRFToken'];
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
