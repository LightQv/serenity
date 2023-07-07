import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function InsightCard({ title, data, link }) {
  function getPrimaryInfo(item) {
    if (item.operation_name) return item.operation_name;
    if (item.firstname) return `${item.firstname} ${item.lastname}`;
    if (item.surname) return item.surname;
    return null;
  }
  function getSecondaryInfo(item) {
    if (item.email) return item.email;
    if (item.formatted_date) {
      return `Le ${item.formatted_date} pratiqué par le ${item.surname}`;
    }
    return null;
  }
  return (
    <div className="flex flex-col justify-center rounded-xl bg-gray-200 p-4 shadow-xl lg:px-6">
      <h3 className="mb-2 self-start text-base font-semibold lg:text-xl">
        {title}
      </h3>
      <ul className="w-full self-center">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex h-12 w-full list-none flex-col items-start justify-center border-b-[1px] border-slate-200 transition-all lg:h-[4.5rem] lg:justify-center lg:border-gray-300 lg:px-4"
          >
            <p className="line-clamp-1 text-base font-bold lg:text-lg">
              {getPrimaryInfo(item)}
            </p>
            <p className="text-xs">{getSecondaryInfo(item)}</p>
          </li>
        ))}
      </ul>
      <Link to={`/admin/${link}`} className="self-center">
        <button
          type="button"
          className="my-2 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
        >
          Voir tout
        </button>
      </Link>
    </div>
  );
}

InsightCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf({
    surname: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
};
