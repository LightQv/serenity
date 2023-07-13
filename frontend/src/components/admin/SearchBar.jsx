import React from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onChange, type }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Rechercher un ${type}...`}
      className="w-70 rounded-lg border border-gray-300 bg-gray-300 px-4 py-2 placeholder:italic placeholder:text-gray-400 focus:border-violet-dark-0 focus:outline-none focus:ring-violet-dark-0"
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchBar;
