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
    <ul className="flex justify-between gap-4">
      <li>
        <button
          type="button"
          onClick={goToPreviousPage}
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-300 p-2 text-sm font-semibold text-violet-dark-0 shadow-lg transition-all hover:text-violet-light-0 disabled:bg-gray-300 disabled:text-gray-400"
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
            className={`flex h-6 w-6 items-center justify-center rounded-lg p-2 text-sm font-semibold shadow-lg transition-all disabled:bg-slate-300 ${
              currentPage === number
                ? "bg-violet-dark-0 text-white hover:bg-violet-light-0"
                : "bg-gray-300 text-violet-dark-0 hover:text-violet-light-0"
            }`}
          >
            {number}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={goToNextPage}
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-300 p-2 text-sm font-semibold text-violet-dark-0 shadow-lg transition-all hover:text-violet-light-0 disabled:bg-gray-300 disabled:text-gray-400"
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
