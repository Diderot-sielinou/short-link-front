import {useState,useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// export function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('/api/user/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         alert("Impossible de charger le profil utilisateur.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (loading) return <p className="p-4">Chargement du profil...</p>;
//   if (!user) return <p className="p-4">Aucune donnée utilisateur trouvée.</p>;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Profil de l'utilisateur</h1>
//       <div className="space-y-2 border rounded p-4">
//         <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
//         <p><strong>Email :</strong> {user.email}</p>
//         <p><strong>Inscrit le :</strong> {new Date(user.createdAt).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// }

// Profile.jsx
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        alert("Impossible de charger le profil utilisateur.",error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await axios.put('/api/user/profile', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert("Profil mis à jour avec succès.");
      setEditing(false);
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil.",error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.put('/api/user/change-password', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert("Mot de passe mis à jour avec succès.");
      setChangingPassword(false);
      resetForm();
    } catch (error) {
      alert("Erreur lors du changement de mot de passe.",error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Chargement du profil...</p>;
  if (!user) return <p className="p-4">Aucune donnée utilisateur trouvée.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil de l'utilisateur</h1>
      {!editing ? (
        <div className="space-y-2 border rounded p-4">
          <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Inscrit le :</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Modifier
            </button>
            <button onClick={() => setChangingPassword(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Changer mot de passe
            </button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{ username: user.username, email: user.email }}
          validationSchema={Yup.object({
            username: Yup.string().required("Nom d'utilisateur requis"),
            email: Yup.string().email("Email invalide").required("Email requis"),
          })}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 border rounded p-4">
              <div>
                <label className="block">Nom d'utilisateur</label>
                <Field name="username" className="w-full border p-2" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block">Email</label>
                <Field name="email" type="email" className="w-full border p-2" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex space-x-2">
                <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white px-4 py-2 rounded">
                  Enregistrer
                </button>
                <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Annuler
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {changingPassword && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Changer le mot de passe</h2>
          <Formik
            initialValues={{ currentPassword: '', newPassword: '' }}
            validationSchema={Yup.object({
              currentPassword: Yup.string().required('Mot de passe actuel requis'),
              newPassword: Yup.string().min(6, 'Minimum 6 caractères').required('Nouveau mot de passe requis'),
            })}
            onSubmit={handlePasswordChange}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 border rounded p-4">
                <div>
                  <label className="block">Mot de passe actuel</label>
                  <Field name="currentPassword" type="password" className="w-full border p-2" />
                  <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block">Nouveau mot de passe</label>
                  <Field name="newPassword" type="password" className="w-full border p-2" />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex space-x-2">
                  <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white px-4 py-2 rounded">
                    Modifier mot de passe
                  </button>
                  <button type="button" onClick={() => setChangingPassword(false)} className="bg-gray-300 px-4 py-2 rounded">
                    Annuler
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}