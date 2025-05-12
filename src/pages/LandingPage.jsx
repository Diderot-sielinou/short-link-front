import React from "react";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center py-12 px-6 bg-white shadow-xl rounded-2xl">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-4 rounded-full">
            <FaLink className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Bienvenue sur ShortLink
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          ! 🚀 Transformez vos liens longs en liens courts, clairs et percutants
          ! Gagnez en professionnalisme, en clarté et en performances avec notre
          outil de raccourcissement d'URL.
        </p>
        <h3 className="text-lg text-gray-700 my-6">🔗 Essayez gratuitement dès maintenant et simplifiez votre partage !</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Créer un compte
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg hover:bg-blue-50 transition"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
