import PropTypes from "prop-types";

export default function StatsCard({ title, number }) {
  return (
    <div className="flex flex-col justify-center rounded-xl bg-gray-200 p-4 shadow-xl lg:px-6">
      <h3 className="mb-2 self-center text-sm font-semibold lg:self-start lg:text-xl">
        {title}
      </h3>
      <p className="self-center text-xl font-bold text-violet-light-0 lg:text-6xl">
        {number}
      </p>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
