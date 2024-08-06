import React, { createContext, startTransition, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for authentication
export const AuthContext = createContext();

// Provider component that will wrap around your application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the user data
  const navigate = useNavigate(); // Hook for navigation

  // Effect to check for existing user data in localStorage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData)); // Set user state if user data exists in localStorage
    } else {
      setUser(null); // Otherwise, set user state to null
    }
  }, []);

  // Function to handle user login
  const login = useCallback((userData) => {
    localStorage.setItem('userData', JSON.stringify(userData)); // Save user data to localStorage
    startTransition(() => {
      setUser(userData); // Update user state
      navigate("/home"); // Redirect to home page
    });
  }, [navigate]);

  // Function to handle user logout
  const logout = useCallback(() => {
    localStorage.removeItem('userData'); // Remove user data from localStorage
    startTransition(() => {
      setUser(null); // Clear user state
      navigate("/"); // Redirect to the login or registration page
    });
  }, [navigate]);

  // Provide context values to children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
