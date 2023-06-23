import React, { useState } from "react";
import { PropTypes } from "prop-types";
import DeletePractitioner from "./DeletePractitioner";

function PractitionersList({ practitioners, deletePractitioner }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [practitionerToDelete, setPractitionerToDelete] = useState(null);

  const handleDeleteConfirmation = (practitioner) => {
    setPractitionerToDelete(practitioner);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setPractitionerToDelete(null);
    setShowDeleteConfirmation(false);
  };
  const handleDeleteConfirm = (practitionerId) => {
    deletePractitioner(practitionerId);
    setShowDeleteConfirmation(false);
  };
  return (
    <ul>
      {practitioners.map((practitioner) => (
        <li key={practitioner.id}>
          {practitioner.surname}
          <button
            type="button"
            onClick={() => handleDeleteConfirmation(practitioner)}
          >
            ...
          </button>
          {showDeleteConfirmation && practitionerToDelete === practitioner && (
            <DeletePractitioner
              practitioner={practitioner}
              deletePractitioner={handleDeleteConfirm}
              cancelDelete={handleDeleteCancel}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

PractitionersList.propTypes = {
  practitioners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
    })
  ).isRequired,
  deletePractitioner: PropTypes.func.isRequired,
};

export default PractitionersList;
