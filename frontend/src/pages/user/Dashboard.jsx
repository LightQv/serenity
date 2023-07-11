import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useInterventionContext } from "../../contexts/InterventionContext";
import LogoutSvg from "../../components/svg/LogoutSvg";
import ProtocolCard from "../../components/user/dashboard/ProtocolCard";
import countdown from "../../services/utils";

export default function Dashboard() {
  const { user, logout } = useUserContext();
  const { protocols } = useInterventionContext();

  return (
    <main className="min-w-screen relative mb-6 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold lg:text-xl">
            Bonjour, {user.user_firstname}
          </h3>
          <h3 className="text-2xl font-semibold lg:text-4xl">
            Comment allez-vous ?
          </h3>
        </div>
        <div className="ml-auto mr-6 hidden flex-row items-center gap-2 lg:flex">
          <div className="flex flex-col items-end">
            <p className="line-clamp-1 text-base font-semibold text-violet-dark-0">
              {user.operation_name}
            </p>
            <p className="text-xs italic">
              Par {user.practitioner_surname}, le{" "}
              <span className="font-semibold">
                {new Date(user.intervention_date).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-red-100">
            <p className="text-xs italic opacity-60">Jours</p>
            <p className="text-base font-semibold">
              {countdown(user.intervention_date)}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-red-500 hover:bg-red-500 lg:p-2"
          onClick={() => logout()}
        >
          <LogoutSvg />
        </button>
      </div>
      <div className="mb-4 flex flex-row-reverse items-center justify-end gap-2 lg:hidden">
        <div>
          <p className="line-clamp-1 text-base font-semibold text-violet-dark-0">
            {user.operation_name}
          </p>
          <p className="text-xs italic">
            Par {user.practitioner_surname}, le{" "}
            <span className="font-semibold">
              {new Date(user.intervention_date).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-red-100">
          <p className="text-xs italic opacity-60">Jours</p>
          <p className="text-base font-semibold">
            {countdown(user.intervention_date)}
          </p>
        </div>
      </div>
      <ul className="my-2 flex flex-col items-center justify-between gap-4">
        {protocols &&
          protocols.map((protocol) => (
            <ProtocolCard key={protocol.protocol_id} data={protocol} />
          ))}
        <li className="items-left flex h-36 w-1/2 justify-between self-start rounded-lg bg-violet-dark-0 text-slate-100 hover:opacity-80 lg:h-24">
          <NavLink
            to="/contact"
            className="items-left flex h-full w-full flex-col justify-center p-4 lg:p-12"
          >
            <h3 className="text-sm font-semibold lg:text-lg">Une question ?</h3>
            <p className="text-sm font-normal lg:text-base">
              Demandez à être recontacté.
            </p>
          </NavLink>
        </li>
      </ul>
    </main>
  );
}
