import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const userToken = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (!(userToken && user)) {
      console.log('User unavailable');
      navigate('/login');
    }
  }, [userToken, user, navigate]);

  return userToken && user ? children : null;
};

export default ProtectedRoutes;
