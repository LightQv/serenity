import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function OperationsList({ operation }) {
  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:hover:bg-gray-300">
      <Link
        to={`${operation.operation_id}`}
        className="flex h-full w-full items-center justify-between lg:px-4"
      >
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {operation.operation_name}
        </p>
      </Link>
    </li>
  );
}

OperationsList.propTypes = {
  operation: PropTypes.shape().isRequired,
};
