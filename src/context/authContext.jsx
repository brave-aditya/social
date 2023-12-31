import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://social-server-evtu.onrender.com/api/auth/login",
      inputs
    );
    setCurrentUser(res.data.others);
    setToken(res.data.token)
  };
  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
