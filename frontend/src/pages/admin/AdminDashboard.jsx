import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import LogoutSvg from "../../components/svg/LogoutSvg";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import InsightCard from "../../components/admin/dashboard/InsightCard";

export default function AdminDashboard() {
  const { user, logout } = useUserContext();
  const [patients, setPatients] = useState(null);
  const [practitioners, setPractitioners] = useState(null);
  const [interventions, setInterventions] = useState(null);

  // Fetch protocols list
  const getPatientsList = () => {
    APIService.get(`/users`)
      .then((res) => setPatients(res.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(
            `${err.request.status} : La récupération des patients a échouée.`
          );
        }
      });
  };

  // Fetch practitioners list
  const getPractionersList = () => {
    APIService.get(`/practitioners`)
      .then((res) => setPractitioners(res.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(
            `${err.request.status} : La récupération des praticiens a échouée`
          );
        }
      });
  };

  // Fetch protocols list
  const getProtocolsList = () => {
    APIService.get(`/interventions`)
      .then((res) => setInterventions(res.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(
            `${err.request.status} : La récupération des protocoles a échouée`
          );
        }
      });
  };

  useEffect(() => {
    getPatientsList();
    getPractionersList();
    getProtocolsList();
  }, []);

  return (
    <main className="min-w-screen relative mb-12 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <h3 className="text-2xl font-semibold lg:text-4xl">
          Bonjour, {user.user_firstname} {user.user_lastname}
        </h3>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-red-500 hover:bg-red-500 lg:p-2"
          onClick={() => logout()}
        >
          <LogoutSvg />
        </button>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-2 gap-y-6 lg:gap-10">
        {practitioners && (
          <StatsCard title="Praticiens" number={practitioners.length} />
        )}
        {patients && (
          <StatsCard
            title="Patients"
            number={
              patients.filter((patient) => patient.roles === "user").length
            }
          />
        )}
        {interventions && (
          <StatsCard title="Interventions" number={interventions.length} />
        )}
        <div className="col-start-1 col-end-4 lg:col-span-1">
          {practitioners && (
            <InsightCard
              title="Gérer les Praticiens"
              data={practitioners.slice(0, 4)}
              link="practitioners"
            />
          )}
        </div>
        <div className="col-start-1 col-end-4 lg:col-span-1">
          {patients && (
            <InsightCard
              title="Gérer les Patients"
              data={patients.slice(1, 5)}
              link="patients"
            />
          )}
        </div>
        <div className="col-start-1 col-end-4 lg:col-span-1">
          {interventions && (
            <InsightCard
              title="Gérer les Interventions"
              data={interventions.slice(0, 4)}
              link="interventions"
            />
          )}
        </div>
      </div>
    </main>
  );
}
