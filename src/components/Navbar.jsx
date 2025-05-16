// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="bg-white shadow-md px-4 py-3 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/welcome" className="text-lg md:text-3xl font-bold text-blue-600">
        ShortLink
      </Link>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-blue-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div
        className={`flex-col md:flex-row md:flex gap-4 items-center ${
          isOpen ? "flex" : "hidden"
        } md:items-center md:static absolute top-16 left-0 w-full bg-white shadow-md md:shadow-none md:w-auto md:bg-transparent md:mt-0 z-50 p-4 md:p-0`}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700 md:text-2xl">
                Bonjour <strong>{user?.first_name}</strong>
              </span>
              <Link to="/dashboard" onClick={handleLinkClick} className="text-blue-500 hover:underline md:text-2xl">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-2 py-1 text-[12px] rounded hover:bg-red-600 md:px-4 md:text-2xl"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick} className="text-blue-500 hover:underline md:text-2xl">
                Connexion
              </Link>
              <Link to="/register" onClick={handleLinkClick} className="text-blue-500 hover:underline md:text-2xl">
                Inscription
              </Link>
            </>
          )}
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;

