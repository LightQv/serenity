import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifySuccess, {
  notifyDuplicate,
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import { registerSchema } from "../../../services/validators";
import FormError from "../../FormError";

export default function AddPatient() {
  const [passwordVerify, setPasswordVerify] = useState("");
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
  const [errors, setErrors] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (patientRegister.password !== passwordVerify) {
      notifyError("Les mots de passe ne correspondent pas");
      return;
    }
    if (registerSchema.isValidSync(patientRegister)) {
      try {
        const res = await APIService.post(`/users`, patientRegister);
        if (res.status === 201) {
          notifySuccess("Le patient a été ajouté");
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 422) {
          notifyDuplicate("Email déjà existant");
        } else {
          notifyError("Erreur dans l'ajout du patient");
        }
      }
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "password_verify") {
      setPasswordVerify(e.target.value);
    } else {
      setPatientRegister({
        ...patientRegister,
        [e.target.name]: e.target.value,
      });
      try {
        const isValid = await registerSchema.validate(patientRegister, {
          abortEarly: false,
        });
        if (isValid) {
          setErrors(null);
        }
        throw new Error();
      } catch (err) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-10 align-middle">
      <div className="flex">
        <h1 className="mb-2 mt-0 text-lg font-extrabold text-violet-dark-0 lg:mb-8">
          Ajouter un patient
        </h1>
        <div className="hidden lg:ml-5 lg:block">
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
      </div>
      <div>
        <form
          className="grid grid-cols-1 content-center  lg:grid-cols-2  lg:gap-8"
          onSubmit={handlesubmit}
        >
          {errors && <FormError errors={errors} />}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-bold">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required="required"
              className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required="required"
              className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address_number" className="text-base font-bold">
              Numéro de rue
            </label>
            <input
              type="text"
              name="address_number"
              id="address_number"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address_streetname" className="text-base font-bold">
              Adresse
            </label>
            <input
              type="text"
              name="address_streetname"
              id="address_streetname"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
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
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="téléphone" className=" grid text-base font-bold">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required="required"
              className=" mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="password" className="text-base font-bold">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password_verify" className="text-base font-bold">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              name="password_verify"
              id="password_verify"
              required="required"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>

          <button
            disabled={!registerSchema.isValidSync(patientRegister)}
            type="submit"
            className="mt-2 rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 p-2 px-6 py-3 text-sm font-bold text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-6 lg:h-14"
          >
            Ajouter
          </button>
        </form>
      </div>

      <ToastContainer limit={1} />
    </div>
  );
}
