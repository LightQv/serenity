import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { itemSchema } from "../../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../../services/ToastNotificationService";
import APIService from "../../../../services/APIService";
import FormError from "../../../FormError";

export default function AddItem({ protocolId }) {
  const [errors, setErrors] = useState(null);
  const [itemInfos, setItemInfos] = useState({
    protocol_item_name: "",
    protocol_description: "",
    protocol_id: protocolId,
    is_complete: 0,
  });

  // Submit Add Item Request
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    if (itemSchema.isValidSync(itemInfos)) {
      try {
        const item = await APIService.post(`/items`, itemInfos);
        if (item) {
          setItemInfos({
            ...itemInfos,
            protocol_item_name: "",
            protocol_description: "",
          });
          e.target.value = "";
          notifySuccess("Le contenu a été ajouté.");
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
    } else notifyError("Une erreur dans la saisie.");
  };

  // Change Item Form Part
  const handleChangeItem = async (e) => {
    const { name, value } = e.target;

    setItemInfos({
      ...itemInfos,
      [e.target.name]: e.target.value,
    });

    try {
      await itemSchema.validateAt(name, { [name]: value });
      // valide uniquement le champ qui a été modifé
      setErrors((prevErrors) => {
        // prevErrors = valeur actuelle du state
        if (!prevErrors) return null;
        // si la validation réussit on retourne null
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        // supprime newErrors= nom du champs en cours de validation
        return Object.keys(newErrors).length ? newErrors : null;
        // vérifie si l'objet a encore des erreurs et renvoie un tableau contenant toutes les clés (erreurs) de newErrors, et .length donne le nombre de clés sinon null
      });
    } catch (err) {
      setErrors((prevErrors) => ({
        ...(prevErrors || {}),
        [name]: err.errors[0],
      }));
    }
  };

  return (
    <div>
      <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
        Ajouter du contenu ?
      </h1>
      <form
        action="addProtocol"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handleSubmitItem}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="protocol_item_name" className="mb-2 text-base">
            Nom du contenu
          </label>
          <input
            type="text"
            name="protocol_item_name"
            id="protocol_item_name"
            placeholder="Nom du contenu"
            value={itemInfos?.protocol_item_name}
            required=""
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChangeItem}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="protocol_description" className="mb-2 text-base">
            Description du contenu
          </label>
          <textarea
            type="text"
            name="protocol_description"
            id="protocol_description"
            placeholder="Description du contenu"
            value={itemInfos?.protocol_description}
            required=""
            spellCheck
            className="h-24 resize-none rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChangeItem}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={!itemSchema.isValidSync(itemInfos)}
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
          >
            Ajouter
          </button>
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}

AddItem.propTypes = {
  protocolId: PropTypes.number.isRequired,
};
