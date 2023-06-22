import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logo from "../assets/logo.svg";
import practitioner from "../assets/images/welcome.jpg";
import { useUserContext } from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "../services/validators";
import { notifyError } from "../services/ToastNotificationService";
import FormError from "../components/FormError";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const { setUser, setToken } = useUserContext();
  const [userInfos, setUserInfos] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginSchema.isValid)
      try {
        const res = await axios.post(`${BACKEND_URL}/api/login`, userInfos);
        if (res) {
          setUser(res.data.user);
          setToken(res.data.token);
          if (res.data.user.roles === "admin") {
            navigate("/admin/dashboard");
          } else navigate("/dashboard");
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          notifyError(
            `${error.request.status} : Email et/ou Mot de passe invalide.`
          );
        }
      }
  };

  const handleChange = async (e) => {
    setUserInfos({
      ...userInfos,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await loginSchema.validate(userInfos, {
        abortEarly: false,
      });
      if (isValid) {
        setErrors(null);
      }
      throw new Error();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <main className="relative z-10 flex h-screen w-screen flex-col justify-center bg-gradient-to-bl from-turquoise-light-0 to-turquoise-dark-0 font-poppins lg:flex-row-reverse">
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
          {errors && <FormError errors={errors} />}
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
              type="submit"
              className="mb-2 h-fit w-fit rounded-lg border-2 border-turquoise-dark-0 bg-turquoise-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-turquoise-light-0 hover:bg-turquoise-light-0 disabled:border-slate-300 disabled:bg-slate-300"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
      <ToastContainer limit={1} />
    </main>
  );
}
