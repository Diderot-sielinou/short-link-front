// import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthProvider, useAuth } from "../context/authContext";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Login() {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  // const navigate  = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string()
      .min(6, "Minimum 6 caractères")
      .required("Mot de passe requis"),
  });
  const { login } = useAuth();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${baseApiUrl}/api/auth/login`, values);
      toast.success("login réussie! ✅", {
        toastId: "success-login",
      });
      await login(response.data.token);
      // navigate("/dashboard")
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(
          err.response?.data?.message || "Erreur lors de l’authentification",
          {
            toastId: "error-login",
          }
        );
        // setErrors({ password: err.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://linked.up.railway.app/api/auth/google"; 
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center my-2 justify-center gap-3 w-full md:w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Se connecter avec Google</span>
        </button>
        {/* <a href="http://localhost:4000/api/auth/google">Connexion avec Google</a> */}


        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Connexion
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Mot de passe
                </label>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Se connecter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
