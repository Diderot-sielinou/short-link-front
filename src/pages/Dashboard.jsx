import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseApiUrl = import.meta.env.VITE_API_URL;

  const handleCopy = async (shortUrl, id) => {
    try {
      // Tente de copier le lien dans le presse-papiers
      await navigator.clipboard.writeText(shortUrl);

      // Affiche un retour visuel (ex: icône "copié" ou texte) pendant 2 secondes
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Si la copie échoue (permissions, navigateur incompatible...), on le signale
      console.error("Erreur de copie :", err);
      alert("La copie a échoué. Veuillez essayer manuellement.");
    }
  };

  useEffect(() => {
    const fetchUrls = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Aucun token trouvé, utilisateur non authentifié.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${baseApiUrl}/api/my-urls`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log("resuts", response.data?.results);
        setUrls(response.data?.results);
        // console.log(response.data.message)
      } catch (err) {
        console.error(
          err.response?.data?.message || "Erreur lors du chargement des liens."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, [baseApiUrl]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center p-6 text-center text-gray-500">
        Chargement en cours...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen">

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mes liens</h2>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Créer un lien
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {urls.length===0 && <p className="text-gray-600 flex items-center justify-center text-2xl">Aucun lien créé pour le moment.</p>}
        {urls.map((link, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <p className="text-sm text-gray-500 truncate md:text-3xl">Original</p>
              <p className="text-green-500  truncate mb-2 md:text-2xl">
                {link.original_url}
              </p>

              <p className="text-sm text-gray-500 md:text-3xl">Lien raccourci</p>
              <p className="text-blue-600 font-medium truncate mb-2 md:text-2xl">
                {link.short_link}
              </p>

              <p className="text-sm text-gray-500 md:text-3xl">Expire </p>
              <p className="text-gray-700 mb-2 md:text-2xl">
                {link?.expires_at
                  ? new Date(link?.expires_at).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "never"}
              </p>

              <p className="text-sm text-gray-500 md:text-3xl">Nombre de clics</p>
              <p className="text-gray-700 md:text-2xl">{link.click_count}</p>
            </div>

            {copiedId === link.id ? (
              <span className="text-green-500 ">Copié !</span>
            ) : (
              <button
                onClick={() => handleCopy(link.short_link, link.id)}
                className="text-blue-600 hover:underline"
              >
                Copier
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


