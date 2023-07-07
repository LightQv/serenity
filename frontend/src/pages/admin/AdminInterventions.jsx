import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import InterventionDetails from "../../components/admin/interventions/InterventionDetails";
import AddIntervention from "../../components/admin/interventions/AddIntervention";
import Modal from "../../components/admin/Modal";

export default function AdminInterventions() {
  const [interventions, setInterventions] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedIntervention, setSelectedIntervention] = useState();

  useEffect(() => {
    APIService.get(`/interventions`)
      .then((response) => setInterventions(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [isShow]);

  if (!interventions) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
        Gestion des interventions
      </h3>
      <div className="flex w-full flex-col justify-center rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="hidden w-full items-center justify-between border-b-[1px] border-slate-200 lg:grid lg:h-12 lg:grid-cols-5 lg:border-gray-300 lg:px-4">
          <p className="text-sm lg:pl-2">Nom de l'intervention</p>
          <p className=" text-sm ">Date de l'intervention</p>
          <p className=" text-sm ">Nom du chirurgien</p>
          <p className=" text-sm ">Nom du patient</p>
          <div className="flex items-center justify-end gap-2 lg:pr-3">
            <p className="text-xs italic text-gray-500">Interactions</p>
          </div>
        </div>
        {interventions && interventions.length !== 0 ? (
          <ul className="grid w-full grid-cols-1 gap-2 lg:gap-0">
            {interventions
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((intervention) => (
                <InterventionDetails
                  key={intervention.id}
                  intervention={intervention}
                  selectedIntervention={selectedIntervention}
                  setSelectedintervention={setSelectedIntervention}
                  setIsShow={setIsShow}
                />
              ))}
          </ul>
        ) : (
          <p className="self-center text-xs">Aucune intervention disponible.</p>
        )}
        <button
          type="button"
          className="bottom-0 my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mr-4 lg:mt-8"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter une intervention
        </button>
      </div>

      <div
        className={
          isShow.modalAdd
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddIntervention />} setIsShow={setIsShow} />
        )}
      </div>
    </main>
  );
}
