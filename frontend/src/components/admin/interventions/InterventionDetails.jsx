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
    <li className=" grid h-fit w-full list-none grid-cols-1 items-center gap-4 rounded-xl bg-gray-200 p-6 transition-all  lg:h-20 lg:grid-cols-5 lg:gap-0 lg:rounded-none lg:border-b-[1px] lg:border-gray-300 lg:bg-transparent ">
      <div className="flex w-full flex-col lg:flex-none">
        <p className="text-sm lg:hidden">Nom de l'intervention</p>
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {intervention.operation_name}
        </p>
      </div>
      <div className="flex w-full flex-col lg:flex-none">
        <p className="text-sm lg:hidden">Date de l'intervention</p>
        <p className="line-clamp-1 text-xs lg:text-base">
          {new Date(intervention.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex w-full flex-col lg:flex-none">
        <p className="text-sm lg:hidden">Nom du chirurgien</p>
        <p className="line-clamp-1 text-xs lg:text-base">
          {intervention.surname}
        </p>
      </div>
      <div className="flex w-full flex-col lg:flex-none">
        <p className="text-sm lg:hidden">Nom du patient</p>
        <p className="line-clamp-1 text-xs lg:text-base">
          {intervention.lastname} {intervention.firstname}
        </p>
      </div>
      {/* <div className="grid place-items-end gap-2"> */}
      <div className="mt-2 flex justify-center gap-2 text-end lg:mt-0 lg:justify-end">
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300"
          onClick={handleEdit}
        >
          <EditSvg />
        </button>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300"
          onClick={handleDelete}
        >
          <DeleteSvg />
        </button>
      </div>
      {/* </div> */}
    </li>
  );
}

InterventionDetails.propTypes = {
  intervention: PropTypes.shape().isRequired,
  setSelectedIntervention: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
