import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { itemSchema } from "../../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../../services/ToastNotificationService";
import APIService from "../../../../services/APIService";
import FormError from "../../../FormError";

export default function EditItem({ selectedItem, setSelectedItem, setIsShow }) {
  const [itemInfos, setItemInfos] = useState({
    protocol_item_name: "",
    protocol_description: "",
    protocol_id: selectedItem,
    is_complete: "",
  });
  const [errors, setErrors] = useState(null);

  // Fetch Protocols data
  useEffect(() => {
    APIService.get(`/items/details/${selectedItem}`)
      .then((res) => {
        setItemInfos({
          protocol_item_name: res.data.protocol_item_name,
          protocol_description: res.data.protocol_description,
          is_complete: res.data.is_complete,
        });
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  // Submit Edit Protocol Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemSchema.isValidSync(itemInfos)) {
      try {
        const res = await APIService.put(
          `/items/details/${selectedItem}`,
          itemInfos
        );
        if (res) {
          notifySuccess("Le contenu a été modifié.");
          setSelectedItem();
          setIsShow({ modalEdit: false });
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
    } else notifyError("Une erreur dans la saisie.");
  };

  const handleChange = async (e) => {
    setItemInfos({
      ...itemInfos,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await itemSchema.validate(itemInfos, {
        abortEarly: false,
      });
      if (isValid) {
        setErrors(null);
      }
      throw new Error();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1">
      <div>
        <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
          Modifier ce contenu ?
        </h1>
        <form
          action="addProtocol"
          className="gap-4 space-y-4 px-4 pb-1 pt-2 lg:p-8"
          onSubmit={handleSubmit}
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
              defaultValue={itemInfos.protocol_item_name}
              required
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
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
              defaultValue={itemInfos.protocol_description}
              required
              spellCheck
              className="h-24 resize-none rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={!itemSchema.isValidSync(itemInfos)}
              type="submit"
              className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditItem.propTypes = {
  selectedItem: PropTypes.number.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
