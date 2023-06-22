import PropTypes from "prop-types";

export default function FormError({ errors }) {
  return (
    <div className="rounded-lg bg-red-400 p-4">
      {errors.map((error) => (
        <p className="text-xs text-slate-100">{error}</p>
      ))}
    </div>
  );
}

FormError.propTypes = {
  errors: PropTypes.shape().isRequired,
};
