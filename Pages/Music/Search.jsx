import { useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const customId = "custom-id-yes";

const Search = ({ setResults }) => {
  const navigate = useNavigate();

  const APIKEY = "YjZhOGJkYzYtMmY3Zi00ZjgxLTg4NmUtYWZmNDljY2UzZjcy";
  const queryRef = useRef();

  const notifyInvalidSearch = () => {
    toast.error("Invalid search!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: customId
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = queryRef.current.value;
    if (query === "") {
      notifyInvalidSearch()
    } else {
      const fetchSearch = `https://api.napster.com/v2.2/search/verbose?apikey=${APIKEY}&query=${query}&type=track&per_type_limit=200`;
      fetch(fetchSearch)
        .then((response) => response.json())
        .then((data) => {
          const a = [];
          data.search.data.tracks.map((track) => {
            if (track.previewURL !== "") {
              const result = {};
              result["title"] = track.name;
              result["artist"] = track.artistName;
              result["url"] = track.previewURL;
              result["duration"] = track.playbackSeconds;
              result[
                "image"
              ] = `https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/500x500.jpg`;

              if (a.length === 0) {
                a.push(result);
              } else {
                let isSame = false;
                for (let i = 0; i < a.length; i++) {
                  if (
                    a[i].title === result.title &&
                    a[i].artist === result.artist
                  ) {
                    isSame = true;
                  }
                }
                if (!isSame) {
                  a.push(result);
                }
              }
            }
          });
          setResults(a);
        });
      navigate("/user/search/results");
    }
  };

  return (
    <>
      <form className="searchPage">
        <input className="searchInput" ref={queryRef} placeholder="search" />
        <IconContext.Provider
          value={{ size: "100px", className: "searchIcon" }}
        >
          <IoMdSearch />
        </IconContext.Provider>
        <button className="searchButton" onClick={handleSearch}>
          search
        </button>
      </form>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default Search;
