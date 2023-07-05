import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import InterventionDetails from "../../components/admin/interventions/InterventionDetails";
// import AddIntervention from "../../components/admin/interventions/AddIntervention";
// import Modal from "../../components/admin/Modal";

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
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des interventions
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom de l'intervention</p>
          {/* <div className="flex items-center gap-2 lg:pr-3"> */}
          <p className="text-sm lg:pr-7">Date de l'intervention</p>
          <p className="text-sm lg:pr-7">Nom du chirurgien</p>
          <p className="text-sm lg:pr-7">Nom du patient</p>
          <p className="text-xs italic text-gray-500">Interactions</p>
          {/* </div> */}
        </div>
        {interventions && interventions.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {interventions.map((intervention) => (
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
      </div>
      <button
        type="button"
        className="my-4 h-fit w-fit self-end rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mr-4 lg:mt-8"
        onClick={() => setIsShow({ modalAdd: true })}
      >
        Ajouter une intervention
      </button>
      {/* <div
        className={
          isShow.modalAdd
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddIntervention />} setIsShow={setIsShow} />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditIntervention
                selectedIntervention={selectedIntervention}
                setSelectedIntervention={setSelectedIntervention}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeleteIntervention
                selectedIntervention={selectedIntervention}
                setSelectedIntervention={setSelectedIntervention}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div> */}
    </main>
  );
}
