import axios from "axios";
import { useState } from "react";
import logo from "../assets/logo.svg";
import practitioner from "../assets/images/welcome.jpg";
import { useUserContext } from "../contexts/UserContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const { user, setUser, token, setToken } = useUserContext();
  const [userInfos, setUserInfos] = useState({ email: "", password: "" });
  console.log(userInfos);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BACKEND_URL}/login`, userInfos).then((res) => {});
  };

  const handleChange = (e) => {
    setUserInfos({
      ...userInfos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="flex h-screen w-screen flex-col justify-center bg-gradient-to-bl from-turquoise-light-0 to-turquoise-dark-0 font-poppins lg:flex-row-reverse">
      <img
        src={practitioner}
        alt="practitioner"
        className="hidden h-2/3 w-full rounded-bl-[4rem] object-cover shadow-2xl lg:block lg:h-screen lg:w-2/5"
      />
      <div className="flex h-1/3 flex-col items-center justify-center gap-4 lg:h-screen lg:w-3/5">
        <img src={logo} alt="logo" className="h-40 lg:h-56" />
        <h1 className="-mt-6 mb-1 text-lg text-slate-100 lg:mb-4 lg:w-6/12 lg:text-center lg:text-xl">
          Connectez-vous à votre compte.
        </h1>
        <form
          action="login"
          className="space-y-4 rounded-lg bg-slate-100 p-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="adresse@mail.com"
              required=""
              className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-base">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required=""
              className="mb-2 rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="mb-2 h-fit w-36 rounded-lg border-2 border-turquoise-dark-0 bg-turquoise-dark-0 px-4 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-turquoise-light-0 hover:bg-turquoise-light-0"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
