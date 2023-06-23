import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import "react-toastify/dist/ReactToastify.css";

export default function EditPatient({
  selectedPatient,
  setSelectedPatient,
  setIsShow,
}) {
  const [editPatient, setEditPatient] = useState({
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
  const [passwordVerify, setPasswordVerify] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editPatient.password !== passwordVerify) {
      notifyError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await APIService.put(
        `/users/${selectedPatient}`,
        editPatient
      );
      if (res) {
        notifySuccess("Le patient a été modifié");
        setSelectedPatient();
        setIsShow({ modalB: false });
      } else throw new Error();
    } catch (err) {
      if (err.request.status === 401) {
        notifyError(`${err.request.status} : La requete a échouée.`);
      }
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "password_verify") {
      setPasswordVerify(e.target.value);
    } else {
      setEditPatient({
        ...editPatient,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-10 align-middle">
      <form
        action="addProtocol"
        className="grid grid-cols-1 content-center  lg:grid-cols-2  lg:gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col ">
          <label htmlFor="name" className="text-base font-bold">
            Nom
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={editPatient.name}
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
            value={editPatient.firstname}
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
            value={editPatient.address_number}
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
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
            value={editPatient.address_streetname}
            required="required"
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
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
            value={editPatient.city}
            required="required"
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
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
            value={editPatient.email}
            required="required"
            className=" mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password" className="text-base font-bold">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={editPatient.password}
            required="required"
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
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
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
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
            value={editPatient.phone_number}
            required="required"
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
          >
            Modifier
          </button>
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}

EditPatient.propTypes = {
  selectedPatient: PropTypes.number.isRequired,
  setSelectedPatient: PropTypes.shape().isRequired,
  setIsShow: PropTypes.shape().isRequired,
};
