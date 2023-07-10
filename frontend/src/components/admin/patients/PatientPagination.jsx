import React from "react";
import PropTypes from "prop-types";

function PatientPagination({
  patientsPerPage,
  totalPatients,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];

  // Calcul du nombre de pages
  for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  // fonction pour aller à la page précédente
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // fonction pour aller à la page suivante
  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <ul className="mt-3 flex justify-center">
      <li>
        <button
          type="button"
          onClick={goToPreviousPage}
          className="mx-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-slate-300 text-base font-semibold text-violet-dark-0 shadow-lg"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            type="button"
            onClick={() => paginate(number)}
            className={`mx-1.5 flex h-6 w-6 items-center justify-center rounded-md ${
              currentPage === number ? "bg-violet-dark-0 text-white" : ""
            } bg-slate-300 text-base font-semibold text-violet-dark-0 shadow-lg`}
          >
            {number}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={goToNextPage}
          className="mx-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-slate-300 text-base font-semibold text-violet-dark-0 shadow-lg"
          disabled={currentPage === pageNumbers.length}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
}

PatientPagination.propTypes = {
  patientsPerPage: PropTypes.number.isRequired,
  totalPatients: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default PatientPagination;
