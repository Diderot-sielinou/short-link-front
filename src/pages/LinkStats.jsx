import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'



export default function LinkStats() {
  const { shortCode } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/api/shorten/${shortCode}/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques',error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortCode,baseApiUrl]);

  if (loading) return <p className="p-4 flex items-center justify-center min-h-screen">Chargement des statistiques...</p>;
  if (!stats) return <p className="p-4 flex items-center justify-center min-h-screen">Aucune statistique trouvée.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto mt-7 min-h-screen"> 
      <h1 className="text-2xl font-bold mb-4">Statistiques du lien</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
      <div className="space-y-2 border rounded p-4">
        <p><strong>Code court:</strong> {stats.shortCode}</p>
        <p><strong>URL longue:</strong> {stats.longUrl}</p>
        <p><strong>Créé le:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
        <p><strong>Expire le:</strong> {stats.expiresAt ? new Date(stats.expiresAt).toLocaleString() : 'Jamais'}</p>
        <p><strong>Nombre de clics:</strong> {stats.clicks}</p>
      </div>
      </div>
    </div>
  );
}