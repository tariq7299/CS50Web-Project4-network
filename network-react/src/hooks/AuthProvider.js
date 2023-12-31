import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider ({ children }) {

  const [user, setUser] = useState(null);


//   const [token, setToken] = useState(localStorage.getItem("site") || "");


  const navigate = useNavigate();


  const loginAction = async (data) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        // setToken(res.token);
        // localStorage.setItem("site", res.token);

        // edit this !!!!!
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    // setToken("");
    // localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};