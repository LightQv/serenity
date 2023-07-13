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
        if (res) {
          notifySuccess("Le patient a été ajouté");
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 409) {
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
    <div className="flex flex-col justify-between p-10 align-middle">
      <div className="flex">
        <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
          Un nouveau patient ?
        </h1>
      </div>
      <div>
        {errors && <FormError errors={errors} />}
        <form
          className="grid grid-cols-1 content-center items-center p-4 lg:grid-cols-2 lg:gap-8 lg:p-8"
          onSubmit={handlesubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base font-bold lg:pb-2">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required="required"
              placeholder="nom"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-base font-bold lg:pb-2">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required="required"
              placeholder="prénom"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address_number"
              className="text-base font-bold lg:pb-2"
            >
              Numéro de rue
            </label>
            <input
              type="text"
              name="address_number"
              id="address_number"
              required="required"
              placeholder="numéro de rue"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address_streetname"
              className="text-base font-bold lg:pb-2"
            >
              Adresse
            </label>
            <input
              type="text"
              name="address_streetname"
              id="address_streetname"
              required="required"
              placeholder="adresse"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-base font-bold lg:pb-2">
              Ville
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required="required"
              placeholder="ville"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="téléphone"
              className=" grid text-base font-bold lg:pb-2"
            >
              Téléphone
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              required="required"
              placeholder="téléphone(sans espaces)"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base font-bold lg:pb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required="required"
              placeholder="adresse@mail.com"
              className=" mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="password" className="text-base font-bold lg:pb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required="required"
              placeholder="••••••••"
              className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password_verify"
              className="text-base font-bold lg:pb-2"
            >
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              name="password_verify"
              id="password_verify"
              required="required"
              placeholder="••••••••"
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
