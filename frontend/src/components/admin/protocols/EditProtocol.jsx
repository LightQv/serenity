import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { protocolSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import FormError from "../../FormError";
import ItemDetails from "./items/ItemDetails";

export default function EditProtocol({ selectedProtocol, setIsShow }) {
  const [operations, setOperations] = useState(null);
  const [protocolInfos, setProtocolInfos] = useState({
    protocol_name: "",
    operation_id: null,
    color_theme: "",
  });
  const [errors, setErrors] = useState(null);

  // Fetch Protocols data
  const fetchProtocol = () => {
    APIService.get(`/protocols/${selectedProtocol}`)
      .then((res) => {
        setProtocolInfos({
          protocol_name: res.data.protocol_name,
          operation_id: res.data.operation_id,
          color_theme: res.data.color_theme,
        });
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  };

  // Fetch Operations data
  const fetchOperation = () => {
    APIService.get(`/operations`)
      .then((res) => {
        setOperations(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  };

  useEffect(() => {
    fetchProtocol();
    fetchOperation();
  }, []);

  // Submit Edit Protocol Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (protocolSchema.isValidSync(protocolInfos)) {
      try {
        const res = await APIService.put(
          `/protocols/${selectedProtocol}`,
          protocolInfos
        );
        if (res) {
          notifySuccess("Le protocole a été modifié.");
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
    setProtocolInfos({
      ...protocolInfos,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await protocolSchema.validate(protocolInfos, {
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

  if (!operations) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
          Modifier ce protocole ?
        </h1>
        <form
          action="addProtocol"
          className="gap-4 space-y-4 px-4 pb-1 pt-2 lg:p-8"
          onSubmit={handleSubmit}
        >
          {errors && <FormError errors={errors} />}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-base">
              Nom du protocole
            </label>
            <input
              type="text"
              name="protocol_name"
              id="protocol_name"
              value={protocolInfos?.protocol_name}
              required=""
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="operation_name" className="mb-2 text-base">
              Sélectionner une opération
            </label>
            <select
              name="operation_name"
              className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
              defaultValue={protocolInfos?.operation_id}
              onChange={handleChange}
            >
              <option value="">---</option>
              {operations &&
                operations.map((operation) => (
                  <option
                    name="operation_name"
                    value={operation.id}
                    key={operation.id}
                    onClick={(e) =>
                      setProtocolInfos({
                        ...protocolInfos,
                        operation_id: e.target.value,
                      })
                    }
                  >
                    {operation.operation_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex w-full flex-col">
            <h3 className="mb-2 text-base">Choisir un thème</h3>
            <div className="flex w-full justify-evenly">
              <input
                type="button"
                className={
                  protocolInfos.color_theme === "#d9b520"
                    ? "h-8 w-8 cursor-pointer rounded-full border-2 border-violet-dark-0 bg-mustard-dark-0"
                    : "h-8 w-8 cursor-pointer rounded-full bg-mustard-dark-0"
                }
                onClick={() =>
                  setProtocolInfos({
                    ...protocolInfos,
                    color_theme: "#d9b520",
                  })
                }
              />
              <input
                type="button"
                className={
                  protocolInfos.color_theme === "#079fa5"
                    ? "h-8 w-8 cursor-pointer rounded-full border-2 border-violet-dark-0 bg-turquoise-dark-0"
                    : "h-8 w-8 cursor-pointer rounded-full bg-turquoise-dark-0"
                }
                onClick={() =>
                  setProtocolInfos({
                    ...protocolInfos,
                    color_theme: "#079fa5",
                  })
                }
              />
              <input
                type="button"
                className={
                  protocolInfos.color_theme === "#c1486c"
                    ? "h-8 w-8 cursor-pointer rounded-full border-2 border-violet-dark-0 bg-rose-dark-0"
                    : "h-8 w-8 cursor-pointer rounded-full bg-rose-dark-0"
                }
                onClick={() =>
                  setProtocolInfos({
                    ...protocolInfos,
                    color_theme: "#c1486c",
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={!protocolSchema.isValidSync(protocolInfos)}
              type="submit"
              className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
      <ItemDetails selectedProtocol={selectedProtocol} />
    </div>
  );
}

EditProtocol.propTypes = {
  selectedProtocol: PropTypes.number.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
