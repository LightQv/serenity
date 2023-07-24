import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addInterventionSchema } from "../../../services/validators";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import FormError from "../../FormError";

export default function AddIntervention({ setIsShow }) {
  const [operations, setOperations] = useState(null);
  const [practitioners, setPractitioners] = useState(null);
  const [users, setUsers] = useState(null);
  const [interventions, setInterventions] = useState({
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (addInterventionSchema.isValidSync(interventions)) {
      try {
        const res = await APIService.post(`/interventions`, interventions);
        if (res) {
          notifySuccess("L'intervention a été ajouté");
          setIsShow({ modalAdd: false });
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée`);
        } else {
          notifyError("Erreur dans l'ajout de l'intervention");
        }
      }
    } else notifyError("Une erreur dans la saisie.");
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInterventions({
      ...interventions,
      [name]: value,
    });

    try {
      await addInterventionSchema.validateAt(name, { [name]: value });
      // valide uniquement le champ en cours de modification
      setErrors((prevErrors) => {
        if (!prevErrors) return null;
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return Object.keys(newErrors).length ? newErrors : null;
      });
    } catch (err) {
      setErrors((prevErrors) => ({
        ...(prevErrors || {}),
        [name]: err.errors[0],
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1">
      <div>
        <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
          Une nouvelle intervention ?
        </h1>
      </div>
      <form
        action="addIntervention"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handlesubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="operation_id" className="mb-2 text-base">
            Sélectionner une intervention
          </label>
          <select
            name="operation_id"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            required="required"
            onChange={handleChange}
            // déclenche le message d'erreur sur le select
            onFocus={handleChange}
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
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              required="required"
              onChange={handleChange}
              onFocus={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="practitioner_id" className="mb-2 text-base">
              Sélectionner un chirurgien
            </label>
            <select
              name="practitioner_id"
              className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
              required="required"
              onChange={handleChange}
              onFocus={handleChange}
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
            Sélectionner le patient
          </label>
          <select
            name="user_id"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            required="required"
            onChange={handleChange}
            onFocus={handleChange}
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
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

AddIntervention.propTypes = {
  setIsShow: PropTypes.func.isRequired,
};
