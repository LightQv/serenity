import PropTypes from "prop-types";
import EditSvg from "../../svg/EditSvg";
import DeleteSvg from "../../svg/DeleteSvg";

export default function PractitionerDetails({
  practitioner,
  setSelectedPractitioner,
  setIsShow,
}) {
  const handleEdit = () => {
    setSelectedPractitioner(practitioner.id);
    setIsShow({ modalEdit: true });
  };

  const handleDelete = () => {
    setSelectedPractitioner(practitioner.id);
    setIsShow({ modalDelete: true });
  };

  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4 lg:hover:bg-gray-300">
      <p className="line-clamp-1 text-xs font-semibold lg:text-base">
        {practitioner.surname}
      </p>
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

PractitionerDetails.propTypes = {
  practitioner: PropTypes.shape().isRequired,
  setSelectedPractitioner: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
