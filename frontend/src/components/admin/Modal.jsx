import PropTypes from "prop-types";

export default function Modal({ component, setIsShow }) {
  return (
    <modal className="flex h-fit flex-col rounded-lg bg-gray-200 lg:w-fit">
      <button
        type="button"
        className="mr-1 mt-4 self-end text-violet-dark-0 hover:text-violet-dark-0"
        onClick={() => setIsShow(false)}
      >
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 25"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.0078 6.88105L7.83089 6.69253L4.82428 3.48814C4.49943 3.17608 4.00359 3.17413 3.70263 3.47599C3.40186 3.77766 3.41168 4.26831 3.73495 4.57872L6.91816 7.97289L6.7475 8.14409L3.4691 11.4328C3.16824 11.7346 3.17825 12.2267 3.49282 12.5267C3.80458 12.8257 4.30043 12.8241 4.59969 12.5239L7.99407 9.12011L8.17091 9.30849L11.1781 12.5123C11.501 12.824 11.9986 12.8258 12.2991 12.5227C12.5988 12.2237 12.5888 11.7316 12.2657 11.4213L9.08117 8.02827L9.25183 7.85701L12.5302 4.56713C12.8312 4.26508 12.822 3.77442 12.5084 3.47383C12.196 3.17432 11.7002 3.17575 11.4009 3.47597L8.0078 6.88105Z"
          />
        </svg>
      </button>
      {component}
    </modal>
  );
}

Modal.propTypes = {
  component: PropTypes.shape().isRequired,
  setIsShow: PropTypes.func.isRequired,
};
