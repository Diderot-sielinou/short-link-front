// import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
  const baseApiUrl = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    adresse: "",
    phone: "",
    email: "",
    password: "",
    repeat_password: "",
    // date: "",
    // time: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Minimum 3 caractères")
      .max(30, "max 30 caractères")
      .required("Le prénom est requis"),
    lastName: Yup.string()
      .min(3, "Minimum 3 caractères")
      .max(30, "max 30 caractères")
      .required("Le nom est requis"),
    phone: Yup.string().min(9).max(30).required("Le téléphone est requis"),
    adresse: Yup.string(),
    email: Yup.string()
      .email("Format d'email invalide")
      .required("L'email est requis"),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9]{3,30}$/)
      .min(6, "Minimum 6 caractères")
      .required("Mot de passe requis"),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
      .required("Confirmation requise"),

  });



  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
       await axios.post(
        `${baseApiUrl}/api/auth/register`,
        values,
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      toast.success("Inscription réussie! ✅",{
        toastId: "success-register"
      });
      resetForm();
      navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Erreur lors de l’inscription",{
        toastId: "error-register"
      });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Formulaire d'inscription
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <label className="block mb-1 text-sm font-medium">Nom</label>
                  <Field
                    name="firstName"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Prenom
                  </label>
                  <Field
                    name="lastName"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Adresse
                  </label>
                  <Field
                    name="adresse"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="adresse"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Téléphone
                  </label>
                  <Field
                    name="phone"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label>Mot de passe</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label>Confirmer</label>
                  <Field
                    name="repeat_password"
                    type="password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="repeat_password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? "En cours..." : "S'inscrire"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      
    </div>
    
  );
}
