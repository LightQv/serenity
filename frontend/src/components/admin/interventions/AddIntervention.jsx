import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";

export default function AddIntervention() {
  const [operations, setOperations] = useState(null);
  const [practitioners, setPractitioners] = useState(null);
  const [users, setUsers] = useState(null);
  const [interventions, setInterventions] = useState({
    operation_id: null,
    date: "",
    practitioner_id: null,
    user_id: null,
  });

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

    try {
      const res = await APIService.post(`/interventions`, interventions);
      if (res) {
        notifySuccess("L'intervention a été ajouté'");
      } else throw new Error();
    } catch (err) {
      if (err.request.status === 401) {
        notifyError(`${err.request.status} : La requete a échouée`);
      } else {
        notifyError("Erreur dans l'ajout de l'intervention");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // mise à jour du state avec le nom de famille
    if (name === "lastname") {
      setInterventions({
        ...interventions,
        [name]: value,
      });
      // recherche un utilisateur qui a un nom et prénom correspondant
    } else if (name === "firstname") {
      const selectedUser = users.find(
        (user) =>
          user.lastname === interventions.lastname && user.firstname === value
      );
      // mise à jour du user.id avec l'id de l'utilisateur
      setInterventions({
        ...interventions,
        user_id: selectedUser ? selectedUser.id : null,
      });
    } else {
      setInterventions({
        ...interventions,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex flex-col justify-between p-10 align-middle">
      <div className="flex">
        <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
          Une nouvelle intervention ?
        </h1>
      </div>
      <form
        action="addIntervention"
        className="grid grid-cols-1 content-center items-center p-4 "
        onSubmit={handlesubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="operation_id" className="mb-2 text-base">
            Sélectionner une intervention
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="practitioner_id" className="mb-2 text-base">
              Sélectionner un chirurgien
            </label>
            <select
              name="practitioner_id"
              className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
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
            name="lastname"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            onChange={handleChange}
          >
            <option value="">---</option>
            {users &&
              users.map((user) => (
                <option name="lastname" value={user.lastname} key={user.id}>
                  {user.lastname}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="mb-2 text-base">
            Sélectionner le prénom du patient
          </label>

          <select
            name="firstname"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
            onChange={handleChange}
          >
            <option value="">---</option>
            {users &&
              users
                // filtrer le tableau users pour ne récupérer que les utilisateurs dont le nom de famille correspond à la valeur de interventions.lastname
                .filter((user) => user.lastname === interventions.lastname)
                .map((user) => (
                  <option name="firstname" value={user.firstname} key={user.id}>
                    {user.firstname}
                  </option>
                ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 p-2 px-6 py-3 text-sm font-bold text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-6 lg:h-14"
        >
          Ajouter
        </button>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}
