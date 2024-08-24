import { useState, createContext, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    const login = () => {
        setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };