import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "../../contexts/UserContext";
import countdown from "../../services/utils";

export default function Contact() {
  const { user } = useUserContext();
  const [socket, setSocket] = useState(null);
  const [socketUser, setSocketUser] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const [contactSteps, setContactSteps] = useState(false);

  // Send Message
  const handleClick = () => {
    socket.emit("sendMessage", {
      author_id: user.user_id,
      author_firstname: user.user_firstname,
      author_lastname: user.user_lastname,
      message: `${user.user_firstname} ${user.user_lastname} souhaite être recontacté.`,
      socket_user_id: socketUser,
    });
    setIsSend(true);
  };

  useEffect(() => {
    // To do : Server creation
    const soc = io(import.meta.env.VITE_SERVER_URL);
    setSocket(soc);

    if (socket) {
      soc.on("connect", () => {
        setSocketUser(socket.id);
      });
    }
  }, []);

  return (
    <main className="min-w-screen relative mb-6 flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:mb-0 lg:py-16 lg:pl-72 lg:pr-12">
      <div className="mb-4 mt-2 flex h-fit w-full items-center justify-between lg:mb-8">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold lg:text-xl">
            Bonjour, {user.user_firstname}
          </h3>
          <h3 className="text-2xl font-semibold lg:text-4xl">
            Comment allez-vous ?
          </h3>
        </div>
        <div className="ml-auto mr-6 hidden flex-row items-center gap-2 lg:flex">
          <div className="flex flex-col items-end">
            <p className="line-clamp-1 text-base font-semibold text-violet-dark-0">
              {user.operation_name}
            </p>
            <p className="text-xs italic">
              Par {user.practitioner_surname}, le{" "}
              <span className="font-semibold">
                {new Date(user.intervention_date).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-red-100">
            <p className="text-xs italic opacity-60">Jours</p>
            <p className="text-base font-semibold">
              {countdown(user.intervention_date)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center justify-end gap-2 lg:hidden">
        <div>
          <p className="line-clamp-1 text-base font-semibold text-violet-dark-0">
            {user.operation_name}
          </p>
          <p className="text-xs italic">
            Par {user.practitioner_surname}, le{" "}
            <span className="font-semibold">
              {new Date(user.intervention_date).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-red-100">
          <p className="text-xs italic opacity-60">Jours</p>
          <p className="text-base font-semibold">
            {countdown(user.intervention_date)}
          </p>
        </div>
      </div>
      <div className="m-auto lg:w-2/4">
        <button
          type="button"
          disabled={isSend}
          onClick={() => setContactSteps(true)}
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-2xl transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-gray-300 disabled:bg-gray-300 lg:w-full lg:px-10 lg:py-6"
        >
          Cliquez-ici pour être recontacté par notre équipe.
        </button>
        {contactSteps && (
          <div className="flex flex-col items-center">
            <h3 className={isSend ? "text-gray-500" : "font-semibold"}>
              Êtes-vour sûr(e) ?
            </h3>
            <div className="grid w-full grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isSend}
                onClick={() => setContactSteps(false)}
                className="my-4 h-fit w-full self-center rounded-lg border-2 border-violet-dark-0 bg-slate-100 px-6 py-3 text-sm text-violet-dark-0 shadow-2xl transition-all hover:border-violet-light-0 hover:text-violet-light-0 disabled:border-gray-300 disabled:text-gray-300 lg:px-10 lg:py-6"
              >
                Non
              </button>
              <button
                onClick={handleClick}
                disabled={isSend}
                type="button"
                className="my-4 h-fit w-full self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-2xl transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-gray-300 disabled:bg-gray-300 lg:px-10 lg:py-6"
              >
                Oui
              </button>
            </div>
          </div>
        )}
        {isSend && (
          <>
            <p className="my-4 h-fit w-full self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-center text-sm text-slate-100 shadow-2xl transition-all lg:px-10 lg:py-6">
              Votre demande a bien été prise en compte, notre équipe vous
              recontactera sous peu.
            </p>
            <p className="h-fit w-full text-center text-xs text-violet-dark-0">
              En cas d'urgence, merci de contacter le secrétariat directement
              par téléphone.
            </p>
          </>
        )}
      </div>
      <div className="h-12 lg:hidden" />
    </main>
  );
}
