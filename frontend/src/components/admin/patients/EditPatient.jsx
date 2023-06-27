import React, { useEffect, useState } from "react";
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
  const [patientInfo, setPatientInfo] = useState({
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

  useEffect(() => {
    APIService.get(`/users/${selectedPatient}`)
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((error) => notifyError(`${error}"La requête a échoué"}`));
  }, []);

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
      if (err.request.status === 500) {
        notifyError(`${err.request.status} : La requete a échouée.`);
      }
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "password_verify") {
      setPasswordVerify(e.target.value);
    } else {
      const { name, value } = e.target;
      setEditPatient((prevPatient) => ({
        ...prevPatient,
        [name]: value,
      }));
    }
  };
  if (!patientInfo) return null;
  return (
    <div className="flex flex-col justify-between p-10 align-middle">
      <div className="flex">
        <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
          Modifier ce patient ?
        </h1>
      </div>
      <form
        action="addProtocol"
        className="grid grid-cols-1 content-center items-center lg:grid-cols-2  lg:gap-8"
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
            defaultValue={patientInfo.lastname}
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
            defaultValue={patientInfo.firstname}
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
            defaultValue={patientInfo.address_number}
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
            defaultValue={patientInfo.address_streetname}
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
            defaultValue={patientInfo.city}
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
            defaultValue={patientInfo.email}
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
            defaultValue={patientInfo.password}
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
            defaultValue={patientInfo.phone_number}
            required="required"
            className="mb-2 rounded-lg p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 p-2 px-6 py-3 text-sm font-bold text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-6 lg:h-14"
        >
          Modifier
        </button>
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
