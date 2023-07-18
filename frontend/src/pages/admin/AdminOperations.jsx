import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OperationDetails from "../../components/admin/operations/OperationDetails";
import Modal from "../../components/admin/Modal";
import AddOperation from "../../components/admin/operations/AddOperation";
import EditOperation from "../../components/admin/operations/EditOperation";
import DeleteOperation from "../../components/admin/operations/DeleteOperation";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import Pagination from "../../components/admin/Pagination";

export default function AdminOperations() {
  const [operations, setOperations] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedOperation, setSelectedOperation] = useState();
  const limitPerPage = 5;
  const defaultPage = 1;
  const [maxPage, setMaxPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || defaultPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearchParams((params) => {
      searchParams.set("page", currentPage);
      if (currentPage === 1) {
        return undefined;
      }
      return params;
    });

    APIService.get(`/operations-list?page=${currentPage}`)
      .then((res) => {
        setOperations(res.data.datas);
        setMaxPage(Math.ceil(res.data.total / limitPerPage));
      })
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [currentPage, isShow]);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-12 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des operations
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 lg:my-1 lg:mr-4 lg:mt-4 lg:self-end"
          onClick={() => setIsShow({ modalAdd: true })}
        >
          Ajouter une opération
        </button>
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm lg:pr-[7.5rem]">Nom de l'opération</p>
          <div className="flex items-center gap-2 lg:pr-3">
            <p className="text-xs italic text-gray-500">Interactions</p>
          </div>
        </div>
        {operations && operations.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {operations.map((operation) => (
              <OperationDetails
                key={operation.operation_id}
                operation={operation}
                selectedOperation={selectedOperation}
                setSelectedOperation={setSelectedOperation}
                setIsShow={setIsShow}
                protocols={operations
                  .filter((op) => op.operation_id === operation.operation_id)
                  .map((op) => ({
                    protocol_id: op.protocol_id,
                    protocol_name: op.protocol_name,
                  }))}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-2 self-center text-xs lg:mb-4 lg:mt-8 lg:text-base">
            Aucun opération disponible.
          </p>
        )}
        {operations && operations.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            maxPage={maxPage}
          />
        )}
      </div>
      <div
        className={
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal
            component={<AddOperation setIsShow={setIsShow} />}
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditOperation
                selectedOperation={selectedOperation}
                setSelectedOperation={setSelectedOperation}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeleteOperation
                selectedOperation={selectedOperation}
                setSelectedOperation={setSelectedOperation}
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
