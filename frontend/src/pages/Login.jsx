import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import logo from "../assets/logo.svg";
import practitioner from "../assets/images/welcome.jpg";
import { useUserContext } from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const { setUser, setToken } = useUserContext();
  const [userInfos, setUserInfos] = useState({ email: "", password: "" });
  // const [errorMsg, setErrorMsg] = useState({ email: "" });
  // const [errorPw, setErrorPw] = useState({ password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // console.log(errors);

  // console.log(userInfos);
  // console.log("pw", errorPw);

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Un email valide est requit")
      .required("Un email valide est requit"),
    password: Yup.string()
      .min(7, "Minimum 7 caractères")
      .max(30, "Maximum 30 caractères")
      .required("Mot de passe est requit"),
  });

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
          toast.error(
            `Erreur ${error.request.status} : Email et/ou Mot de passe invalide.`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "colored",
            }
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
      if (isValid) return;
      throw new Error();
    } catch (error) {
      error.inner.forEach((err) =>
        setErrors({ ...errors, [err.path]: err.message })
      );
      // console.log(error.inner);
    }
    // loginSchema
    //   .validate(userInfos, { abortEarly: false })
    //   .then(() => {})
    //   .catch((err) => {
    //     if (err.inner[0]?.path === "email") {
    //       setErrorMsg({ email: err.inner[0].message });
    //     } else setErrorMsg({ email: "" });
    //     if (err.inner[1]?.path === "password") {
    //       setErrorPw({
    //         password: err.inner[1].message,
    //       });
    //     } else if (err.inner[0]?.path === "password") {
    //       setErrorPw({
    //         password: err.inner[0].message,
    //       });
    //     } else setErrorPw({ password: "" });
    //   });
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
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="mb-2 text-base">
                Email
              </label>
              {/* {errorMsg.email !== "" ? (
                <p className="mb-2 text-xs text-red-500">{errorMsg.email}</p>
              ) : null} */}
              {errors.email !== "" ? (
                <p className="mb-2 text-xs text-red-500">{errors.email}</p>
              ) : null}
            </div>
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="mb-2 text-base">
                Mot de passe
              </label>
              {/* {errorPw.password !== "" ? (
                <p className="mb-2 text-xs text-red-500">{errorPw.password}</p>
              ) : null} */}
              {errors.password !== "" ? (
                <p className="mb-2 text-xs text-red-500">{errors.password}</p>
              ) : null}
            </div>
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
              disabled={loginSchema.isValid}
              type="submit"
              className="mb-2 h-fit w-36 rounded-lg border-2 border-turquoise-dark-0 bg-turquoise-dark-0 px-4 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-turquoise-light-0 hover:bg-turquoise-light-0 disabled:border-slate-300 disabled:bg-slate-300"
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
