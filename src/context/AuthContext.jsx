/**
 * AuthContext - Authentication State Management
 * 
 * This module provides centralized authentication state management
 * for the MusePath application using React Context API.
 * 
 * Features:
 * - User login/logout/register functionality
 * - Persistent session storage via localStorage
 * - Loading state management for async operations
 * - Custom useAuth hook for easy context access
 */

// React hooks for context and state management
import { createContext, useEffect, useState, useContext } from "react";
// API functions for authentication endpoints
import * as authApi from "../api/auth";

// Create the authentication context
export const AuthContext = createContext();

/**
 * AuthContextProvider Component
 * 
 * Wraps the application to provide authentication state and methods
 * to all child components via React Context.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export const AuthContextProvider = ({children}) => {
    // Current authenticated user state, initialized from localStorage
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    // Loading state for async authentication operations
    const [loading, setLoading] = useState(false);

    /**
     * Updates the current user state
     * @param {Object} data - User data to set
     */
    const updateUser = (data) => {
        setCurrentUser(data);
    };

    // Sync user state with localStorage whenever it changes
    useEffect(() => {
        if (currentUser) {
            // Persist user data to localStorage
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            // Clear localStorage when user logs out
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    /**
     * Authenticates user with username and password
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @returns {Promise<Object>} Authenticated user data
     */
    const login = async (username, password) => {
        setLoading(true);
        try {
            const userData = await authApi.login(username, password);
            setCurrentUser(userData);
            return userData;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Registers a new user account
     * @param {string} username - Desired username
     * @param {string} email - User's email address
     * @param {string} password - Desired password
     * @returns {Promise<Object>} Newly created user data
     */
    const register = async (username, email, password) => {
        setLoading(true);
        try {
            const userData = await authApi.register(username, email, password);
            setCurrentUser(userData);
            return userData;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logs out the current user
     * Clears both backend session and local state
     * @returns {Promise<void>}
     */
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
    
    // Provide auth state and methods to all children
    return(
        <AuthContext.Provider value={{ currentUser, user: currentUser, updateUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook for accessing authentication context
 * 
 * Provides convenient access to auth state and methods.
 * Must be used within an AuthContextProvider.
 * 
 * @returns {Object} Auth context value with user, login, register, logout, loading
 * @throws {Error} If used outside of AuthContextProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
