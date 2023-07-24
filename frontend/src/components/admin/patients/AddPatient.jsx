import React, { useState } from "react";
import PropTypes from "prop-types";
import notifySuccess, {
  notifyDuplicate,
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import { registerSchema } from "../../../services/validators";
import FormError from "../../FormError";

export default function AddPatient({ setIsShow }) {
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
          setIsShow({ modalAdd: false });
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
    const { name, value } = e.target;
    if (e.target.name === "password_verify") {
      setPasswordVerify(e.target.value);
    } else {
      setPatientRegister({
        ...patientRegister,
        [e.target.name]: e.target.value,
      });
      try {
        await registerSchema.validateAt(name, { [name]: value });
        // valide uniquement le champ qui est en cours de modification
        setErrors((prevErrors) => {
          if (!prevErrors) return null;

          const newErrors = { ...prevErrors };
          delete newErrors[name];

          return Object.keys(newErrors).length ? newErrors : null;
        });
      } catch (err) {
        setErrors((prevErrors) => ({
          ...(prevErrors || {}),
          [name]: err.errors[0],
        }));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1">
      <div>
        <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
          Un nouveau patient ?
        </h1>
      </div>
      <div className="lg:pb-4">
        {errors && (
          <div className="p-4 lg:px-8">
            <FormError errors={errors} />
          </div>
        )}
        <form
          className="gap-4 space-y-4 p-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:p-8"
          onSubmit={handlesubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-base">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required="required"
              placeholder="Nom"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-2 text-base">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required="required"
              placeholder="Prénom"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address_number" className="mb-2 text-base">
              Numéro de rue
            </label>
            <input
              type="text"
              name="address_number"
              id="address_number"
              required="required"
              placeholder="Numéro de rue"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address_streetname" className="mb-2 text-base">
              Adresse
            </label>
            <input
              type="text"
              name="address_streetname"
              id="address_streetname"
              required="required"
              placeholder="Adresse"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-2 text-base">
              Ville
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required="required"
              placeholder="Ville"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="téléphone" className="mb-2 text-base">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              required="required"
              placeholder="Numéro de téléphone"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required="required"
              placeholder="adresse@mail.com"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="password" className="mb-2 text-base">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required="required"
              placeholder="••••••••"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password_verify" className="mb-2 text-base">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              name="password_verify"
              id="password_verify"
              required="required"
              placeholder="••••••••"
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center lg:h-fit lg:w-full lg:flex-col">
            <button
              disabled={!registerSchema.isValidSync(patientRegister)}
              type="submit"
              className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mb-0 lg:mt-5 lg:h-full lg:w-full"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddPatient.propTypes = {
  setIsShow: PropTypes.func.isRequired,
};
