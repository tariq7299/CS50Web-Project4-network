import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react"

const AuthContext = createContext();

function AuthProvider({ children }) {

  const navigate = useNavigate();

  const logOut = async () => {

    localStorage.removeItem("userData")

    try {
      const response = await fetch("/logout")

      if (response.ok) {
        window.location.href = '/login';

      }
      throw Error('Error Contact support ');

    } catch (error) {
      console.error(error)
    }

  };

  return (
    <AuthContext.Provider value={{ logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};