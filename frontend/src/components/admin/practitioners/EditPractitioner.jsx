import React, { useState } from "react";
import PropTypes from "prop-types";

function EditPractitioner({ practitioner, saveEditedPractitioner }) {
  const [surname, setSurname] = useState(practitioner.surname);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedPractitioner(practitioner.id, surname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
      />
      <button type="button">Save</button>
      <button type="button">Cancel</button>
    </form>
  );
}

EditPractitioner.propTypes = {
  practitioner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
  saveEditedPractitioner: PropTypes.func.isRequired,
};

export default EditPractitioner;
