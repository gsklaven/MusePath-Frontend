import { createContext, useEffect, useState, useContext } from "react";
import * as authApi from "../api/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [loading, setLoading] = useState(false);

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const userData = await authApi.login(username, password);
            setCurrentUser(userData);
            return userData;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            const userData = await authApi.register(username, email, password);
            setCurrentUser(userData);
            return userData;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authApi.logout();
            setCurrentUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            // Even if logout fails on backend, clear local state
            setCurrentUser(null);
            localStorage.removeItem("user");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <AuthContext.Provider value={{ currentUser, user: currentUser, updateUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for convenient access to AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
