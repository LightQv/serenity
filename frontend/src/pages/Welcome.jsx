import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import practitioner from "../assets/images/welcome.jpg";

export default function Login() {
  return (
    <main className="flex h-screen w-screen flex-col bg-gradient-to-bl from-turquoise-light-0 to-turquoise-dark-0 font-poppins lg:flex-row-reverse">
      <img
        src={practitioner}
        alt="practitioner"
        className="h-2/3 w-full rounded-bl-[4rem] object-cover shadow-2xl lg:h-screen lg:w-2/5"
      />
      <div className="flex h-1/3 flex-col items-center justify-center gap-4 lg:h-screen lg:w-3/5 lg:flex-col">
        <img src={logo} alt="logo" className="hidden lg:block lg:h-56" />
        <h1 className="-mt-6 text-center text-slate-100 lg:mb-4 lg:block lg:w-6/12 lg:text-2xl">
          Avec Serenity, préparez votre opération sereinement.
        </h1>
        <Link to="/login">
          <button
            type="button"
            className="h-fit w-36 rounded-lg border-2 border-slate-100 bg-slate-100 px-4 py-3 text-sm text-turquoise-dark-0 shadow-lg transition-all hover:border-slate-200 hover:bg-slate-200"
          >
            Connexion
          </button>
        </Link>
      </div>
    </main>
  );
}
