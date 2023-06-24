import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EyeIcon from "@assets/icon/EyeIcon";

export default function ListPatients({
  patient,
  setSelectedPatient,
  setIsShow,
}) {
  const handleEdit = () => {
    setSelectedPatient(patient.id);
    setIsShow({ modalB: true });
  };
  const handleDelete = () => {
    setSelectedPatient(patient.id);
    setIsShow({ modalC: true });
  };
  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4 lg:hover:bg-gray-300">
      <div className="flex flex-col">
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {patient.firstname} {patient.lastname}
        </p>
        <p className="text-xs font-medium">{patient.email}</p>
      </div>
      <div className="ml-2 flex gap-2">
        <Link
          to={`${patient.id}`}
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
        >
          <EyeIcon />
        </Link>
      </div>
    </li>
  );
}

ListPatients.propTypes = {
  patient: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedPatient: PropTypes.func.isRequired,
  setIsShow: PropTypes.shape().isRequired,
};
