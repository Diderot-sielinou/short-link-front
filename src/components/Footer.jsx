// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 py-4 mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} URL Shortener. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
