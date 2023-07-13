import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PatientInsight from "../../components/admin/patients/PatientInsight";
import Modal from "../../components/admin/Modal";
import AddPatient from "../../components/admin/patients/AddPatient";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import SearchBar from "../../components/admin/SearchBar";

export default function AdminPatients() {
  const [listPatients, setListPatients] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
  });
  const [selectedPatient, setSelectedPatient] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get("term");

  useEffect(() => {
    if (term) {
      APIService.get(`/users/search/${term}`)
        .then((response) => {
          setListPatients(response.data);
        })
        .catch((err) => console.error(err));
    } else {
      APIService.get(`/users`)
        .then((response) => {
          setListPatients(response.data);
        })
        .catch((err) => {
          if (err.request.status === 401) {
            notifyError(`${err.request.status} : La requete a échouée.`);
          }
        });
    }
  }, [term, isShow]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSearchParams({ term: value });
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-12 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des patients
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="flex w-full flex-col-reverse justify-between lg:flex-row lg:items-center lg:px-4">
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            type="patient"
          />
          <button
            type="button"
            className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 lg:my-1 lg:mt-4 lg:self-end"
            onClick={() => setIsShow({ modalAdd: true })}
          >
            Ajouter un patient
          </button>
        </div>
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom du patient</p>
          <div className="flex items-center gap-2 lg:pr-3">
            <p className="text-xs italic text-gray-500">Voir plus</p>
          </div>
        </div>
        {listPatients && listPatients.length !== 0 ? (
          <ul className="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-2">
            {listPatients
              .filter((patient) => patient.roles === "user")
              .map((patient) => (
                <PatientInsight
                  key={patient.id}
                  patient={patient}
                  selectedPatient={selectedPatient}
                  setSelectedPatient={setSelectedPatient}
                  setIsShow={setIsShow}
                />
              ))}
          </ul>
        ) : (
          <p className="mt-2 self-center text-xs lg:mb-4 lg:mt-8 lg:text-base">
            Aucun patient disponible.
          </p>
        )}
        {/* Ici mettre le composant pagination */}
      </div>
      <div
        className={
          isShow.modalAdd
            ? "absolute left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center overflow-auto bg-black/80 p-4"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddPatient />} setIsShow={setIsShow} />
        )}
      </div>
    </main>
  );
}
