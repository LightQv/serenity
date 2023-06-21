import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import notifySuccess, {
  notifyDuplicate,
  notifyError,
} from "../../ToastNotificationService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PatientsRegister() {
  const [patientRegister, setPatientRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone_number: "",
    address_number: "",
    address_streetname: "",
    city: "",
    roles: "user",
  });

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users`, patientRegister);
      if (res.status === 201) {
        notifySuccess("Le patient a été ajouté").then(
          navigate("/admin/patient")
        );
      }
    } catch (error) {
      if (error.request.status === 500) {
        notifyDuplicate("Email déjà existant");
      } else {
        notifyError("Erreur dans l'ajout du patient");
      }
    }
  };

  const handleChange = (e) => {
    setPatientRegister({
      ...patientRegister,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-w-screen min-h-screen bg-slate-50 p-10 font-poppins lg:ml-60">
      <h1 className="mb-2 flex items-start text-lg font-extrabold text-violet-dark-0">
        Ajouter un patient
      </h1>
      <h1 className="mb-4 text-xl font-black">
        {patientRegister.firstname} {patientRegister.lastname}
      </h1>
      <div>
        <form className="flex flex-col" onSubmit={handlesubmit}>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-bold">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Numéro de rue
            </label>
            <input
              type="text"
              name="address_number"
              id="address_number"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-base font-bold">
              Adresse
            </label>
            <input
              type="text"
              name="address_streetname"
              id="address_streetname"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-base font-bold">
              Ville
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
          >
            Ajouter
          </button>
        </form>
      </div>

      <ToastContainer limit={1} />
    </main>
  );
}
