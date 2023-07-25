import PropTypes from "prop-types";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";

export default function DeleteIntervention({
  selectedIntervention,
  setSelectedIntervention,
  setIsShow,
  interventions,
  currentPage,
  setCurrentPage,
}) {
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(
        `/interventions/${selectedIntervention}`
      );
      if (res) {
        if (interventions.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        notifySuccess("L'intervention a été supprimée");
        setSelectedIntervention();
        setIsShow({ modalDelete: false });
      }
      throw new Error();
    } catch (error) {
      if (error.request?.status === 500) {
        notifyError("La requête a échouée.");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <h1 className="text-lg font-semibold lg:text-xl">
        Supprimer cette intervention ?
      </h1>
      <div className="flex gap-2">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-red-500 bg-red-500 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-rose-light-0 hover:bg-rose-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={handleDelete}
        >
          Oui
        </button>
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-gray-300 bg-gray-300 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalDelete: false })}
        >
          Non
        </button>
      </div>
    </div>
  );
}

DeleteIntervention.propTypes = {
  selectedIntervention: PropTypes.number.isRequired,
  setSelectedIntervention: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
  interventions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
