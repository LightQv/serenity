import React from "react";
import PropTypes from "prop-types";

export default function ListOperations({ listOperation }) {
  return (
    <div className="mx-8 my-8">
      <h2 className="text-lg font-extrabold ">
        {listOperation.operation_name}
      </h2>
    </div>
  );
}

ListOperations.propTypes = {
  listOperation: PropTypes.shape({
    operation_name: PropTypes.string.isRequired,
  }).isRequired,
};
