import React, { useEffect, useState } from "react";
import axios from "axios";
import ListPatients from "../../components/admin/ListPatients";
import Modal from "../../components/admin/Modal";
import AddPatient from "../../components/admin/patients/AddPatient";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PatientsManagement() {
  const [listPatients, setListPatients] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/users`)
      .then((response) => setListPatients(response.data))
      .catch((err) => console.error(err));
  }, [isShow]);

  if (!listPatients) return null;
  return (
    <main className="min-w-screen relative min-h-screen bg-slate-50 p-10 font-poppins lg:ml-60">
      <button
        type="submit"
        className="ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
        onClick={() => setIsShow(true)}
      >
        Ajouter un patient
      </button>

      <div>
        {listPatients.map((listPatient) => (
          <ListPatients key={listPatient.id} listPatient={listPatient} />
        ))}
      </div>
      <div
        className={
          isShow
            ? "absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        <Modal component={<AddPatient setIsShow={setIsShow} />} />
      </div>
    </main>
  );
}
