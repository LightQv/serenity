import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import logo from "../../assets/logo-txt.png";
import DashboardSvg from "../svg/DashboardSvg";
import PractitionerSvg from "../svg/PractitionerSvg";
import PatientSvg from "../svg/PatientSvg";
import InterventionSvg from "../svg/InterventionSvg";
import OperationSvg from "../svg/OperationSvg";
import ProtocolSvg from "../svg/ProtocolSvg";
import ProfileSvg from "../svg/ProfileSvg";

export default function AdminNavBar() {
  const { user } = useUserContext();
  return (
    <nav className="fixed bottom-0 left-0 z-10 h-12 w-screen rounded-t-2xl bg-slate-50 shadow-2xl lg:h-screen lg:w-60 lg:rounded-none lg:border-r-2 lg:border-slate-100 lg:shadow-none">
      <img
        src={logo}
        alt="logo"
        className="hidden lg:mx-auto lg:mb-10 lg:mt-8 lg:block lg:h-16"
      />
      <ul className="flex h-full w-full items-center justify-evenly lg:h-2/5 lg:flex-col">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <DashboardSvg />
          <p className="hidden lg:block lg:text-sm">Dashboard</p>
        </NavLink>
        <NavLink
          to="/admin/practitioners"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <PractitionerSvg />
          <p className="hidden lg:block lg:text-sm">Praticiens</p>
        </NavLink>
        <NavLink
          to="/admin/patients"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <PatientSvg />
          <p className="hidden lg:block lg:text-sm">Patients</p>
        </NavLink>
        <NavLink
          to="/admin/interventions"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <InterventionSvg />
          <p className="hidden lg:block lg:text-sm">Mes interventions</p>
        </NavLink>
        <NavLink
          to="/admin/operations"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <OperationSvg />
          <p className="hidden lg:block lg:text-sm">Mes opérations</p>
        </NavLink>
        <NavLink
          to="/admin/protocols"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <ProtocolSvg />
          <p className="hidden lg:block lg:text-sm">Mes protocoles</p>
        </NavLink>
      </ul>
      <div className="hidden lg:absolute lg:bottom-6 lg:left-0 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-2 lg:text-slate-900">
        <ProfileSvg />
        <h3 className="text-sm font-semibold">
          {user.lastname} {user.firstname}
        </h3>
      </div>
    </nav>
  );
}
