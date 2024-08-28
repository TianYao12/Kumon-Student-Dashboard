import { useState, useEffect, createContext, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const removeCookie = async() => {
        try {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
            if (!response.ok) throw new Error(JSON.stringify(response));
            setIsLoggedIn(false);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const checkAuthStatus = async() => {
            try {
                const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/isAuthorized`, {
                    credentials: "include"
                });
                if (!response.ok) throw new Error(JSON.stringify(response));
                setIsLoggedIn(true);
                } catch( error) {
                console.error(error);
            }
        }
        checkAuthStatus();
    }, [])
    
    
    const login = () => {
        setIsLoggedIn(true);
    }

    const logout = () => {
        removeCookie();
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };