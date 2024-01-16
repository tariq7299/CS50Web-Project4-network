import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider ({ children }) {

  const navigate = useNavigate();

  function CheckIfAuthenticated() {

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null) {
        return false;
    }
    return true;
    
    //   return fetch("/get-user-info", 
    //   {method: 'GET',
    //   headers: { 'Authorization': 'Basic ' + btoa('teka:1122') }
    // })
    //     .then(response => {
    //      return response.json()
    //     })
    //     .then(data => {
    //       // if (data.is_authenticated){
    //       //   return true
    //       // }
    //       // return false
    //     })
    //     .catch(error => {
          // console.error('Error:', error);
    //       // return false
    //     });

  }

  const loginAction = async (userData) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const res = await response.json();
      if (res.user_data) {

        localStorage.setItem("userData", JSON.stringify(res.user_data));

        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    localStorage.removeItem("userData")
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{loginAction, logOut, CheckIfAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};