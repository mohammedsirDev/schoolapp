import { createContext, useContext, useEffect, useState } from "react";

import {API_URL} from '../utils/api'

/**
 * AuthContext - Global state for managing user authentication and authorization.
 */
const AuthContext = createContext();

/**
 * AuthProvider - Wrapper component that provides authentication state to the entire app.
 * It handles token storage, role fetching, and persistent login sessions.
 */
export function AuthProvider({ children }) {
    // Initialize state from localStorage to persist login across page refreshes
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    /**
     * Effect: Synchronization with Backend Profile
     * Runs whenever the token changes. It fetches the latest user role from the 
     * Django backend to ensure the frontend permissions match the database.
     */
    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/profile/`, {
                headers: { Authorization: `Token ${token}` }
            })
            .then((res) => res.json())
            .then((data) => {
                // Since our ProfileViewSet returns a filtered list, we check the first index
                if (Array.isArray(data) && data.length > 0) {
                    const userRole = data[0].role;
                    setRole(userRole);
                    localStorage.setItem("role", userRole);
                }
            })
            .catch((err) => {
                console.error("AuthContext: Error fetching profile sync:", err);
                // Optional: If token is invalid (401), you could trigger a logout here
            });
        }
    }, [token]);

    /**
     * login - Updates auth state and persists credentials to localStorage.
     * @param {string} token - The DRF Auth Token received from the backend.
     * @param {string} role - The user's role (e.g., 'student' or 'visitor').
     */
    const login = (token, role) => {
        setToken(token);
        setRole(role);
        localStorage.setItem("token", token);
        if (role) localStorage.setItem("role", role);
    };

    /**
     * logout - Clears all authentication data from state and storage.
     * Redirect logic should usually follow this call in the UI component.
     */
    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    // Provide the auth state and actions to all child components
    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth - Custom hook for easy access to the AuthContext.
 * Usage: const { token, role, login, logout } = useAuth();
 */
export function useAuth() {
    return useContext(AuthContext);
}