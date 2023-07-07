import React from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Dashboard() {
  const { user, logout } = useUserContext();
  return (
    <main className="min-w-screen min-h-screen bg-slate-50 font-poppins lg:ml-60">
      <h1>
        {user.user_firstname} {user.user_lastname}
      </h1>
      <button
        type="button"
        className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-2 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0"
        onClick={() => logout()}
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
            d="M14.2266 2H19.6562C20.9486 2 22 3.05141 22 4.34375V9.69531H20.0579V4.77249C20.0579 4.34171 19.7075 3.99124 19.2767 3.99124H14.2266V2ZM20.0579 19.2138V14.3828H22V19.6562C22 20.9486 20.9486 22 19.6562 22H14.2266V19.995H19.2767C19.7075 19.995 20.0579 19.6446 20.0579 19.2138ZM22 11.2578H16.2298L18.3337 9.15398L17.2288 8.04914L13.242 12.0359L17.2257 16.0649L18.3368 14.9663L16.2149 12.8203H22V11.2578ZM3.99949 19.2138C3.99949 19.6446 4.34996 19.995 4.78074 19.995H9.77344V22H4.34375C3.05141 22 2 20.9486 2 19.6562V14.3828H3.99949V19.2138ZM4.34375 2C3.05141 2 2 3.05141 2 4.34375V9.69531H3.99949V4.77249C3.99949 4.34171 4.34996 3.99124 4.78074 3.99124H9.77344V2H4.34375ZM5.66633 9.15398L6.77117 8.04914L10.758 12.0359L6.7743 16.0649L5.6632 14.9663L7.78512 12.8203H2V11.2578H7.77016L5.66633 9.15398Z"
          />
        </svg>
      </button>
    </main>
  );
}
