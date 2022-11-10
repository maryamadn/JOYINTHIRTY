import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notifyInvalidPlaylistName from "../../Toastify/InvalidPlaylistName";
import notifyIdenticalRenameInput from '../../Toastify/IdenticalRenameInput'
import notifyRenameSuccessful from '../../Toastify/RenameSuccessful'
import notifyAddedNewPlaylist from '../../Toastify/AddedNewPlaylist'
import notifyDeletedPlaylist from '../../Toastify/DeletedPlaylist'

const Playlists = ({ library, setLibrary }) => {
  const [values, setValues] = useState({});
  const [currentIndexForEventListener, setCurrentIndexForEventListener] =
    useState("");

  const handleRenamePlaylistMenu = (playlistIndex) => {
    document
      .getElementById(`playlistsPage-Rename-${playlistIndex}`)
      .classList.toggle("playlistsPage-Rename-shown");
    setCurrentIndexForEventListener(playlistIndex);
  };

  const rename = document.getElementById(
    `playlistsPage-playlistRenameInputButton-${currentIndexForEventListener}`
  );
  if (rename !== null && currentIndexForEventListener !== null) {
    const renameContent = document.getElementById(
      `playlistsPage-Rename-${currentIndexForEventListener}`
    );
    const renameInput = document.getElementById(
      `playlistsPage-playlistRenameInput-${currentIndexForEventListener}`
    );
    const submitButton = document.getElementById(
      `playlistsPage-playlistSubmitButton-${currentIndexForEventListener}`
    );

    document.body.addEventListener("click", (event) => {
      if (currentIndexForEventListener !== "") {
        if (
          event.target !== rename &&
          event.target !== renameContent &&
          event.target !== renameInput &&
          event.target !== submitButton
        ) {
          if (renameContent !== null) {
            renameContent.classList.remove("playlistsPage-Rename-shown");
          }
        }
      }
    });

    window.addEventListener("resize", () => {
      renameContent.classList.remove("playlistsPage-Rename-shown");
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleRenamePlaylist = (playlistIndex, playlistName) => {
    if (values[playlistIndex] === "" || values[playlistIndex] === undefined) {
      notifyInvalidPlaylistName();
    } else if (values[playlistIndex] === playlistName) {
      notifyIdenticalRenameInput();
    } else {
      const updatedLibrary = [...library];
      updatedLibrary[playlistIndex][values[playlistIndex]] =
        updatedLibrary[playlistIndex][playlistName];
      delete updatedLibrary[playlistIndex][playlistName];

      setLibrary(updatedLibrary);
      values[playlistIndex] = ""; //reset input field
      notifyRenameSuccessful()
      handleRenamePlaylistMenu(playlistIndex);
    }
  };

  const handleDeletePlaylist = (playlistIndex) => {
    const updatedLibrary = [...library];
    updatedLibrary.splice(playlistIndex, 1);
    setLibrary(updatedLibrary);
    notifyDeletedPlaylist();
  };

  const handleAddNewPlaylist = () => {
    if (values.name === "" || values.name === undefined) {
      notifyInvalidPlaylistName();
    } else {
      const newPlaylist = {};
      newPlaylist[values.name] = [];
      values.name = ""; //reset input field

      setLibrary([...library, newPlaylist]);
      notifyAddedNewPlaylist();
    }
  };

  return (
    <>
      <div className="playlistsPage">
        <div className="playlistsPage-createPlaylist">
          <p>+</p>
          <p>create new playlist</p>
          <input
            id="playlistsPage-newPlaylistNameInput"
            value={values.name || ""}
            name="name"
            onChange={handleInputChange}
            placeholder="Playlist Name"
          />
          <button
            id="playlistsPage-newPlaylistNameInputButton"
            onClick={handleAddNewPlaylist}
          >
            create
          </button>
        </div>
        <div className="playlistsPage-playlists">
          {library.map((playlist, index) => {
            const playlistName = Object.keys(playlist)[0];
            const playlistIndex = index;
            return (
              <div className="playlistsPage-eachPlaylist" key={` ${index}`}>
                <Link
                  to={`/user/eachplaylist/${playlistIndex}`}
                  className="playlistsPage-playlistName"
                >
                  {playlistName}
                </Link>
                <button
                  id={`playlistsPage-playlistRenameInputButton-${playlistIndex}`}
                  className="playlistsPage-playlistRenameInputButton"
                  onClick={() => handleRenamePlaylistMenu(playlistIndex)}
                >
                  rename
                </button>
                <div id={`playlistsPage-Rename-${playlistIndex}`}>
                  <input
                    id={`playlistsPage-playlistRenameInput-${playlistIndex}`}
                    className="playlistsPage-playlistRenameInput"
                    value={values[playlistIndex] || ""}
                    name={playlistIndex}
                    onChange={handleInputChange}
                    placeholder="Playlist Name"
                  />
                  <button
                  id={`playlistsPage-playlistSubmitButton-${playlistIndex}`}
                    className="playlistsPage-playlistSubmitButton"
                    onClick={() =>
                      handleRenamePlaylist(playlistIndex, playlistName)
                    }
                  >
                    submit
                  </button>
                </div>
                <button
                  id="playlistsPage-playlistDeleteButton"
                  onClick={() => handleDeletePlaylist(playlistIndex)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Playlists;
