import React, { useEffect, useState } from "react";
import axios from "axios";
import ListPatients from "../../components/admin/ListPatients";
// import PatientsRegisterModal from "../../components/admin/PatientsRegisterModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PatientsManagement() {
  const [listPatients, setListPatients] = useState([]);
  // const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/users`)
      .then((response) => setListPatients(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-w-screen relative min-h-screen bg-slate-50 p-10 font-poppins lg:ml-60">
      <button
        type="submit"
        className="ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
        // onClick={() => setIsShow(true)}
      >
        Ajouter un patient
      </button>
      <div>
        {listPatients.map((listPatient) => (
          <ListPatients key={listPatient.id} listPatient={listPatient} />
        ))}
      </div>
      {/* {isShow && (
        <div className="bg-50% absolute bottom-0 left-0 z-10 h-screen w-screen items-center justify-center">
          <PatientsRegisterModal />
        </div>
      )} */}
    </main>
  );
}
