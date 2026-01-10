import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            const userInfo = localStorage.getItem('userInfo');
            
            if (token && userInfo) {
                try {
                    // Set token for future requests
                    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // Verify token by fetching profile
                    const { data } = await API.get('/auth/profile');
                    
                    if (data.success) {
                        setUser(data.user);
                    } else {
                        // Token invalid, clear storage
                        localStorage.removeItem('token');
                        localStorage.removeItem('userInfo');
                        delete API.defaults.headers.common['Authorization'];
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    delete API.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const register = async (name, email, password) => {
        try {
            const response = await API.post('/auth/register', {
                name,
                email,
                password
            });
            
            if (response.data.success) {
                const { user, token } = response.data;
                
                // Save to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify(user));
                
                // Set axios default header
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Update state
                setUser(user);
                
                return { success: true, user };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await API.post('/auth/login', {
                email,
                password
            });
            
            if (response.data.success) {
                const { user, token } = response.data;
                
                // Save to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify(user));
                
                // Set axios default header
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Update state
                setUser(user);
                
                return { success: true, user };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // Remove axios header
        delete API.defaults.headers.common['Authorization'];
        
        // Clear state
        setUser(null);
        
        // Redirect to home
        window.location.href = '/';
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;