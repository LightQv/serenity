import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIService from "../../services/APIService";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

function PractitionersList() {
  const [practitioners, setPractitioners] = useState([]);
  const [surname, setSurname] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [practitionerToDelete, setPractitionerToDelete] = useState(null);
  const [practitionerToEdit, setPractitionerToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(null);

  const fetchPractitioners = async () => {
    try {
      const response = await APIService.get(`/practitioners`);
      setPractitioners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleOptions = (practitionerId) => {
    setShowOptions((prevOptions) =>
      prevOptions === practitionerId ? null : practitionerId
    );
  };

  const addPractitioner = async () => {
    if (surname.trim() === "") {
      return;
    }
    try {
      const response = await APIService.post(`/practitioners`, {
        surname,
      });
      if (response.status === 201) {
        setSurname("");
        fetchPractitioners();
        setShowInput(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const confirmDelete = (practitioner) => {
    setPractitionerToDelete(practitioner);
  };

  const cancelDelete = () => {
    setPractitionerToDelete(null);
  };

  const deletePractitioner = async () => {
    if (!practitionerToDelete) {
      return;
    }

    try {
      const response = await APIService.delete(
        `${backEndUrl}/api/practitioners/${practitionerToDelete.id}`
      );
      if (response.status === 200) {
        toast.success("Practitioner deleted successfully !");
        setPractitioners((prevPractitioners) =>
          prevPractitioners.filter((p) => p.id !== practitionerToDelete.id)
        );
        setPractitionerToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editPractitioner = (practitioner) => {
    setPractitionerToEdit(practitioner);
    setShowEditForm(true);
  };

  const saveEditedPractitioner = async () => {
    if (!practitionerToEdit) {
      return;
    }
    try {
      const response = await APIService.put(
        `${backEndUrl}/api/practitioners/${practitionerToEdit.id}`,
        practitionerToEdit
      );
      if (response.status === 200) {
        fetchPractitioners();
        setPractitionerToEdit(null);
        setShowEditForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setPractitionerToEdit(null);
    setShowEditForm(false);
  };
  useEffect(() => {
    fetchPractitioners();
  }, []);
  return (
    <div className="conteneur min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <h1 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
        Gestion des praticiens
      </h1>
      <ul className="liste des praticiens w-1/2  rounded-xl bg-slate-100 shadow-xl">
        {practitioners.map((practitioner) => (
          <li
            key={practitioner.id}
            className="element-praticien m-2 flex items-center  justify-between  rounded-md  shadow"
          >
            <p className="nom">{practitioner.surname}</p>
            {practitioner.id && (
              <div className=" ">
                <button
                  className="bouton-options"
                  type="button"
                  onClick={() => toggleOptions(practitioner.id)}
                >
                  ...
                </button>
                {showOptions === practitioner.id && (
                  <div>
                    <button
                      type="button"
                      onClick={() => confirmDelete(practitioner)}
                    >
                      Supprimer
                    </button>
                    <button
                      type="button"
                      onClick={() => editPractitioner(practitioner)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!showInput && (
        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="button-wrapperbouton-ajouter-praticien my-4  flex h-fit w-fit items-center justify-center  rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
        >
          Ajouter un praticien
          <span className="bouton-ajouter-praticien " />
        </button>
      )}
      {showInput && (
        <div>
          <label htmlFor="bg " className="étiquette nom-de-famille bg-blue-600">
            Nom de famille:
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nom de famille"
          />
          <button type="button" onClick={addPractitioner}>
            Ajouter un praticien
          </button>
        </div>
      )}
      {practitionerToDelete && (
        <div className="modal-suppression">
          <div className="contenu-modal bg-yellow-400">
            <p>Are you sure you want to delete this practitioner ?</p>
            <div>
              <button type="button" onClick={deletePractitioner}>
                Yes
              </button>
              <button type="button" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditForm && practitionerToEdit && (
        <div className="edit-form">
          <h2>Edit</h2>
          <label htmlFor="editSurnameInput">Surname:</label>
          <input
            type="text"
            id="editSurnameInput"
            value={practitionerToEdit.surname}
            onChange={(e) => {
              setPractitionerToEdit({
                ...practitionerToEdit,
                surname: e.target.value,
              });
            }}
          />
          <button type="button" onClick={saveEditedPractitioner}>
            Save
          </button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
export default PractitionersList;
