import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import InsightCard from "../../components/admin/dashboard/InsightCard";

export default function Dashboard() {
  const { user, logout } = useUserContext();
  const [patients, setPatients] = useState(null);
  const [practitioners, setPractitioners] = useState(null);
  const [protocols, setProtocols] = useState(null);

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
    APIService.get(`/protocols`)
      .then((res) => setProtocols(res.data))
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
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 flex h-fit w-full items-center justify-between lg:mb-8">
        <h3 className="text-2xl font-semibold lg:text-4xl">
          Bonjour, {user.firstname} {user.lastname}
        </h3>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-red-500 hover:bg-red-500 lg:p-2"
          onClick={() => logout()}
        >
          <svg
            className="h-5 w-5 lg:h-6 lg:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.2266 2H19.6562C20.9486 2 22 3.05141 22 4.34375V9.69531H20.0579V4.77249C20.0579 4.34171 19.7075 3.99124 19.2767 3.99124H14.2266V2ZM20.0579 19.2138V14.3828H22V19.6562C22 20.9486 20.9486 22 19.6562 22H14.2266V19.995H19.2767C19.7075 19.995 20.0579 19.6446 20.0579 19.2138ZM22 11.2578H16.2298L18.3337 9.15398L17.2288 8.04914L13.242 12.0359L17.2257 16.0649L18.3368 14.9663L16.2149 12.8203H22V11.2578ZM3.99949 19.2138C3.99949 19.6446 4.34996 19.995 4.78074 19.995H9.77344V22H4.34375C3.05141 22 2 20.9486 2 19.6562V14.3828H3.99949V19.2138ZM4.34375 2C3.05141 2 2 3.05141 2 4.34375V9.69531H3.99949V4.77249C3.99949 4.34171 4.34996 3.99124 4.78074 3.99124H9.77344V2H4.34375ZM5.66633 9.15398L6.77117 8.04914L10.758 12.0359L6.7743 16.0649L5.6632 14.9663L7.78512 12.8203H2V11.2578H7.77016L5.66633 9.15398Z"
            />
          </svg>
        </button>
      </div>
      <div className="grid w-full grid-cols-3 gap-2 lg:gap-10">
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
        {protocols && (
          <StatsCard title="Protocoles" number={protocols.length} />
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
          {protocols && (
            <InsightCard
              title="Gérer les Protocoles"
              data={protocols.slice(0, 4)}
              link="protocols"
            />
          )}
        </div>
      </div>
    </main>
  );
}
