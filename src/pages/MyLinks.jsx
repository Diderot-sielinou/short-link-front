import {useState,useEffect} from 'react'
import axios from 'axios'

export default function MyLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('/api/my-urls', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLinks(response.data);
      } catch (error) {
        alert('Erreur lors de la récupération des liens',error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) return <p className="p-4">Chargement des liens...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mes Liens</h1>
      {links.length === 0 ? (
        <p>Aucun lien trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.shortCode} className="p-4 border rounded shadow-sm">
              <p><strong>Original:</strong> {link.longUrl}</p>
              <p><strong>Court:</strong> <a href={`/s/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{window.location.origin}/s/{link.shortCode}</a></p>
              <p><strong>Créé le:</strong> {new Date(link.createdAt).toLocaleString()}</p>
              <p><strong>Expire le:</strong> {link.expiresAt ? new Date(link.expiresAt).toLocaleString() : 'Jamais'}</p>
              <p><strong>Clics:</strong> {link.clicks}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}