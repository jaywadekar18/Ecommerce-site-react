import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const userDetail = localStorage.getItem("user");
  //   if (userDetail) {
  //     setLoggedin(true);
  //     setUser(JSON.parse(userDetail));
  //   }
  // }, []);
  const setUserDetail = (user) => {
    setLoggedin(true);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    setUser(user);
  };
  const logoutUser = () => {
    setUser(user);
    setLoggedin(false);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        logoutUser,
        setUserDetail,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
