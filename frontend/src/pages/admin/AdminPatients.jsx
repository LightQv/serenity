import React, { useEffect, useState } from "react";
import PatientDetails from "../../components/admin/patients/PatientDetails";
import EditPatient from "../../components/admin/patients/EditPatient";
import DeletePatient from "../../components/admin/patients/DeletePatient";
import Modal from "../../components/admin/Modal";
import AddPatient from "../../components/admin/patients/AddPatient";
import APIService from "../../services/APIService";

export default function AdminPatients() {
  const [listPatients, setListPatients] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedPatient, setSelectedPatient] = useState();

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
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter un patient
        </button>
        <ul className="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-6">
          {listPatients
            .filter((patient) => patient.roles === "user")
            .map((patient) => (
              <PatientDetails
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
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddPatient />} setIsShow={setIsShow} />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditPatient
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeletePatient
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div>
    </main>
  );
}
