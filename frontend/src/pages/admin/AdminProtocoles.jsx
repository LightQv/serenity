import { useEffect, useState } from "react";
import ProtocolsList from "../../components/admin/protocols/ProtocolsList";
import Modal from "../../components/admin/Modal";
import AddProtocol from "../../components/admin/protocols/AddProtocol";
import EditProtocol from "../../components/admin/protocols/EditProtocol";
import DeleteProtocol from "../../components/admin/protocols/DeleteProtocol";
import APIService from "../../services/APIService";

export default function AdminProtocoles() {
  const [protocols, setProtocols] = useState(null);
  const [isShow, setIsShow] = useState({
    modalA: false,
    modalB: false,
    modalC: false,
  });
  const [selectedProtocol, setSelectedProtocol] = useState();

  useEffect(() => {
    APIService.put(`/protocols`)
      .then((res) => setProtocols(res.data))
      .catch((error) => console.warn(error));
  }, [isShow]);

  if (!protocols) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des protocoles
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom du protocole</p>
          <p className="text-sm lg:pr-[7.5rem]">Nom de l'opération</p>
        </div>
        {protocols.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {protocols.map((protocol) => (
              <ProtocolsList
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
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalA: true })}
        >
          Ajouter un protocole
        </button>
      </div>
      <div
        className={
          isShow.modalA ||
          (isShow.modalB && selectedProtocol !== "") ||
          (isShow.modalC && selectedProtocol !== "")
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalA ? (
          <Modal component={<AddProtocol />} setIsShow={setIsShow} />
        ) : null}
        {isShow.modalB && selectedProtocol !== "" ? (
          <Modal
            component={
              <EditProtocol
                selectedProtocol={selectedProtocol}
                setSelectedProtocol={setSelectedProtocol}
              />
            }
            setIsShow={setIsShow}
          />
        ) : null}
        {isShow.modalC && selectedProtocol !== "" ? (
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
        ) : null}
      </div>
    </main>
  );
}
