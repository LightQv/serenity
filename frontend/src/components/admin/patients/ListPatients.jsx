import React from "react";
import PropTypes from "prop-types";

export default function ListPatients({ listPatient }) {
  return (
    <div className="mx-8 my-8">
      <h2 className="text-lg font-extrabold ">
        {listPatient.firstname} {listPatient.lastname}
      </h2>
      <h3 className="text_mg font-medium">{listPatient.email}</h3>
    </div>
  );
}

ListPatients.propTypes = {
  listPatient: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
