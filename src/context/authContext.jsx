import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authToken = params.get("token");
    console.log("new token", authToken);
    if (authToken) {
      localStorage.setItem("token", authToken);
      console.log("new token", authToken);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const token = localStorage.getItem("token");
    console.log("token ff",token)
    if (token) {
      axios
        .get(`${baseApiUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data?.results);
          console.log(res.data?.results)
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate, baseApiUrl]);

  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      const res = await axios.get(`${baseApiUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data?.results);
      setUser(res.data?.results);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error(
        err.response?.data?.message ||
          "Erreur de récupération du profil utilisateur"
      );
      logout();
      navigate("/");
    }
  };

  const logout = async () => {
    // try {
    //   await axios.post('/api/auth/logout', {}, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //   });
    // } catch (err) {
    //   console.warn('Erreur lors de la déconnexion côté serveur',err);
    // }
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
