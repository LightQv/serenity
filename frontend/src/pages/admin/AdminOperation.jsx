import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import notifySuccess, {
  notifyDuplicate,
  notifyError,
} from "../../services/ToastNotificationService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminOperation() {
  const [operations, setOperations] = useState({
    operation_name: "",
  });

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/operations`, operations);
      if (res.status === 201) {
        notifySuccess("L'opération a été ajouté").then(
          navigate("/admin/operation")
        );
      }
    } catch (error) {
      if (error.request.status === 500) {
        notifyDuplicate("Opération déjà existant");
      } else {
        notifyError("Erreur dans l'ajout d'une opération");
      }
    }
  };

  const handleChange = (e) => {
    setOperations({
      ...operations,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-slate-50 p-10 font-poppins lg:ml-60">
      <h1 className="mb-2 flex items-start text-lg font-extrabold text-violet-dark-0">
        Ajouter une opération
      </h1>
      <h1 className="mb-4 text-xl font-black">{operations.operation_name}</h1>
      <div className="hidden lg:absolute lg:bottom-6 lg:left-0 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-2 lg:text-slate-900">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5V10.2C6.5 13.2376 8.96243 15.7 12 15.7C15.0376 15.7 17.5 13.2376 17.5 10.2V7.5ZM6.94257 15.8463C6.83726 15.8089 6.79237 15.7695 6.82249 15.7262C6.33308 15.2275 5.92625 14.6577 5.62217 14.0352C3.21131 15.1678 2 17.5534 2 21V22H21.9371L21.9862 21.0518C22.1458 17.9739 20.9108 15.6044 18.3557 14.0807C18.0445 14.7043 17.6299 15.2744 17.1336 15.7717C17.1287 15.8148 17.0865 15.8544 17.0101 15.891C15.7389 17.0996 13.9639 17.85 12 17.85C10.0123 17.85 8.21802 17.0813 6.94257 15.8463Z"
          />
        </svg>
      </div>

      <form className="flex flex-col" onSubmit={handlesubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            name="firstname"
            id="firstname"
            required="required"
            className="lg:w-74 mb-2 h-14 rounded-lg bg-slate-100 p-2 text-base font-medium"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="lg:w-78 ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
        >
          Ajouter
        </button>
      </form>

      <ToastContainer limit={1} />
    </main>
  );
}
