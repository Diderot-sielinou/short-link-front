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
              <p className="text-sm text-gray-500 truncate">Original</p>
              <p className="text-green-500  truncate mb-2 text-xs">
                {link.original_url}
              </p>

              <p className="text-sm text-gray-500">Lien raccourci</p>
              <p className="text-blue-600 font-medium truncate mb-2 text-xs">
                {link.short_link}
              </p>

              <p className="text-sm text-gray-500">Expire </p>
              <p className="text-gray-700 mb-2">
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

              <p className="text-sm text-gray-500">Nombre de clics</p>
              <p className="text-gray-700">{link.click_count}</p>
            </div>

            {copiedId === link.id ? (
              <span className="text-green-500 text-sm">Copié !</span>
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

// <div className="max-w-5xl mx-auto p-6 min-h-screen">
//   <h1 className="text-3xl font-bold mb-6 text-center md:py-4">Tableau de bord</h1>
//   <div className="mb-4 flex justify-between items-center">
//     <h2 className="text-xl font-semibold">Mes liens</h2>
//     <Link
//       to="/create"
//       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     >
//       + Créer un lien
//     </Link>
//   </div>
//   {urls?.length === 0 ? (
//     <p className="text-gray-600">Aucun lien créé pour le moment.</p>
//   ) : (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white shadow rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="text-left px-4 py-2">Code court</th>
//             <th className="text-left px-4 py-2">short link</th>
//             <th className="text-left px-4 py-2">URL longue</th>
//             <th className="text-left px-4 py-2">Clics</th>
//             <th className="text-left px-4 py-2">creat At</th>
//             <th className="text-left px-4 py-2">expire At</th>
//             <th className="text-left px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {urls?.map((url,index) => (
//             <tr key={index} className="border-b hover:bg-gray-50">
//               <td className="px-4 py-2 text-blue-600">{url?.short_code}</td>
//               <td className="px-4 py-2 text-blue-600"><span>{url?.short_link}</span></td>
//               <td className="px-4 py-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
//                 {url.original_url}
//               </td>
//               <td className="px-4 py-2">{url?.click_count}</td>
//               <td className="px-4 py-2">{new Date(url?.created_at).toLocaleString()}</td>
//               <td className="px-4 py-2">{url?.expires_at? new Date(url?.expires_at).toLocaleString() :"never"}</td>
//               <td className="px-4 py-2">
//                 <Link
//                   to={`/stats/${url?.shortCode}`}
//                   className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//                 >
//                   Statistiques
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )}
// </div>

<div className="mb-4 flex justify-between items-center">
  <h2 className="text-xl font-semibold">Mes liens</h2>
  <Link
    to="/create"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    + Créer un lien
  </Link>
</div>;
