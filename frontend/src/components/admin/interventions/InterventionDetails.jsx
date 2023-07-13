import PropTypes from "prop-types";
import DeleteSvg from "../../svg/DeleteSvg";
import EditSvg from "../../svg/EditSvg";

export default function InterventionDetails({
  intervention,
  setSelectedIntervention,
  setIsShow,
}) {
  const handleEdit = () => {
    setSelectedIntervention(intervention.id);
    setIsShow({ modalEdit: true });
  };

  const handleDelete = () => {
    setSelectedIntervention(intervention.id);
    setIsShow({ modalDelete: true });
  };

  return (
    <li className="flex h-fit w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4">
      <div className="grid h-full w-full grid-cols-1 items-center justify-between gap-2 py-4 lg:grid-cols-4 lg:gap-0 lg:py-0 lg:pr-4">
        <div className="flex w-fit flex-col lg:justify-self-start">
          <p className="text-sm lg:hidden">Nom de l'intervention</p>
          <p className="line-clamp-1 text-xs font-semibold lg:text-base">
            {intervention.operation_name}
          </p>
        </div>
        <div className="flex w-fit flex-col lg:justify-self-center">
          <p className="text-sm lg:hidden">Date de l'intervention</p>
          <p className="line-clamp-1 text-xs lg:text-base">
            {new Date(intervention.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex w-fit flex-col lg:justify-self-center">
          <p className="text-sm lg:hidden">Nom du chirurgien</p>
          <p className="line-clamp-1 text-xs lg:text-base">
            {intervention.surname}
          </p>
        </div>
        <div className="flex w-fit flex-col lg:justify-self-end">
          <p className="text-sm lg:hidden">Nom du patient</p>
          <p className="line-clamp-1 text-xs lg:text-base">
            {intervention.lastname} {intervention.firstname}
          </p>
        </div>
      </div>
      <div className="ml-2 flex gap-2">
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
          onClick={handleEdit}
        >
          <EditSvg />
        </button>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
          onClick={handleDelete}
        >
          <DeleteSvg />
        </button>
      </div>
    </li>
  );
}

InterventionDetails.propTypes = {
  intervention: PropTypes.shape().isRequired,
  setSelectedIntervention: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
