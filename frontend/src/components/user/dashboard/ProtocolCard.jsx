import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function ProtocolCard({ data }) {
  return (
    <li
      key={data.protocol_id}
      className="flex h-20 w-full items-center justify-between rounded-lg text-slate-100 hover:opacity-80 lg:h-24"
      style={{ backgroundColor: `${data.color_theme}` }}
    >
      <NavLink
        to="/protocols"
        className="flex h-full w-full items-center justify-between p-4 lg:p-8"
      >
        <h3 className="line-clamp-1 text-sm font-semibold lg:text-lg">
          {data.protocol_name}
        </h3>
        <p className="line-clamp-1 text-sm font-normal lg:text-base">
          X/{data.item_count}
        </p>
      </NavLink>
    </li>
  );
}

ProtocolCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
