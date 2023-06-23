import React from "react";
import PropTypes from "prop-types";

function DeletePractitioner({ practitioner, deletePractitioner }) {
  return (
    <div>
      <p>Are you sure you want to delete this practitioner?</p>
      <button type="button" onClick={() => deletePractitioner(practitioner.id)}>
        Yes
      </button>
      <button type="button">No</button>
    </div>
  );
}

DeletePractitioner.propTypes = {
  practitioner: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  deletePractitioner: PropTypes.func.isRequired,
};

export default DeletePractitioner;
