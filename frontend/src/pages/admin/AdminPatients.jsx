import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PatientInsight from "../../components/admin/patients/PatientInsight";
import Modal from "../../components/admin/Modal";
import AddPatient from "../../components/admin/patients/AddPatient";
import APIService from "../../services/APIService";
import PatientPagination from "../../components/admin/patients/PatientPagination";
import SearchBar from "../../components/admin/patients/SearchBar";

export default function AdminPatients() {
  const [listPatients, setListPatients] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
  });
  const [selectedPatient, setSelectedPatient] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(9);
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
        .catch((err) => console.error(err));
    }
  }, [term, isShow]);

  if (!listPatients) return null;

  // défini le numéro du dernier patient affiché sur la page
  const indexOfLastPatient = currentPage * patientsPerPage;

  // défini le numéro du premier patient affiché
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const filteredPatients = listPatients.filter((patient) => {
    if (
      Array.isArray(patient) ||
      !patient.id ||
      !patient.firstname ||
      !patient.lastname
    ) {
      return false;
    }
    if (patient.id && patient.firstname && patient.lastname) {
      const fullName = `${patient.firstname} ${patient.lastname}`.toLowerCase();
      const search = searchValue.toLowerCase();
      return fullName.includes(search);
    }
    return false;
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSearchParams({ term: value });
  };

  // Permet de passer à une page spécifique
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des patients
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <SearchBar value={searchValue} onChange={handleSearchChange} />
        <button
          type="button"
          className="my-4 h-fit w-fit self-end rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mr-4 lg:mt-8"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter un patient
        </button>
        <ul className="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-6">
          {filteredPatients
            .slice(indexOfFirstPatient, indexOfLastPatient)
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
      </div>
      <div
        className={
          isShow.modalAdd
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddPatient />} setIsShow={setIsShow} />
        )}
      </div>
      <PatientPagination
        patientsPerPage={patientsPerPage}
        totalPatients={filteredPatients.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </main>
  );
}
