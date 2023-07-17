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
  }, [isShow.modalEdit]);

  if (!patient) return null;
  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-12 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold lg:text-xl">Fiche patient</h3>
          <h3 className="text-2xl font-semibold lg:text-4xl">
            {patient.firstname} {patient.lastname}
          </h3>
        </div>
        <div className="flex items-center gap-2">
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
      <div className="flex flex-col justify-center lg:m-auto lg:w-fit lg:rounded-xl lg:bg-gray-200 lg:p-10 lg:shadow-xl">
        <div className="mt-4 grid grid-cols-1 gap-4 lg:mt-0 lg:grid-cols-2 lg:gap-8 lg:p-6">
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Nom</h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.lastname}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Prénom</h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.firstname}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Numéro de rue</h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.address_number}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Adresse</h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.address_streetname}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Ville</h3>
            <p className="text-base font-semibold lg:text-xl">{patient.city}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">Email</h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.email}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-normal lg:text-base">
              Numéro de téléphone
            </h3>
            <p className="text-base font-semibold lg:text-xl">
              {patient.phone_number}
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          isShow.modalEdit || isShow.modalDelete
            ? "absolute left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center overflow-auto bg-black/80 p-4"
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
