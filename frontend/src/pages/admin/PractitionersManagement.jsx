import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await axios.get(`${backEndUrl}/api/practitioners`);
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
      const response = await axios.post(`${backEndUrl}/api/practitioners`, {
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
      const response = await axios.delete(
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
      const response = await axios.put(
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
    <div>
      <h1>Gestion des praticiens</h1>
      <div className="columns">
        {practitioners.map((practitioner) => (
          <div key={practitioner.id} className="column">
            <p>{practitioner.surname}</p>
            {practitioner.id && (
              <div>
                <button
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
          </div>
        ))}
      </div>
      {!showInput && (
        <button type="button" onClick={() => setShowInput(true)}>
          <span className="visually-hidden">Ajouter un praticien</span>
        </button>
      )}
      {showInput && (
        <div>
          <label htmlFor="surnameInput">Nom de famille:</label>
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
        <div className="modal">
          <div className="modal-content">
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
