import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {formatDateForBackend} from '../../utils/covert.js'
import { toast } from "react-toastify";

export default function CreateShortLink() {
  const baseApiUrl = import.meta.env.VITE_API_URL; 
  const initialValues = {
    originalUrl: "",
    shortCode: "",
    expiresAtRaw: "",
  };

  const validationSchema = Yup.object({
    originalUrl: Yup.string()
      .matches(
        /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]{2,})(?::\d+)?(?:\/[^\s]*)?$/,
        "L'URL fournie n'est pas valide"
      )
      .required("L’URL est requise"),
      shortCode: Yup.string()
      .min(4, "shortCode must be at least 4 characters long")
      .max(10, "shortCode must be at most 10 characters long")
      .matches(/^([a-zA-Z0-9-_]*)$/, "Caractères non valides")
      .optional(),
      expiresAtString: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}( ([01][0-9]|2[0-3]):[0-5][0-9])?$/,
      'Format invalide. Utilisez "JJ/MM/AAAA" ou "JJ/MM/AAAA HH:MM"'
    )
    .nullable(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formattedExpiresAt = formatDateForBackend(values.expiresAtRaw)
    console.log("value",values)
    
    const finalData = {
      originalUrl: values.originalUrl,
      shortCode: values.shortCode?.trim() === "" ? undefined : values.shortCode,
      expiresAtString: values.expiresAtRaw?.trim() === "" ? undefined : formattedExpiresAt,
    };
    console.log("finalData",finalData)
    try {
      const response = await axios.post(`${baseApiUrl}/api/shorten`, finalData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
        },
      });
      toast.success(`${response.data?.message}✅`,{
        toastId: "success-shortLink"
      });
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la création du lien",{
        toastId: "error-shortLink"
      });
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto min-h-screen ">
      <h1 className="text-2xl font-bold mb-4">Créer un lien court</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="originalUrl"
              placeholder="URL longue"
              className="w-full p-2 border"
            />
            <ErrorMessage
              name="originalUrl"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <Field
              name="shortCode"
              placeholder="Code personnalisé (optionnel)"
              className="w-full p-2 border"
            />
            <ErrorMessage
              name="shortCode"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <Field
              name="expiresAtRaw"
              type="datetime-local"
              className="w-full p-2 border"
            />
            <ErrorMessage
              name="expiresAtString"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Raccourcir
          </button>
        </Form>
      </Formik>
    </div>
  );
}
