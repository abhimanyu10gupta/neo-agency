import React, { useContext, Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const {isAuthenticated, isLoading} = useAuth0();
  return !isAuthenticated && !isLoading ? (
    <Navigate replace to='/login' />
  ) : (
    children
  );
};

export default PrivateRoute;
