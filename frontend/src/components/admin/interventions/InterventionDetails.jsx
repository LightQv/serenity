import PropTypes from "prop-types";
import DeleteSvg from "../../svg/DeleteSvg";
import EditSvg from "../../svg/EditSvg";

export default function InterventionDetails({
  intervention,
  setSelectedIntervention,
  setIsShow,
}) {
  const handleEdit = () => {
    setSelectedIntervention(intervention);
    setIsShow({ modalEdit: true });
  };

  const handleDelete = () => {
    setSelectedIntervention(intervention);
    setIsShow({ modalDelete: true });
  };
  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4">
      <div className="flex h-full w-full items-center justify-between lg:pr-4">
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {intervention.operation_name}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {intervention.date}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {intervention.practicionner_name}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {intervention.patient_name}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {intervention.protocol_name}
        </p>
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
