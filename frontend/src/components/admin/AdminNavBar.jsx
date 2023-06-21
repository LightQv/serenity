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
      <ul className="flex h-full w-full items-center justify-evenly lg:h-2/5 lg:flex-col">
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
            className="h-6 w-6"
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5V10.2C6.5 13.2376 8.96243 15.7 12 15.7C15.0376 15.7 17.5 13.2376 17.5 10.2V7.5ZM6.94257 15.8463C6.83726 15.8089 6.79237 15.7695 6.82249 15.7262C6.33308 15.2275 5.92625 14.6577 5.62217 14.0352C3.21131 15.1678 2 17.5534 2 21V22H21.9371L21.9862 21.0518C22.1458 17.9739 20.9108 15.6044 18.3557 14.0807C18.0445 14.7043 17.6299 15.2744 17.1336 15.7717C17.1287 15.8148 17.0865 15.8544 17.0101 15.891C15.7389 17.0996 13.9639 17.85 12 17.85C10.0123 17.85 8.21802 17.0813 6.94257 15.8463Z"
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
            className="h-6 w-6"
            viewBox="0 0 24 25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2ZM8 6H10C11.1046 6 12 6.89543 12 8V12C12 13.1046 11.1046 14 10 14H8C6.89543 14 6 13.1046 6 12V8C6 6.89543 6.89543 6 8 6ZM8 8H10V12H8V8ZM18 7C18 6.44772 17.5523 6 17 6H15L14.8834 6.00673C14.386 6.06449 14 6.48716 14 7C14 7.55228 14.4477 8 15 8H17L17.1166 7.99327C17.614 7.93551 18 7.51284 18 7ZM17 16C17.5523 16 18 16.4477 18 17C18 17.5128 17.614 17.9355 17.1166 17.9933L17 18H7C6.44772 18 6 17.5523 6 17C6 16.4872 6.38604 16.0645 6.88338 16.0067L7 16H17ZM18 11C18 10.4477 17.5523 10 17 10H15L14.8834 10.0067C14.386 10.0645 14 10.4872 14 11C14 11.5523 14.4477 12 15 12H17L17.1166 11.9933C17.614 11.9355 18 11.5128 18 11Z"
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
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7566 2H9.24339L9.2427 7.179L4.78213 4.59512L2 9.43024L6.43535 12L2 14.5698L4.78213 19.4049L9.2427 16.82L9.24339 22H14.7566L14.7563 16.82L19.2179 19.4049L22 14.5698L17.5637 12L22 9.43024L19.2179 4.59512L14.7563 7.179L14.7566 2Z"
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
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8282 1.50549C10.9753 1.56008 10.2181 2.0184 9.76719 2.70819L9.69 2.835L9.66667 2.835C8.99462 2.78836 8.27137 3.06032 7.74834 3.58335C7.36088 3.97081 7.1112 4.46815 7.02765 5H5.66667L5.52286 5.00612C4.66971 5.07903 4 5.79464 4 6.66667V20.3333L4.00612 20.4771C4.07903 21.3303 4.79464 22 5.66667 22H18.3333L18.4771 21.9939C19.3303 21.921 20 21.2054 20 20.3333V6.66667L19.9939 6.52286C19.921 5.66971 19.2054 5 18.3333 5H16.9685C16.8816 4.48359 16.6292 3.98436 16.2399 3.59508L16.0949 3.46067C15.6463 3.07555 15.0794 2.85477 14.4885 2.835L14.309 2.835L14.2328 2.70819C13.7519 1.97242 12.9223 1.5 12 1.5L11.8282 1.50549ZM8 11.5C8 10.9477 8.44772 10.5 9 10.5H15C15.5523 10.5 16 10.9477 16 11.5C16 12.0523 15.5523 12.5 15 12.5H9C8.44772 12.5 8 12.0523 8 11.5ZM9 14.5C8.44772 14.5 8 14.9477 8 15.5C8 16.0523 8.44772 16.5 9 16.5H11C11.5523 16.5 12 16.0523 12 15.5C12 14.9477 11.5523 14.5 11 14.5H9ZM13.1433 3.9345C13.0329 3.39076 12.5548 3 12 3C11.4452 3 10.9671 3.39076 10.8567 3.9345C10.8093 4.16754 10.6045 4.335 10.3667 4.335L9.50281 4.33329C9.24276 4.34804 8.99531 4.4577 8.809 4.64401C8.59164 4.86137 8.47862 5.16194 8.5 5.50167V6.001H15.499L15.5005 5.48038C15.5117 5.21662 15.4277 4.95917 15.2663 4.75384L15.1793 4.65574C14.9615 4.43794 14.6623 4.32144 14.3333 4.335H13.6333C13.3955 4.335 13.1907 4.16754 13.1433 3.9345Z"
            />
          </svg>
          <p className="hidden lg:block lg:text-sm">Mes opérations</p>
        </NavLink>
        <NavLink
          to="/admin/register"
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
              d="M18.6333 16.056C19.3329 16.056 19.9 16.605 19.9 17.2822V19.1214C19.9 19.7987 19.3329 20.3476 18.6333 20.3476H9.76667C9.06711 20.3476 8.5 19.7987 8.5 19.1214V17.2822C8.5 16.605 9.06711 16.056 9.76667 16.056H18.6333ZM5.125 16.056C6.2986 16.056 7.25 17.0167 7.25 18.2018C7.25 19.3869 6.2986 20.3476 5.125 20.3476C3.95139 20.3476 3 19.3869 3 18.2018C3 17.0167 3.95139 16.056 5.125 16.056ZM18.6333 10.0476C19.3329 10.0476 19.9 10.5966 19.9 11.2738V13.1131C19.9 13.7903 19.3329 14.3393 18.6333 14.3393H9.76667C9.06711 14.3393 8.5 13.7903 8.5 13.1131V11.2738C8.5 10.5966 9.06711 10.0476 9.76667 10.0476H18.6333ZM5.125 10.0476C6.2986 10.0476 7.25 11.0084 7.25 12.1935C7.25 13.3786 6.2986 14.3393 5.125 14.3393C3.95139 14.3393 3 13.3786 3 12.1935C3 11.0084 3.95139 10.0476 5.125 10.0476ZM5.125 4.03931C6.2986 4.03931 7.25 5.00003 7.25 6.18514C7.25 7.37025 6.2986 8.33097 5.125 8.33097C3.95139 8.33097 3 7.37025 3 6.18514C3 5.00003 3.95139 4.03931 5.125 4.03931ZM18.6333 4.03931C19.3329 4.03931 19.9 4.58829 19.9 5.2655V7.10478C19.9 7.78199 19.3329 8.33097 18.6333 8.33097H9.76667C9.06711 8.33097 8.5 7.78199 8.5 7.10478V5.2655C8.5 4.58829 9.06711 4.03931 9.76667 4.03931H18.6333Z"
            />
          </svg>
          <p className="hidden lg:block lg:text-sm">Mes protocoles</p>
        </NavLink>
      </ul>
      <div className="hidden lg:absolute lg:bottom-6 lg:left-0 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-2 lg:text-slate-900">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 25"
          fill="currentColor"
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
