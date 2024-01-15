// import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  auth.CheckIfAuthenticated().then(result => {
      if (result) {
        return <Outlet />;
      } else {
        return <Navigate to="/login" />;
      }
    })
    return <Outlet />;
  }



export default PrivateRoute;
