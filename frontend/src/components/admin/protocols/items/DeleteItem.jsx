import PropTypes from "prop-types";
import notifySuccess, {
  notifyError,
} from "../../../../services/ToastNotificationService";
import APIService from "../../../../services/APIService";

export default function DeleteProtocol({
  selectedItem,
  setSelectedItem,
  setIsShow,
}) {
  // Submit Delete Protocol Request
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/items/${selectedItem}`);
      if (res) {
        notifySuccess("Le contenu a bien été supprimé.");
        setSelectedItem();
        setIsShow(false);
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
      <div className="self-center text-center">
        <h1 className="text-lg font-semibold lg:text-xl">
          Supprimer ce contenu ?
        </h1>
      </div>
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
          onClick={() => setIsShow(false)}
        >
          Non
        </button>
      </div>
    </div>
  );
}

DeleteProtocol.propTypes = {
  selectedItem: PropTypes.number.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
