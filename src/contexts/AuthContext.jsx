import { createContext, useEffect, useState } from 'react';
import * as AuthApi from '../api/AuthApi.jsx';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Fetch current user on mount
    useEffect(() => {
        const controller = new AbortController();

        const fetchCurrentUser = async () => {
            setLoading(true);
            try {
                const currentUser = await AuthApi.getCurrentUser(controller.signal);
                if (!controller.signal.aborted) {
                    setUser(currentUser);
                    setError(null);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    // Only set user to null if it's not an AbortError
                    if (err.name !== 'AbortError') {
                        setUser(null);
                        // Clear any previous errors on failed auth check
                        setError(null);
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                    setIsInitialized(true);
                }
            }
        };

        fetchCurrentUser();

        return () => {
            controller.abort();
        };
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthApi.login({ email, password });
            setUser(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthApi.register({ username, email, password });
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password function
    const forgotPassword = async (email, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            return await AuthApi.forgotPassword({ email, newPassword });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await AuthApi.logout();
            setUser(null);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Context value
    const value = {
        user,
        loading,
        error,
        isInitialized,
        login,
        register,
        forgotPassword,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
