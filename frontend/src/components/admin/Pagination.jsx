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
    <ul className="my-4 flex h-fit w-fit justify-evenly gap-4 self-center rounded-lg px-6 py-3 text-sm lg:my-2 lg:mt-4">
      <li className="list-none">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-300 p-2 text-sm font-semibold text-violet-dark-0 shadow-lg transition-all hover:text-violet-light-0 disabled:bg-gray-300 disabled:text-gray-400"
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
      <li className="list-none">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-300 p-2 text-sm font-semibold text-violet-dark-0 shadow-lg transition-all hover:text-violet-light-0 disabled:bg-gray-300 disabled:text-gray-400"
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
