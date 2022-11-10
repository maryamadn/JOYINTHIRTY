import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const notifyTrackAlrInPlaylist = () => {
  toast.error("Track already in playlist!", {
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

export default notifyTrackAlrInPlaylist;
