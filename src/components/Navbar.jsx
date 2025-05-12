// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user)

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold text-blue-600">
      ShortLink
      </Link>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <span className="text-gray-700">Bonjour <strong>{user?.first_name}</strong> </span>
            <Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-2 py-1 text-[12px] rounded hover:bg-red-600 md:px-4"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">Connexion</Link>
            <Link to="/register" className="text-blue-500 hover:underline">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
