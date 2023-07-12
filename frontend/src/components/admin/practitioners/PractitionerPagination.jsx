import React from "react";
import PropTypes from "prop-types";

export default function PractitionerPagination({
  currentPage,
  setCurrentPage,
  paginate,
  maxPage,
}) {
  const pageNumbers = [];

  // Calcul du nombre de pages
  for (let i = 1; i <= maxPage; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="mt-3 flex justify-center">
      <li className="list-none">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="mx-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-slate-300 text-base font-semibold text-violet-dark-0 shadow-lg"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li key={number} className="list-none">
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
      <li className="list-none">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="mx-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-slate-300 text-base font-semibold text-violet-dark-0 shadow-lg"
          disabled={currentPage === maxPage}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
}

PractitionerPagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};
