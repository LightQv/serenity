import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import InterventionDetails from "../../components/admin/interventions/InterventionDetails";
import AddIntervention from "../../components/admin/interventions/AddIntervention";
import Modal from "../../components/admin/Modal";
import EditIntervention from "../../components/admin/interventions/EditIntervention";
import DeleteIntervention from "../../components/admin/interventions/DeleteIntervention";
import Pagination from "../../components/admin/Pagination";

export default function AdminInterventions() {
  const [interventions, setInterventions] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedIntervention, setSelectedIntervention] = useState();

  const limitPerPage = 5;
  // nombre d'éléments affichés par page
  const defaultPage = 1;
  // définition de la première page affichée par défaut
  const [maxPage, setMaxPage] = useState(0);
  // nombre total de pages, initialisé avec la valeur zéro
  const [searchParams, setSearchParams] = useSearchParams();
  // génération des paramètres d'url
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || defaultPage
  );
  // current page initialisé avec la valeur de l'url correpsondant au paramètre page ou par la page par défaut
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // met à jour la valeur de currentPage lors d'un clic sur un numéro de page
  useEffect(() => {
    setSearchParams((params) => {
      searchParams.set("page", currentPage);
      // mise à jour des paramètres d'url
      if (currentPage === 1) {
        return undefined;
      }
      return params;
    });

    APIService.get(`/interventions-list?page=${currentPage}`)
      // currentPage inclu dans l'url pour récupérer la page spécifique demandée
      .then((response) => {
        setInterventions(response.data.datas);
        // mise à jour du state intervention avec les données data (total) et datas(tableau des interventions)
        setMaxPage(Math.ceil(response.data.total / limitPerPage));
        // division du total des interventions par le nombre par page pour obtenir le nombre total de pages
      })
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [currentPage, isShow]);

  return (
    <main className="relative mb-12 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-12 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des interventions
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 lg:my-1 lg:mr-4 lg:mt-4 lg:self-end"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter une intervention
        </button>
        <div className="hidden h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:flex lg:h-20 lg:border-gray-300 lg:px-4">
          <div className="grid w-full grid-cols-4 lg:pr-10">
            <p className="justify-self-start text-sm">Nom de l'intervention</p>
            <p className="justify-self-center text-sm">
              Date de l'intervention
            </p>
            <p className="justify-self-center text-sm">Nom du Praticien</p>
            <p className="justify-self-end text-sm">Nom du Patient</p>
          </div>
          <div className="flex items-center justify-end lg:pr-3">
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
                  setSelectedIntervention={setSelectedIntervention}
                  setIsShow={setIsShow}
                />
              ))}
          </ul>
        ) : (
          <p className="mt-2 self-center text-xs lg:mb-4 lg:mt-8 lg:text-base">
            Aucune intervention disponible.
          </p>
        )}
        {interventions && interventions.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            maxPage={maxPage}
          />
        )}
      </div>
      <div
        className={
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "absolute left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center overflow-auto bg-black/80 p-4"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal
            component={<AddIntervention setIsShow={setIsShow} />}
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditIntervention
                selectedIntervention={selectedIntervention}
                setSelectedIntervention={setSelectedIntervention}
                setIsShow={setIsShow}
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
                interventions={interventions}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div>
    </main>
  );
}
