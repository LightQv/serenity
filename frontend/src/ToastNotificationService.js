import { toast } from "react-toastify";

const option = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const notifyDuplicate = (message) => toast.warn(message, option);

export default function notifySuccess(message) {
  toast.success(message, option);
}

export const notifyError = (message) => toast.error(message, option);
