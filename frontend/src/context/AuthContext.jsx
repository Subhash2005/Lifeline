import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.data);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (err) {
                    console.error('Auth verification failed:', err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true };
            }
            return { success: false, message: res.data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true };
            }
            return { success: false, message: res.data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
