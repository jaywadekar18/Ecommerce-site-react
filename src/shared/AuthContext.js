import { createContext, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedin, setLoggedin] = useState(false);
    const [user, setUser] = useState(null);
    const setUserDetail = (user) => {
        setLoggedin(true)
        setUser(user)
    }
    const logoutUser = () => {
        setUser(user);
        setLoggedin(false)
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedin, logoutUser, setUserDetail, user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
