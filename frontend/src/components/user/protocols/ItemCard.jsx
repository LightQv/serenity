import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import { useInterventionContext } from "../../../contexts/InterventionContext";

export default function ItemCard({ data }) {
  const { update, setUpdate } = useInterventionContext();
  const [itemContent, setItemContent] = useState({
    protocol_item_name: data.protocol_item_name,
    protocol_description: data.protocol_description,
    is_complete: data.is_complete,
  });
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    APIService.put(`/items/details/${data.item_id}`, itemContent)
      .then(() => {
        notifySuccess("Le contenu a été mis à jour.");
        setUpdate(!update);
        setIsClicked(false);
      })
      .catch((err) => {
        if (err.request?.status === 500) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  };

  const handleChange = () => {
    setItemContent({
      ...itemContent,
      is_complete: !itemContent.is_complete,
    });
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      handleSubmit();
    }
  }, [isClicked]);

  return (
    <li className="min-h-20 h-fit w-full rounded-lg bg-gray-100 shadow-md">
      <form action="editItem" onSubmit={handleSubmit} className="h-full w-full">
        <button
          type="button"
          onClick={handleChange}
          className="flex h-full w-full items-center justify-start gap-4 py-4 pr-2 text-left"
        >
          <input
            readOnly
            type="checkbox"
            name="is_complete"
            checked={itemContent?.is_complete}
            className="ml-4 cursor-pointer"
          />
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold">
              {data.protocol_item_name}
            </h3>
            <p className="text-xs italic">{data.protocol_description}</p>
          </div>
        </button>
      </form>
    </li>
  );
}

ItemCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
