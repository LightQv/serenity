import { useEffect, useState } from "react";
import { protocolSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import FormError from "../../FormError";
import AddItem from "./items/AddItem";

export default function AddProtocol() {
  const [operations, setOperations] = useState(null);
  const [protocolInfos, setProtocolInfos] = useState({
    protocol_name: "",
    operation_id: null,
    color_theme: "",
  });
  const [errors, setErrors] = useState(null);
  const [protocolCreate, setProtocolCreate] = useState(false);
  const [newProtocolId, setNewProtocolId] = useState(null);

  // Fetch Operations data
  useEffect(() => {
    APIService.get(`/operations`)
      .then((res) => {
        setOperations(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  // Submit Add Protocol Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (protocolSchema.isValidSync(protocolInfos)) {
      try {
        const protocol = await APIService.post(`/protocols`, protocolInfos);
        if (protocol) {
          setNewProtocolId(protocol.data.id);
          setProtocolCreate(true);
          notifySuccess("Le protocole a été ajouté.");
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
    } else notifyError("Une erreur dans la saisie.");
  };

  // Change Protocol Form Part
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1">
      {protocolCreate ? (
        <AddItem protocolId={newProtocolId} />
      ) : (
        <div>
          <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
            Un nouveau protocole ?
          </h1>
          <form
            action="addProtocol"
            className="gap-4 space-y-4 p-4 lg:p-8"
            onSubmit={handleSubmit}
          >
            {errors && <FormError errors={errors} />}
            <div className="flex flex-col">
              <label htmlFor="protocol_name" className="mb-2 text-base">
                Nom du protocole
              </label>
              <input
                type="text"
                name="protocol_name"
                id="protocol_name"
                placeholder="Nom du protocole"
                required=""
                className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="operation_id" className="mb-2 text-base">
                Sélectionner une opération
              </label>
              <select
                name="operation_id"
                className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
                onChange={handleChange}
              >
                <option value="">---</option>
                {operations &&
                  operations.map((operation) => (
                    <option
                      name="operation_id"
                      value={operation.id}
                      key={operation.id}
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
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
