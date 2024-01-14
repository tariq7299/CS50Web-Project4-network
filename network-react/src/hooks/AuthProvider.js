import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider ({ children }) {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function CheckIfAuthenticated() {
    
      return fetch("/get-user-info")
        .then(response => {
          if (!response.ok) {
            return response.json().then(result => Promise.reject(result.error));
          } else {
            console.log(response.json())
            return true
          }
        })
        .catch(error => {
          console.error('Error:', error);
          return false
        });

  }

  const loginAction = async (data) => {
    // console.log("data", data)
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      // console.log("res", res)
      // console.log("res.data", res.data)
      if (res.data) {
        // console.log("res.data@#@#@@", res.data)
        setUser(res.data);
        // setToken(res.token);
        // localStorage.setItem("site", res.token);

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