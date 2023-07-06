import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { notifyError } from "../../../../services/ToastNotificationService";
import APIService from "../../../../services/APIService";
import EditSvg from "../../../svg/EditSvg";
import DeleteSvg from "../../../svg/DeleteSvg";
import Modal from "../../Modal";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

export default function ItemDetails({ selectedProtocol }) {
  const [itemList, setItemList] = useState();
  const [isShow, setIsShow] = useState(
    { modalAdd: false },
    { modalEdit: false },
    { modalDelete: false }
  );
  const [selectedItem, setSelectedItem] = useState();
  const [itemInfos, setItemInfos] = useState({
    protocol_item_name: "",
    protocol_description: "",
    protocol_id: selectedProtocol,
  });

  // Fetch Protocols data
  useEffect(() => {
    APIService.get(`/items/${selectedProtocol}`)
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [selectedItem, isShow]);

  const handleEdit = (id) => {
    setSelectedItem(id);
    setIsShow({ modalEdit: true });
  };

  const handleDelete = (id) => {
    setSelectedItem(id);
    setIsShow({ modalDelete: true });
  };

  return (
    <div className="mb-4 flex w-80 flex-col items-center lg:mb-0 lg:w-full">
      <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
        Liste de(s) contenu(s)
      </h1>
      <ul className="w-full gap-4 space-y-4 px-4 pb-1 pt-2 lg:p-8">
        {itemList && itemList.length !== 0 ? (
          itemList.map((item, index) => (
            <li className="flex justify-start gap-1">
              <div className="flex w-full justify-start gap-1">
                <h3 className="text-sm font-semibold">{index + 1}.</h3>
                <div className="text-sm">
                  <h4 className="font-semibold text-violet-dark-0">
                    {item.protocol_item_name}
                  </h4>
                  <p className="line-clamp-2 italic">
                    {item.protocol_description}
                  </p>
                </div>
              </div>
              <div className="ml-2 flex gap-2">
                <button
                  type="button"
                  className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
                  onClick={() => handleEdit(item.id)}
                >
                  <EditSvg />
                </button>
                <button
                  type="button"
                  className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteSvg />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="self-center text-xs">Aucun contenu disponible.</p>
        )}
      </ul>
      <button
        type="button"
        className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:my-0 lg:mb-8"
        onClick={() => setIsShow({ modalAdd: true })}
      >
        Ajouter un contenu
      </button>
      <div
        className={
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal
            component={
              <AddItem itemInfos={itemInfos} setItemInfos={setItemInfos} />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditItem
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeleteItem
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

ItemDetails.propTypes = {
  selectedProtocol: PropTypes.number.isRequired,
};
