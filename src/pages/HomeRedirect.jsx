import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const HomeRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      navigate(isAuthenticated ? '/dashboard' : '/welcome');
    }
  }, [isAuthenticated, loading, navigate]);

  return null; // Pas d'affichage nécessaire
};

export default HomeRedirect;
