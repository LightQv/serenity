import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  getProgressionPercentage,
  getProgressionBackground,
} from "../../../services/utils";

export default function ProtocolStats({ data }) {
  return (
    <li className="relative flex h-24 w-full items-center justify-between lg:h-36">
      <NavLink
        to={`/protocols/${data.protocol_id}`}
        className={({ isActive }) =>
          isActive
            ? "relative z-20 flex h-full w-full cursor-default items-center justify-between rounded-2xl bg-gray-200 p-4 outline outline-4 lg:p-8"
            : "relative z-20 flex h-full w-full items-center justify-between rounded-2xl bg-gray-200 p-4  hover:opacity-80 lg:p-8"
        }
        style={({ isActive }) =>
          isActive
            ? { outlineColor: `${getProgressionBackground(data.color_theme)}` }
            : null
        }
      >
        <h3 className="line-clamp-1 text-sm font-semibold lg:text-base">
          {data.protocol_name}
        </h3>
        <p
          className="line-clamp-1 flex h-16 w-16 items-center justify-center rounded-full border-4 text-sm font-normal"
          style={{
            borderColor: `${getProgressionBackground(data.color_theme)}`,
          }}
        >
          {getProgressionPercentage(data.item_complete, data.item_count)}
        </p>
      </NavLink>
    </li>
  );
}

ProtocolStats.propTypes = {
  data: PropTypes.shape().isRequired,
};
