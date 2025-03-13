import { Flip, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type) => {
  const style = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  };

  switch (type) {
    case "success":
      return toast.success(message, style);
    case "error":
      return toast.error(message, style);
    case "info":
      return toast.info(message, style);
    default:
      return toast(message, style);
  }
};

export { showToast };
