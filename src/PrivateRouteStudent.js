// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouteStudent = ({ element }) => {
  // Check if the user is authenticated by looking for the authToken in sessionStorage
  const isAuthenticated = sessionStorage.getItem('studentToken');

  // If authenticated, render the provided element, else navigate to the login page
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRouteStudent;
