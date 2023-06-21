import PropTypes from "prop-types";

export default function Modal({ component }) {
  return <modal className="rounded-lg bg-gray-200">{component}</modal>;
}

Modal.propTypes = {
  component: PropTypes.shape().isRequired,
};
