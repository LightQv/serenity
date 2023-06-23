import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function OperationsList({
  operation,
  selectedOperation,
  setSelectedOperation,
}) {
  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedOperation(operation.operation_id);
    } else setSelectedOperation("");
  };
  return (
    <li
      className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:hover:bg-gray-300"
      key={operation.operation_id}
    >
      <input
        type="checkbox"
        name={operation.operation_id}
        id={operation.operation_id}
        className="mr-2 lg:pl-4"
        checked={selectedOperation === operation.operation_id}
        onChange={handleChange}
      />
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
  selectedOperation: PropTypes.string.isRequired,
  setSelectedOperation: PropTypes.shape().isRequired,
};
