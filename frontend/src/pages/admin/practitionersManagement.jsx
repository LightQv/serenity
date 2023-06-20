import React, { useEffect, useState } from "react";
import axios from "axios";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

function PractitionersList() {
  const [practitioners, setPractitioners] = useState([]);
  const [surname, setSurname] = useState("");
  const [showInput, setShowInput] = useState(false);

  const fetchPractitioners = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/practitioners`);
      setPractitioners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPractitioner = async () => {
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
    </div>
  );
}

export default PractitionersList;
