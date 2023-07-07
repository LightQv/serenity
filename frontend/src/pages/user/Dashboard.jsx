import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import LogoutSvg from "../../components/svg/LogoutSvg";

export default function Dashboard() {
  const { user, logout } = useUserContext();
  return (
    <main className="min-w-screen relative mb-12 flex min-h-screen flex-col  bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-0 mt-2 flex h-fit w-full items-center justify-between lg:mb-0">
        <h3 className="text-lg font-semibold lg:text-xl">
          Bonjour, {user.firstname}
        </h3>
        <div className="ml-auto flex h-fit w-fit">
          <div className="hidden flex-col items-start justify-center text-left lg:mr-0 lg:flex ">
            <p className="text-base font-semibold">Ma chirurgie</p>
            <p className="text-xs opacity-40 ">Mercredi 5 Juillet</p>
          </div>
          <button
            type="button"
            className="ml-4 h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-2 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0"
            onClick={() => logout()}
          >
            <LogoutSvg />
          </button>
        </div>
      </div>
      <div className=" flex h-fit w-fit flex-col justify-center">
        <h1 className="mb-4 text-2xl font-semibold lg:mb-6 lg:text-4xl">
          Comment allez-vous ?
        </h1>
      </div>
      <div className="flex flex-col items-start justify-center lg:hidden ">
        <div className=" text-left lg:mr-0">
          <p className="text-base font-semibold">Ma chirurgie</p>
          <p className="text-xs opacity-40 ">Mercredi 5 Juillet</p>
        </div>
      </div>
      <div className=" my-4 flex flex-col justify-center ">
        <button type="button">
          <p className="my-2 flex h-12 cursor-pointer items-center rounded-lg bg-yellow-400 pl-6 text-white shadow-lg hover:bg-yellow-500">
            Comprendre mon opération
          </p>
        </button>

        <button type="button">
          <p className="my-2 flex h-12 cursor-pointer items-center rounded-lg bg-teal-400 pl-6 text-white shadow-lg  hover:bg-teal-500">
            Finir les démarches administratives
          </p>
        </button>

        <button type="button">
          <p className="my-2 flex h-12 cursor-pointer items-center rounded-lg bg-pink-500 pl-6 text-white shadow-lg  hover:bg-pink-600">
            Ma check-list avant mon départ à la Clinique
          </p>
        </button>
      </div>
    </main>
  );
}
