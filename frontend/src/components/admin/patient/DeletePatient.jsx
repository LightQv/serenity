import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import APIService from "../../../services/APIService";

import { notifyError } from "../../../services/ToastNotificationService";

export default function DeletePatient() {
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
    APIService.delete(`/users/${id}`, editPatient)
      .then((response) => setEditPatient(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError("La requete a échouée");
        }
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <h1 className="self-start text-lg font-semibold lg:text-xl">
        Supprimer ce patient ?
      </h1>
      <div className="flex gap-2">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          //   onClick={handleDelete}
        >
          Oui
        </button>
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          //   onClick={() => setIsShow({ modalC: false })}
        >
          Non
        </button>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
