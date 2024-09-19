import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useSelector((state) => state.userAuth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
