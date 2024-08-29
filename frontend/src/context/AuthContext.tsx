import { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { app, auth } from "../firebase/firebase"
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
            if (user) {
                setUser(user);
                setIsLoggedIn(true);
                if (user.email !== import.meta.env.VITE_ALLOWED_USER) {
                    setIsLoggedIn(false);
                    auth.signOut(); 
                    navigate("/login");
                }
            } else {
                setUser(null);
                setIsLoggedIn(false);
                navigate("/login");
            }
        });

        return () => unsubscribe(); 
    }, [navigate]);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        auth.signOut();
        setIsLoggedIn(false);
        setUser(null);
    };

    const authContextValue = {
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };