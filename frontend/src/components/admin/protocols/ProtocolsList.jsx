import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProtocolsList({
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
    <li className="flex h-12 w-full list-none items-center justify-between border-b-[1px] border-slate-200 transition-all lg:h-20 lg:border-gray-300 lg:px-4 lg:hover:bg-gray-300">
      <Link
        to={`${protocol.protocol_id}`}
        className="flex h-full w-full items-center justify-between lg:pr-4"
      >
        <p className="line-clamp-1 text-xs font-semibold lg:text-base">
          {protocol.protocol_name}
        </p>
        <p className="line-clamp-1 text-end text-xs lg:text-base">
          {protocol.operation_name}
        </p>
      </Link>
      <div className="ml-2 flex gap-2">
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
          onClick={handleEdit}
        >
          <svg
            className="h-5 w-5 lg:h-6 lg:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4138 12.3083C14.8269 11.9094 15.4834 11.9151 15.8894 12.3211C16.2955 12.7272 16.3012 13.3837 15.9023 13.7968L8.00744 21.6916C7.81007 21.889 7.54237 21.9999 7.26322 22H3.05264C2.47128 22 2 21.5287 2 20.9474V16.7368C2.00006 16.4576 2.111 16.1899 2.30842 15.9926L15.9928 2.3082C16.4038 1.89727 17.0702 1.89727 17.4812 2.3082L21.6918 6.51877C22.1027 6.92983 22.1027 7.59615 21.6918 8.00721L18.5339 11.1651C18.1228 11.5761 17.4565 11.5761 17.0454 11.1651L14.9401 9.05985C14.6665 8.79556 14.5568 8.40419 14.6531 8.03615C14.7494 7.66812 15.0368 7.3807 15.4049 7.28436C15.7729 7.18803 16.1643 7.29778 16.4286 7.57142L17.7897 8.93248L19.4591 7.26299L16.737 4.54086L4.10529 17.1726V19.8947H6.82742L14.4138 12.3083Z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
          onClick={handleDelete}
        >
          <svg
            className="h-5 w-5 lg:h-6 lg:w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.874 6.14084C21.7804 6.0473 21.6605 6.00028 21.5148 6.00028H16.686L15.5921 3.39079C15.4359 3.00524 15.1546 2.67706 14.7485 2.40618C14.3421 2.13536 13.9304 2 13.5138 2H10.5155C10.0989 2 9.68733 2.13536 9.28104 2.40618C8.8747 2.67706 8.59342 3.00519 8.4371 3.39079L7.34325 6.00028H2.51464C2.36867 6.00028 2.24902 6.0473 2.1552 6.14084C2.06166 6.2346 2.01465 6.35447 2.01465 6.50028V7.50048C2.01465 7.64629 2.06145 7.76616 2.1552 7.85976C2.24902 7.95346 2.36888 8.00031 2.51464 8.00031H4.01467V18.8746C4.01467 19.7396 4.2595 20.4765 4.74909 21.0858C5.23879 21.6955 5.8274 22 6.51502 22H17.5142C18.202 22 18.7906 21.685 19.2802 21.0549C19.7698 20.4243 20.0145 19.677 20.0145 18.8124V8.00031H21.5148C21.6605 8.00031 21.7804 7.95346 21.874 7.85976C21.9675 7.76622 22.0146 7.64629 22.0146 7.50048V6.50028C22.0148 6.35447 21.9675 6.2346 21.874 6.14084ZM10.2812 4.17173C10.354 4.07803 10.4427 4.02056 10.5468 3.99987H13.4981C13.6022 4.02072 13.691 4.07814 13.7638 4.17173L14.5141 6.00006H9.51546L10.2812 4.17173ZM17.905 19.4452C17.832 19.6378 17.7563 19.7785 17.6784 19.867C17.6 19.9558 17.5458 19.9999 17.5143 19.9999H6.51507C6.48382 19.9999 6.42941 19.9558 6.35109 19.867C6.27287 19.7785 6.19729 19.6378 6.12433 19.4452C6.05148 19.2526 6.01502 19.0414 6.01502 18.8125V8.00031H18.0144V18.8125C18.0144 19.0416 17.9781 19.2526 17.905 19.4452ZM9.51659 16.9997H10.5166C10.6626 16.9997 10.7825 16.9529 10.8761 16.8592C10.9696 16.7652 11.0166 16.6457 11.0166 16.4996V11.5008C11.0166 11.355 10.9696 11.2351 10.8761 11.1413C10.7823 11.0478 10.6627 11.0009 10.5166 11.0009H9.51659C9.37062 11.0009 9.25092 11.0477 9.15716 11.1413C9.06351 11.2351 9.0166 11.355 9.0166 11.5008V16.4996C9.0166 16.6457 9.06334 16.7652 9.15716 16.8592C9.25092 16.9529 9.37062 16.9997 9.51659 16.9997ZM13.5129 16.9997H14.5128C14.6588 16.9997 14.7787 16.9529 14.8724 16.8592C14.966 16.7652 15.0126 16.6457 15.0126 16.4996V11.5008C15.0126 11.355 14.966 11.2351 14.8724 11.1413C14.7787 11.0478 14.6588 11.0009 14.5128 11.0009H13.5129C13.3667 11.0009 13.2473 11.0477 13.1532 11.1413C13.0596 11.2351 13.0128 11.355 13.0128 11.5008V16.4996C13.0128 16.6457 13.0596 16.7652 13.1532 16.8592C13.2473 16.9529 13.3667 16.9997 13.5129 16.9997Z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

ProtocolsList.propTypes = {
  protocol: PropTypes.shape().isRequired,
  setSelectedProtocol: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
