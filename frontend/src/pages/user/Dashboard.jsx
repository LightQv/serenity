import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import LogoutSvg from "../../components/svg/LogoutSvg";
import ProtocolCard from "../../components/user/dashboard/ProtocolCard";
import APIService from "../../services/APIService";

export default function Dashboard() {
  const { user, logout } = useUserContext();
  const [protocols, setProtocols] = useState();

  useEffect(() => {
    APIService.get(`/operations/${user.operation_id}`)
      .then((res) => setProtocols(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!protocols) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold lg:text-xl">
            Bonjour, {user.user_firstname}
          </h3>
          <h3 className="text-2xl font-semibold lg:text-4xl">
            Comment allez-vous ?
          </h3>
        </div>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-red-500 hover:bg-red-500 lg:p-2"
          onClick={() => logout()}
        >
          <LogoutSvg />
        </button>
      </div>
      <div className="mb-4 flex-col items-start justify-center">
        <p className="text-base font-semibold">{user.operation_name}</p>
        <p className="text-xs opacity-40 ">
          Par {user.practitioner_surname}, le{" "}
          {new Date(user.intervention_date).toLocaleDateString()}
        </p>
      </div>
      <ul className="my-2 flex flex-col items-center justify-between gap-4">
        {protocols.map((protocol) => (
          <ProtocolCard data={protocol} />
        ))}
        <li className="flex h-20 w-full items-center justify-between rounded-lg bg-violet-dark-0 text-slate-100 hover:opacity-80 lg:h-24">
          <NavLink
            to="/contact"
            className="items-left flex h-full w-full flex-col justify-center p-4 lg:p-8"
          >
            <h3 className="line-clamp-1 text-sm font-semibold lg:text-lg">
              Une question ?
            </h3>
            <p className="line-clamp-1 text-sm font-normal lg:text-base">
              Demandez à être recontacté.
            </p>
          </NavLink>
        </li>
      </ul>
    </main>
  );
}
