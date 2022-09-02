import { useState } from "react";
import { Link } from "react-router-dom";

const Playlists = ({ library, setLibrary }) => {
  // const inputRef = useRef();

  const [values, setValues] = useState({});

  const handleCreatePlaylistMenu = () => {
    document
      .getElementById('playlistsPage-newPlaylistNameInput')
      .classList.toggle("playlistsPage-newPlaylistNameInput-shown");
      document
      .getElementById('playlistsPage-newPlaylistNameInputButton')
      .classList.toggle("playlistsPage-newPlaylistNameInputButton-shown");
  };

  const handleRenamePlaylistMenu = () => {
    document
      .getElementById('playlistsPage-playlistRenameInput')
      .classList.toggle("playlistsPage-playlistRenameInput-shown");
      document
      .getElementById('playlistsPage-playlistRenameInputButton')
      .classList.toggle("playlistsPage-playlistRenameInputButton-shown");
  };

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleRenamePlaylist = (playlistIndex, playlistName) => {
    if (values.rename === "" || values.rename === undefined) {
      console.log("alert tkle");
    } else if (values.rename === playlistName) {
      console.log("identical name entered");
    } else {
      const updatedLibrary = [...library];
      updatedLibrary[playlistIndex][values.rename] =
        updatedLibrary[playlistIndex][playlistName];
      delete updatedLibrary[playlistIndex][playlistName];

      setLibrary(updatedLibrary);
      values.rename = ""; //reset input field
    }
    handleRenamePlaylistMenu()
  };

  const handleDeletePlaylist = (playlistIndex) => {
    const updatedLibrary = [...library];
    updatedLibrary.splice(playlistIndex, 1);
    setLibrary(updatedLibrary);
  };

  const handleAddNewPlaylist = () => {
    if (values.name === "" || values.name === undefined) {
      console.log("alert tkle");
    } else {
      const newPlaylist = {};
      newPlaylist[values.name] = [];
      values.name = ""; //reset input field

      setLibrary([...library, newPlaylist]);
      // alert("added new playlist");
    }
    handleCreatePlaylistMenu()
  };

  return (
    <div className="playlistsPage">
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
              <div
                id={`dropdown-content-index??`}
                className="dropdown-content??"
              >
                <div className="playlistsPage-playlistOptions">
                  <p onClick={handleRenamePlaylistMenu}>rename playlist</p>
                  <input
                    id="playlistsPage-playlistRenameInput"
                    value={values.rename || ""}
                    name="rename"
                    onChange={handleInputChange}
                    placeholder="New Playlist Name"
                  />
                  <button
                    id="playlistsPage-playlistRenameInputButton"
                    onClick={() =>
                      handleRenamePlaylist(playlistIndex, playlistName)
                    }
                  >
                    rename
                  </button>
                <p
                  onClick={() => handleDeletePlaylist(playlistIndex)}
                >
                  delete playlist
                </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="playlistsPage-createPlaylist"
        onClick={handleCreatePlaylistMenu}
      >
        <p>+</p>
        <p>create new playlist</p>
      </div>
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
  );
};

export default Playlists;
