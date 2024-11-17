import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// API base URL - consider moving to environment variable
const API_BASE_URL = "https://social-server-evtu.onrender.com/api";

export const AuthContextProvider = ({ children }) => {
  // Initialize state from localStorage with error handling
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function with error handling
  const login = async (inputs) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, inputs);
      
      if (response.data) {
        setCurrentUser(response.data.others);
        setToken(response.data.token);
        return response.data;
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "An error occurred during login"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Persist user to localStorage
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    }
  }, [currentUser]);

  // Persist token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Create axios instance with authentication header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const contextValue = {
    currentUser,
    token,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};