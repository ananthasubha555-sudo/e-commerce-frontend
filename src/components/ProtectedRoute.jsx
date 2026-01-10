import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Checking authentication...</p>
            </div>
        );
    }

    // If user is NOT logged in and trying to access protected route
    if (!user) {
        // Save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user IS logged in, allow access
    return children;
};

export default ProtectedRoute;