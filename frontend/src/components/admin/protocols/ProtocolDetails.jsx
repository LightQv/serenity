import PropTypes from "prop-types";
import EditSvg from "../../svg/EditSvg";
import DeleteSvg from "../../svg/DeleteSvg";

export default function ProtocolDetails({
  protocol,
  setSelectedProtocol,
  setIsShow,
}) {
  const handleEdit = () => {
    setSelectedProtocol(protocol.protocol_id);
    setIsShow({ modalEdit: true });
  };

  const handleDelete = () => {
    setSelectedProtocol(protocol.protocol_id);
    setIsShow({ modalDelete: true });
  };

  return (
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4">
      <div className="flex h-full w-full items-center justify-between lg:pr-4 lg:first:mr-auto lg:last:ml-auto">
        <p className="line-clamp-1 flex-1 text-xs font-semibold lg:text-base">
          {protocol.protocol_name}
        </p>
        <div className="hidden lg:flex lg:w-12 lg:items-center lg:justify-between">
          <p className="line-clamp-1 flex-1 text-xs font-normal lg:text-base">
            {protocol.item_count}
          </p>
          <div
            className="lg:h-6 lg:w-6 lg:rounded-full"
            style={{ backgroundColor: `${protocol.protocol_color}` }}
          />
        </div>
        <p className="line-clamp-1 flex-1 text-end text-xs lg:text-base">
          {protocol.operation_name}
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

ProtocolDetails.propTypes = {
  protocol: PropTypes.shape().isRequired,
  setSelectedProtocol: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
