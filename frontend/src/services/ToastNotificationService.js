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

// toast jaune//
export const notifyDuplicate = (message) => toast.warn(message, option);

// toast vert
export default function notifySuccess(message) {
  toast.success(message, option);
}

export const notifyError = (message) => toast.error(message, option);
