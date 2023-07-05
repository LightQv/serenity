import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../services/ToastNotificationService";
import APIService from "../../services/APIService";
import EditSvg from "../../components/svg/EditSvg";
import DeleteSvg from "../../components/svg/DeleteSvg";
import Modal from "../../components/admin/Modal";
import EditPatient from "../../components/admin/patients/EditPatient";
import DeletePatient from "../../components/admin/patients/DeletePatient";

export default function AdminPatientDetails() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const [isShow, setIsShow] = useState({
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedPatient, setSelectedPatient] = useState();
  const handleEdit = () => {
    setSelectedPatient(patient.id);
    setIsShow({ modalEdit: true });
  };
  const handleDelete = () => {
    setSelectedPatient(patient.id);
    setIsShow({ modalDelete: true });
  };

  useEffect(() => {
    APIService.get(`/users/${id}`)
      .then((response) => setPatient(response.data))
      .catch((error) => notifyError(`${error}"La requête a échoué"}`));
  }, [isShow]);

  if (!patient) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Fiche du patient
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-10 lg:shadow-xl">
        <div className="mb-2 flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold lg:mb-8 lg:text-3xl ">
            {patient.firstname} {patient.lastname}
          </h2>
          <div className="ml-2 flex gap-2">
            <button
              type="button"
              className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
              onClick={handleEdit}
            >
              <EditSvg />
            </button>
            <button
              type="button"
              className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
              onClick={handleDelete}
            >
              <DeleteSvg />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">Nom</div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.lastname}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Prénom
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.firstname}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Numéro de rue
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.address_number}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Adresse
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.address_streetname}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Ville
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.city}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Email
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.email}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-base font-normal lg:mb-2 lg:text-xl">
              Téléphone
            </div>
            <div className="mb-2 text-lg font-semibold lg:h-14 lg:text-2xl">
              {patient.phone_number}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          isShow.modalEdit || isShow.modalDelete
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
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
      <ToastContainer limit={1} />
    </main>
  );
}
