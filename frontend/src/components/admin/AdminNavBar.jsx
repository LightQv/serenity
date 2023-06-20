import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import logo from "../../assets/logo-txt.png";

export default function NavBar() {
  const { user } = useUserContext();
  return (
    <nav className="absolute bottom-0 left-0 h-12 w-screen rounded-t-2xl bg-slate-50 shadow-2xl lg:h-screen lg:w-60 lg:rounded-none lg:border-r-2 lg:border-slate-100 lg:shadow-none">
      <img
        src={logo}
        alt="logo"
        className="hidden lg:mx-auto lg:mb-10 lg:mt-8 lg:block lg:h-16"
      />
      <ul className="flex h-full w-full items-center justify-evenly lg:h-2/6 lg:flex-col">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5889 4.65575C12.2697 4.31622 11.7303 4.31622 11.4111 4.65575L3.25438 13.7826C3.09056 13.9659 3 14.2032 3 14.449V21.0418C3 21.7585 3.576 22.3402 4.28571 22.3402H8.14286C8.85257 22.3402 9.42857 21.7585 9.42857 21.0418V15.8486C9.42857 15.1319 10.0046 14.5502 10.7143 14.5502H13.2857C13.9954 14.5502 14.5714 15.1319 14.5714 15.8486V21.0418C14.5714 21.7585 15.1474 22.3402 15.8571 22.3402H19.7143C20.424 22.3402 21 21.7585 21 21.0418V14.449C21 14.2032 20.9094 13.9659 20.7456 13.7826L12.5889 4.65575Z"
            />
          </svg>
          <p className="hidden lg:block lg:text-sm">Dashboard</p>
        </NavLink>
        <NavLink
          to="/admin/practitionners"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect opacity="0.01" width="24" height="24" fill="black" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5V10.2C6.5 13.2376 8.96243 15.7 12 15.7C15.0376 15.7 17.5 13.2376 17.5 10.2V7.5ZM6.94257 15.8463C6.83726 15.8089 6.79237 15.7695 6.82249 15.7262C6.33308 15.2275 5.92625 14.6577 5.62217 14.0352C3.21131 15.1678 2 17.5534 2 21V22H21.9371L21.9862 21.0518C22.1458 17.9739 20.9108 15.6044 18.3557 14.0807C18.0445 14.7043 17.6299 15.2744 17.1336 15.7717C17.1287 15.8148 17.0865 15.8544 17.0101 15.891C15.7389 17.0996 13.9639 17.85 12 17.85C10.0123 17.85 8.21802 17.0813 6.94257 15.8463Z"
              fill="#D6D9E0"
            />
          </svg>

          <p className="hidden lg:block lg:text-sm">Praticiens</p>
        </NavLink>
        <NavLink
          to="/admin/patients"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect opacity="0.01" width="24" height="24" fill="#D6D9E0" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2ZM8 6H10C11.1046 6 12 6.89543 12 8V12C12 13.1046 11.1046 14 10 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6ZM8 8H10V12H8V8ZM18 7C18 6.44772 17.5523 6 17 6H15L14.8834 6.00673C14.386 6.06449 14 6.48716 14 7C14 7.55228 14.4477 8 15 8H17L17.1166 7.99327C17.614 7.93551 18 7.51284 18 7ZM17 16C17.5523 16 18 16.4477 18 17C18 17.5128 17.614 17.9355 17.1166 17.9933L17 18H7C6.44772 18 6 17.5523 6 17C6 16.4872 6.38604 16.0645 6.88338 16.0067L7 16H17ZM18 11C18 10.4477 17.5523 10 17 10H15L14.8834 10.0067C14.386 10.0645 14 10.4872 14 11C14 11.5523 14.4477 12 15 12H17L17.1166 11.9933C17.614 11.9355 18 11.5128 18 11Z"
              fill="#D6D9E0"
            />
          </svg>

          <p className="hidden lg:block lg:text-sm">Patients</p>
        </NavLink>
        <NavLink
          to="/admin/surgeries"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7566 0H7.24339L7.2427 5.179L2.78213 2.59512L0 7.43024L4.43535 10L0 12.5698L2.78213 17.4049L7.2427 14.82L7.24339 20H12.7566L12.7563 14.82L17.2179 17.4049L20 12.5698L15.5637 10L20 7.43024L17.2179 2.59512L12.7563 5.179L12.7566 0Z"
              fill="#D6D9E0"
            />
          </svg>

          <p className="hidden lg:block lg:text-sm">Mes interventions</p>
        </NavLink>
        <NavLink
          to="/admin/operations"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.82821 0.505485C6.97534 0.560081 6.21808 1.0184 5.76719 1.70819L5.69 1.835L5.66667 1.835C4.99462 1.78836 4.27137 2.06032 3.74834 2.58335C3.36088 2.97081 3.1112 3.46815 3.02765 4H1.66667L1.52286 4.00612C0.669713 4.07903 0 4.79464 0 5.66667V19.3333L0.00611766 19.4771C0.0790293 20.3303 0.794638 21 1.66667 21H14.3333L14.4771 20.9939C15.3303 20.921 16 20.2054 16 19.3333V5.66667L15.9939 5.52286C15.921 4.66971 15.2054 4 14.3333 4H12.9685C12.8816 3.48359 12.6292 2.98436 12.2399 2.59508L12.0949 2.46067C11.6463 2.07555 11.0794 1.85477 10.4885 1.835L10.309 1.835L10.2328 1.70819C9.75186 0.972419 8.92233 0.5 8 0.5L7.82821 0.505485ZM4 10.5C4 9.94772 4.44772 9.5 5 9.5H11C11.5523 9.5 12 9.94772 12 10.5C12 11.0523 11.5523 11.5 11 11.5H5C4.44772 11.5 4 11.0523 4 10.5ZM5 13.5C4.44772 13.5 4 13.9477 4 14.5C4 15.0523 4.44772 15.5 5 15.5H7C7.55228 15.5 8 15.0523 8 14.5C8 13.9477 7.55228 13.5 7 13.5H5ZM9.14333 2.9345C9.03292 2.39076 8.55484 2 8 2C7.44516 2 6.96708 2.39076 6.85667 2.9345C6.80935 3.16754 6.60445 3.335 6.36667 3.335L5.50281 3.33329C5.24276 3.34804 4.99531 3.4577 4.809 3.64401C4.59164 3.86137 4.47862 4.16194 4.5 4.50167V5.001H11.499L11.5005 4.48038C11.5117 4.21662 11.4277 3.95917 11.2663 3.75384L11.1793 3.65574C10.9615 3.43794 10.6623 3.32144 10.3333 3.335H9.63333C9.39555 3.335 9.19065 3.16754 9.14333 2.9345Z"
              fill="#D6D9E0"
            />
          </svg>

          <p className="hidden lg:block lg:text-sm">Mes opérations</p>
        </NavLink>
        <NavLink
          to="/admin/protocols"
          className={({ isActive }) =>
            isActive
              ? "text-turquoise-dark-0 transition-all lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:rounded-lg lg:bg-violet-dark-0 lg:pl-4 lg:text-slate-100"
              : "text-gray-300 lg:flex lg:h-12 lg:w-52 lg:items-center lg:gap-2 lg:pl-4"
          }
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.6333 12.0557C16.3329 12.0557 16.9 12.6047 16.9 13.2819V15.1212C16.9 15.7984 16.3329 16.3474 15.6333 16.3474H6.76667C6.06711 16.3474 5.5 15.7984 5.5 15.1212V13.2819C5.5 12.6047 6.06711 12.0557 6.76667 12.0557H15.6333ZM2.125 12.0557C3.2986 12.0557 4.25 13.0164 4.25 14.2016C4.25 15.3867 3.2986 16.3474 2.125 16.3474C0.951395 16.3474 0 15.3867 0 14.2016C0 13.0164 0.951395 12.0557 2.125 12.0557ZM15.6333 6.04739C16.3329 6.04739 16.9 6.59638 16.9 7.27359V9.11287C16.9 9.79008 16.3329 10.3391 15.6333 10.3391H6.76667C6.06711 10.3391 5.5 9.79008 5.5 9.11287V7.27359C5.5 6.59638 6.06711 6.04739 6.76667 6.04739H15.6333ZM2.125 6.04739C3.2986 6.04739 4.25 7.00812 4.25 8.19323C4.25 9.37834 3.2986 10.3391 2.125 10.3391C0.951395 10.3391 0 9.37834 0 8.19323C0 7.00812 0.951395 6.04739 2.125 6.04739ZM2.125 0.0390625C3.2986 0.0390625 4.25 0.999785 4.25 2.1849C4.25 3.37001 3.2986 4.33073 2.125 4.33073C0.951395 4.33073 0 3.37001 0 2.1849C0 0.999785 0.951395 0.0390625 2.125 0.0390625ZM15.6333 0.0390625C16.3329 0.0390625 16.9 0.588047 16.9 1.26525V3.10454C16.9 3.78174 16.3329 4.33073 15.6333 4.33073H6.76667C6.06711 4.33073 5.5 3.78174 5.5 3.10454V1.26525C5.5 0.588047 6.06711 0.0390625 6.76667 0.0390625H15.6333Z"
              fill="#D6D9E0"
            />
          </svg>

          <p className="hidden lg:block lg:text-sm">Mes protocoles</p>
        </NavLink>
      </ul>
      <div className="hidden lg:absolute lg:bottom-6 lg:left-0 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-2 lg:text-slate-900">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5V10.2C6.5 13.2376 8.96243 15.7 12 15.7C15.0376 15.7 17.5 13.2376 17.5 10.2V7.5ZM6.94257 15.8463C6.83726 15.8089 6.79237 15.7695 6.82249 15.7262C6.33308 15.2275 5.92625 14.6577 5.62217 14.0352C3.21131 15.1678 2 17.5534 2 21V22H21.9371L21.9862 21.0518C22.1458 17.9739 20.9108 15.6044 18.3557 14.0807C18.0445 14.7043 17.6299 15.2744 17.1336 15.7717C17.1287 15.8148 17.0865 15.8544 17.0101 15.891C15.7389 17.0996 13.9639 17.85 12 17.85C10.0123 17.85 8.21802 17.0813 6.94257 15.8463Z"
          />
        </svg>

        <h3 className="text-sm font-semibold">
          {user.lastname} {user.firstname}
        </h3>
      </div>
    </nav>
  );
}
