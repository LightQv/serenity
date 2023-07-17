import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { editInterventionSchema } from "../../../services/validators";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import "react-toastify/dist/ReactToastify.css";
import FormError from "../../FormError";

export default function EditIntervention({
  selectedIntervention,
  setSelectedIntervention,
  setIsShow,
}) {
  const [operations, setOperations] = useState(null);
  const [practitioners, setPractitioners] = useState(null);
  const [users, setUsers] = useState(null);
  const [intervention, setIntervention] = useState({
    operation_id: null,
    date: "",
    practitioner_id: null,
    user_id: null,
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    APIService.get(`/operations`)
      .then((response) => setOperations(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  useEffect(() => {
    APIService.get(`/practitioners`)
      .then((response) => setPractitioners(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  useEffect(() => {
    APIService.get(`/users`)
      .then((response) => setUsers(response.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  useEffect(() => {
    APIService.get(`/interventions/${selectedIntervention}`)
      .then((res) =>
        setIntervention({
          operation_id: res.data.operation_id,
          date: res.data.date,
          practitioner_id: res.data.practitioner_id,
          user_id: res.data.user_id,
        })
      )
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (editInterventionSchema.isValidSync(intervention)) {
      try {
        const res = await APIService.put(
          `/interventions/${selectedIntervention}`,
          intervention
        );

        if (res) {
          notifySuccess("L'intervention a été modifiée");
          setSelectedIntervention();
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
    setIntervention({
      ...intervention,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await editInterventionSchema.validate(intervention, {
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

  if (!intervention.operation_id) return null;
  return (
    <div className="grid grid-cols-1">
      <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
        Modifier cette intervention ?
      </h1>
      <form
        action="editIntervention"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handlesubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="operation_name" className="mb-2 text-base">
            Sélectionner l'intervention
          </label>
          <select
            name="operation_id"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            value={intervention.operation_id}
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
          <div className="flex flex-col">
            <label htmlFor="operation_id" className="mb-2 text-base">
              Sélectionner une date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={intervention.date}
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              required="required"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="practitioner_id" className="mb-2 text-base">
              Sélectionner un chirurgien
            </label>
            <select
              name="practitioner_id"
              className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
              value={intervention.practitioner_id}
              onChange={handleChange}
            >
              <option value="">---</option>
              {practitioners &&
                practitioners.map((practitioner) => (
                  <option
                    name="practitioner_id"
                    value={practitioner.id}
                    key={practitioner.id}
                  >
                    {practitioner.surname}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname" className="mb-2 text-base">
            Sélectionner le nom du patient
          </label>
          <select
            name="user_id"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            value={intervention.user_id}
            onChange={handleChange}
          >
            <option value="">---</option>
            {users &&
              users.map((user) => (
                <option name="user_id" value={user.id} key={user.id}>
                  {user.lastname} {user.firstname}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
          >
            Modifier
          </button>
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}

EditIntervention.propTypes = {
  selectedIntervention: PropTypes.number.isRequired,
  setSelectedIntervention: PropTypes.shape().isRequired,
  setIsShow: PropTypes.shape().isRequired,
};
