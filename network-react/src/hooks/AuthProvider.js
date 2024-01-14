import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider ({ children }) {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function CheckIfAuthenticated() {
    
      fetch("/get-user-info")
        .then(response => {
          if (!response.ok) {
            console.log("User is not authenticated, please log in!")
            response.json().then(result => Promise.reject(result.error));
          } else {
            return true
          }
        })
        .catch(error => {
          console.error('Error:', error);
          return false
        });
  }

  const loginAction = async (data) => {
    console.log("data", data)
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log("res", res)
      console.log("res.data", res.data)
      if (res.data) {
        console.log("res.data@#@#@@", res.data)
        setUser(res.data);
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
    <AuthContext.Provider value={{ user, loginAction, logOut, CheckIfAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};