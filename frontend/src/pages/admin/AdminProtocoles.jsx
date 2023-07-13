import { useEffect, useState } from "react";
import ProtocolDetails from "../../components/admin/protocols/ProtocolDetails";
import Modal from "../../components/admin/Modal";
import AddProtocol from "../../components/admin/protocols/AddProtocol";
import EditProtocol from "../../components/admin/protocols/EditProtocol";
import DeleteProtocol from "../../components/admin/protocols/DeleteProtocol";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";

export default function AdminProtocoles() {
  const [protocols, setProtocols] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedProtocol, setSelectedProtocol] = useState();

  useEffect(() => {
    APIService.get(`/protocols`)
      .then((res) => setProtocols(res.data))
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [isShow]);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-12 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des protocoles
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 lg:my-1 lg:mr-4 lg:mt-4 lg:self-end"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter un protocole
        </button>
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom du protocole</p>
          <p className="hidden lg:block lg:text-sm">Nombre de contenu(s)</p>
          <div className="flex items-center gap-2 lg:pr-3">
            <p className="text-sm lg:pr-7">Nom de l'opération</p>
            <p className="text-xs italic text-gray-500">Interactions</p>
          </div>
        </div>
        {protocols && protocols.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {protocols.map((protocol) => (
              <ProtocolDetails
                key={protocol.protocol_id}
                protocol={protocol}
                selectedProtocol={selectedProtocol}
                setSelectedProtocol={setSelectedProtocol}
                setIsShow={setIsShow}
              />
            ))}
          </ul>
        ) : (
          <p className="self-center text-xs">Aucun protocole disponible.</p>
        )}
      </div>
      <div
        className={
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "absolute left-0 top-0 z-20 flex min-h-screen min-w-full items-center justify-center overflow-auto bg-black/80 p-4"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal component={<AddProtocol />} setIsShow={setIsShow} />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditProtocol
                selectedProtocol={selectedProtocol}
                setSelectedProtocol={setSelectedProtocol}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeleteProtocol
                selectedProtocol={selectedProtocol}
                setSelectedProtocol={setSelectedProtocol}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div>
    </main>
  );
}
