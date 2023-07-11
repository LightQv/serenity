import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  getProgressionPercentage,
  getProgressionBackground,
} from "../../../services/utils";

export default function ProtocolCard({ data }) {
  return (
    <li
      className="relative flex h-20 w-full items-center justify-between overflow-hidden rounded-lg text-slate-100 hover:opacity-80 lg:h-24"
      style={{ backgroundColor: `${data.color_theme}` }}
    >
      <div
        className="absolute left-0 top-0 h-full transition-all"
        style={{
          backgroundColor: `${getProgressionBackground(data.color_theme)}`,
          width: `${getProgressionPercentage(
            data.item_complete,
            data.item_count
          )}`,
        }}
      />
      <NavLink
        to={`/protocols/${data.protocol_id}`}
        className="relative z-20 flex h-full w-full items-center justify-between p-4 lg:p-12"
      >
        <h3 className="line-clamp-1 text-sm font-semibold lg:text-lg">
          {data.protocol_name}
        </h3>
        <p className="line-clamp-1 text-sm font-normal lg:text-base">
          {data.item_complete}/{data.item_count}
        </p>
      </NavLink>
    </li>
  );
}

ProtocolCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
