import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminOperation() {
  const [operations, setOperations] = useState([]);
  const [operationName, setOperationName] = useState({ operation_name: "" });
  const [showInput, setShowInput] = useState(false);
  const [operationToDelete, setOperationToDelete] = useState(null);
  const [operationToEdit, setOperationToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchOperations = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/operations`);
      setOperations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addOperation = async () => {
    if (operationName.trim() === "") {
      return;
    }
    try {
      const response = await axios.post(`${backEndUrl}/api/operations`, {
        operationName,
      });
      if (response.status === 201) {
        setOperationName("");
        fetchOperations();
        setShowInput(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const confirmDelete = (operation) => {
    setOperationToDelete(operation);
  };

  const cancelDelete = () => {
    setOperationToDelete(null);
  };

  const deleteOperation = async () => {
    if (!operationToDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${backEndUrl}/api/operations/${operationToDelete.id}`
      );
      if (response.status === 200) {
        toast.success("Operation deleted successfully !");
        fetchOperations();
        setOperationToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editOperation = (operation) => {
    setOperationToEdit(operation);
    setShowEditForm(true);
  };

  const saveEditedOperation = async () => {
    if (!operationToEdit) {
      return;
    }
    try {
      const response = await axios.put(
        `${backEndUrl}/api/operations/${operationToEdit.id}`,
        operationToEdit
      );
      if (response.status === 200) {
        fetchOperations();
        setShowEditForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setOperationToEdit(null);
    setShowEditForm(false);
  };
  useEffect(() => {
    fetchOperations();
  }, []);

  return (
    <main className="min-w-screen min-h-screen bg-slate-50 font-poppins lg:ml-60">
      <h1 className="absolue h-72 text-[30px] font-semibold leading-[72px]">
        Gestion des opérations
      </h1>
      <div className="flex">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z"
            fill="black"
          />
        </svg>

        <input
          type="operation_name"
          name="operation_name"
          id="operation_name"
          placeholder="Search"
          required=""
          className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
        />
      </div>
      <div>
        <div className="columns">
          {operations.map((operation) => (
            <div key={operation.id} className="column">
              <p>{operation.operation_name}</p>
              {operation.id && (
                <div>
                  <button
                    type="button"
                    onClick={() => confirmDelete(operation)}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    onClick={() => editOperation(operation)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {!showInput && (
          <button type="button" onClick={() => setShowInput(true)}>
            <span className="visually-hidden">Ajouter un operation</span>
          </button>
        )}
        {showInput && (
          <div>
            <label htmlFor="operation_nameInput">Nom de l'opération:</label>
            <input
              type="text"
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
              placeholder="Nom de l'opération"
            />
            <button
              className="ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
              type="button"
              onClick={addOperation}
            >
              Ajouter une opération
            </button>
          </div>
        )}
        {operationToDelete && (
          <div className="modal">
            <div className="modal-content">
              <p>Êtes-vous sûr de vouloir effacer cette opération ?</p>
              <div>
                <button type="button" onClick={deleteOperation}>
                  Oui
                </button>
                <button type="button" onClick={cancelDelete}>
                  Non
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditForm && operationToEdit && (
          <div className="edit-form">
            <h2>Edit</h2>
            <label htmlFor="editOperationNameInput">Nom de l'opération:</label>
            <input
              type="text"
              id="editOperationNameInput"
              value={operationToEdit.operation_name}
              onChange={(e) => {
                setOperationToEdit({
                  ...operationToEdit,
                  operation_name: e.target.value,
                });
              }}
            />
            <button type="button" onClick={saveEditedOperation}>
              Save
            </button>
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
