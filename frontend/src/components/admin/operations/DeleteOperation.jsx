import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";

export default function DeleteOperation({
  selectedOperation,
  setSelectedOperation,
  setIsShow,
}) {
  // Submit Delete Operation Request
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/operations/${selectedOperation}`);
      if (res) {
        notifySuccess("L'operation a bien été supprimé.");
        setSelectedOperation();
        setIsShow({ modalC: false });
      }
      throw new Error();
    } catch (err) {
      if (err.request?.status === 500) {
        notifyError("La requête a échouée.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <h1 className="self-start text-lg font-semibold lg:text-xl">
        Supprimer cette operation ?
      </h1>
      <div className="flex gap-2">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-rose-dark-0 bg-rose-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-rose-light-0 hover:bg-rose-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={handleDelete}
        >
          Oui
        </button>
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-gray-300 bg-gray-300 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalC: false })}
        >
          Non
        </button>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

DeleteOperation.propTypes = {
  selectedOperation: PropTypes.number.isRequired,
  setSelectedOperation: PropTypes.shape().isRequired,
  setIsShow: PropTypes.shape().isRequired,
};
