import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  console.log("user", user)
  // if(user.user){
  //   return console.log("user54")
  // }
  if (!user.user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;