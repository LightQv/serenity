import React from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un patient..."
      className="w-70 rounded-md border border-gray-300 px-4 py-2 focus:border-violet-dark-0 focus:outline-none focus:ring-violet-dark-0"
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
