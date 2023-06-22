import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../../../services/APIService";
import { notifyError } from "../../../services/ToastNotificationService";

export default function EditPatient() {
  const { id } = useParams();
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

  useEffect(() => {
    APIService.get(`/users/${id}`, editPatient)
      .then((response) => setEditPatient(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError("La requete a échouée");
        }
      });
  }, []);

  const handleChange = (e) => {
    setEditPatient({
      ...editPatient,
      [e.target.name]: e.target.value,
    });
  };

  if (!editPatient) return null;
  return (
    <div>
      <div className="order-1 flex flex-col">
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
      <div className="flex flex-col items-center justify-between  p-10 align-middle">
        <div className="order-2 flex flex-col">
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
        <div className="order-3 flex flex-col">
          <label htmlFor="email" className="text-base font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={editPatient.email}
            required="required"
            className=" mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-5 flex flex-col ">
          <label htmlFor="password" className="text-base font-bold">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={editPatient.password}
            required="required"
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-6 flex flex-col">
          <label htmlFor="password_verify" className="text-base font-bold">
            Confirmation du mot de passe
          </label>
          <input
            type="password"
            name="password_verify"
            id="password_verify"
            value=""
            required="required"
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-4 flex flex-col">
          <label htmlFor="téléphone" className=" grid text-base font-bold">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            value={editPatient.phone_number}
            required="required"
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-7 flex flex-col">
          <label htmlFor="address_number" className="text-base font-bold">
            Numéro de rue
          </label>
          <input
            type="text"
            name="address_number"
            id="address_number"
            value={editPatient.address_number}
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-8 flex flex-col">
          <label htmlFor="address_streetname" className="text-base font-bold">
            Adresse
          </label>
          <input
            type="text"
            name="address_streetname"
            id="address_streetname"
            value={editPatient.address_streetname}
            required="required"
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
        <div className="order-9 flex flex-col">
          <label htmlFor="city" className="text-base font-bold">
            Ville
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={editPatient.city}
            required="required"
            className="mb-2 rounded-lg bg-slate-100 p-2 text-base font-medium lg:h-14"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
