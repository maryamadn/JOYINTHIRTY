import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const notifyAddedNewPlaylist = () => {
  toast.error("New playlist added!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default notifyAddedNewPlaylist;
