import React, { useState } from "react";
import PropTypes from "prop-types";

function AddPractitioner({ addPractitioner }) {
  const [surname, setSurname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (surname.trim() !== "") {
      addPractitioner(surname);
      setSurname("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
      />
      <button type="submit">Add Practitioner</button>
    </form>
  );
}

AddPractitioner.propTypes = {
  addPractitioner: PropTypes.func.isRequired,
};

export default AddPractitioner;
