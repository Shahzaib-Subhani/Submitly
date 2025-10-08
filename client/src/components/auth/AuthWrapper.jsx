import React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

const AuthWrapper = ({ children }) => {
    const location = useLocation();

    const getUserTypeFromPath = (pathname) => {
        if (pathname.startsWith("/team")) return "team";
        if (pathname.startsWith("/admin")) return "admin";
        if (pathname.startsWith("/evaluator")) return "evaluator";
        return null;
    };
    const userType = getUserTypeFromPath(location.pathname);
    
    if (!userType) {
        return children;
    }

    return <AuthProvider userType={userType}>{children}</AuthProvider>;
}

export default AuthWrapper;
