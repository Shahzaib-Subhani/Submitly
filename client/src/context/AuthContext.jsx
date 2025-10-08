import { createContext, useContext, useEffect, useState } from "react";
import { getToken, users } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children, userType = "team" }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!users[userType]) {
            setLoading(false);
            return;
        }

        const token = getToken(userType);
        const userKey = users[userType].user;

        if (token) {
            const savedUser = JSON.parse(localStorage.getItem(userKey));
            setUser(savedUser);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [userType]);

    const logout = () => {
        if (!users[userType]) return;

        const tokenKey = users[userType].token;
        const userKey = users[userType].user;

        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, userType, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);