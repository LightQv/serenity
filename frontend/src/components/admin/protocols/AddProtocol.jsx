import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { protocolSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import FormError from "../../FormError";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AddProtocol() {
  const [operations, setOperations] = useState(null);
  const [protocolInfos, setProtocolInfos] = useState({
    protocol_name: "",
    operation_id: "",
  });
  const [errors, setErrors] = useState(null);

  // Fetch Operations data
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/operations`)
      .then((res) => {
        setOperations(res.data);
      })
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  // Submit Add Protocol Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (protocolSchema.isValid)
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/protocols`,
          protocolInfos
        );
        if (res) {
          notifySuccess("Le protocole a été ajouté.");
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
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

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
        Un nouveau protocole ?
      </h1>
      <form
        action="addProtocol"
        className="gap-4 space-y-4 p-4 lg:p-8"
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
            placeholder="Nom du protocole"
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
          >
            <option
              value=""
              onClick={(e) =>
                setProtocolInfos({
                  ...protocolInfos,
                  operation_id: e.target.value,
                })
              }
            >
              ---
            </option>
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
        <div className="flex items-center justify-center">
          <button
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
