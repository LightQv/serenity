import React, { useEffect, useState } from "react";
import axios from "axios";
import OperationsList from "../../components/admin/operations/OperationsList";
import Modal from "../../components/admin/Modal";
import AddOperation from "../../components/admin/operations/AddOperation";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminOpearions() {
  const [operations, setOperations] = useState(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/operations`)
      .then((res) => setOperations(res.data))
      .catch((error) => console.warn(error));
  }, [isShow]);

  if (!operations) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
        Gestion des opérations
      </h3>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom de l'opération</p>
        </div>
        {operations.length !== 0 ? (
          operations.map((operation) => (
            <ul className="grid w-full grid-cols-1">
              <OperationsList operation={operation} key={operation.operation_id} />
            </ul>
          ))
        ) : (
          <p className="self-center text-xs">Aucune opération disponible.</p>
        )}
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow(true)}
        >
          Ajouter une opération
        </button>
      </div>
      <div
        className={
          isShow
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        <Modal component={<AddOperation />} setIsShow={setIsShow} />
      </div>
    </main>
  );
}
