import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useInterventionContext } from "../../contexts/InterventionContext";
import logo from "../../assets/logo-txt.png";
import DashboardSvg from "../svg/DashboardSvg";
import InterventionSvg from "../svg/InterventionSvg";
import OperationSvg from "../svg/OperationSvg";
import ProtocolSvg from "../svg/ProtocolSvg";
import ContactSvg from "../svg/ContactSvg";
import ProfileSvg from "../svg/ProfileSvg";

export default function NavBar() {
  const { user } = useUserContext();
  const { protocols } = useInterventionContext();

  const getIcon = [<InterventionSvg />, <OperationSvg />, <ProtocolSvg />];

  return (
    <nav className="fixed bottom-0 left-0 z-10 h-12 w-screen rounded-t-2xl bg-slate-50 shadow-2xl lg:h-screen lg:w-60 lg:rounded-none lg:border-r-2 lg:border-slate-100 lg:shadow-none">
      <img
        src={logo}
        alt="logo"
        className="hidden lg:mx-auto lg:mb-8 lg:mt-8 lg:block lg:h-16"
      />
      <ul className="flex h-full w-full items-center justify-evenly lg:h-2/6 lg:flex-col lg:justify-center lg:gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <DashboardSvg />
          <p className="hidden lg:block lg:text-sm">Dashboard</p>
        </NavLink>
        {protocols &&
          protocols.map((protocol, index) => (
            <NavLink
              key={protocol.protocol_id}
              to={`/protocols/${protocol.protocol_id}`}
              className={({ isActive }) =>
                isActive
                  ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
                  : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
              }
            >
              {getIcon[index]}
              <p className="hidden lg:block lg:text-sm">
                {protocol.protocol_name}
              </p>
            </NavLink>
          ))}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 transition-all hover:text-violet-dark-0 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <ContactSvg />
          <p className="hidden lg:block lg:text-sm">Contact</p>
        </NavLink>
      </ul>
      <div className="hidden lg:absolute lg:bottom-6 lg:left-0 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-2 lg:text-slate-900">
        <ProfileSvg />
        <h3 className="text-sm font-semibold">
          {user.user_lastname} {user.user_firstname}
        </h3>
      </div>
    </nav>
  );
}
