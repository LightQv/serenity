import React, { useEffect, useState } from "react";
import ListPatients from "../../components/admin/patients/ListPatients";
import Modal from "../../components/admin/Modal";
import AddPatient from "../../components/admin/patients/AddPatient";
import APIService from "../../services/APIService";

export default function PatientsManagement() {
  const [listPatients, setListPatients] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    APIService.get(`/users`)
      .then((response) => setListPatients(response.data))
      .catch((err) => console.error(err));
  }, [isShow]);

  if (!listPatients) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des patients
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div>
          {listPatients.map((listPatient) => (
            <ListPatients key={listPatient.id} listPatient={listPatient} />
          ))}
        </div>
        <button
          type="submit"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow(true)}
        >
          Ajouter un patient
        </button>
      </div>
      <div
        className={
          isShow
            ? "absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        <Modal component={<AddPatient />} setIsShow={setIsShow} />
      </div>
    </main>
  );
}
