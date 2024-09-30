import * as React from "react"
import { Outlet } from "react-router-dom";


async function checkIfAuthenticated() {

  try {
    const response = await fetch(
      '/get-current-user-info'
    )

    if (response.ok) {
      const data = await response.json()
      console.log("data", data)
      if (data.userData) {
        localStorage.setItem("userData", JSON.stringify(data.userData));
        return true;
      } else {

        return false;
      }
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    if (error.response && error.response.status === 400) {
      window.location.href = '/login'
      return false;
    } else {
      // Handle other errors (e.g., network issues)
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}

const PrivateRoute = () => {

  const [isLoading, setIsLoading] = React.useState(true);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {

        const isAuthenticatedResult = await checkIfAuthenticated();

        setIsAuthenticated(isAuthenticatedResult);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);



  // IF the server didn't yet respond then show a loaidn spinner
  if (isLoading) {
    // Render a loading state (e.g., spinner, loading message)
    return (
      <h1>Loading...</h1>
    );
  }

  return isAuthenticated && <Outlet />;

}



export default PrivateRoute;
