import PropTypes from "prop-types";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";

export default function DeletePractitioner({
  selectedPractitioner,
  setSelectedPractitioner,
  setIsShow,
}) {
  const handleDelete = async () => {
    if (selectedPractitioner !== "") {
      try {
        const res = await APIService.delete(
          `/practitioners/${selectedPractitioner}`
        );
        if (res) {
          notifySuccess("Le praticien a bien été supprimé.");
          setSelectedPractitioner(null);
          setIsShow({ modalDelete: false });
        }
        throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError("La requête a échouée.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <h1 className="self-start text-lg font-semibold lg:text-xl">
        Supprimer ce praticien ?
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
DeletePractitioner.propTypes = {
  selectedPractitioner: PropTypes.number.isRequired,
  setSelectedPractitioner: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
