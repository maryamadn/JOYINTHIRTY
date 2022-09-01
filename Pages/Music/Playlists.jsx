import { useState } from "react";
import { Link } from "react-router-dom";

const Playlists = ({ library, setLibrary }) => {
  // const inputRef = useRef();

  const [values, setValues] = useState({});

  // const handleDropdown = (index) => {
  //   document
  //     .getElementById(`dropdown-content-${index}`)
  //     .classList.toggle("dropdown-content");
  // };

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
      alert("added new playlist");
    }
  };

  return (
    <>
      {library.map((playlist, index) => {
        const playlistName = Object.keys(playlist)[0];
        const playlistIndex = index;
        return (
          <div key={index}>
            <Link to={`/user/eachplaylist/${playlistIndex}`}>
              {playlistName}
            </Link>
            <div id={`dropdown-content-index??`} className="dropdown-content??">
              <div id="newPlaylistButton">
                <p>rename playlist</p>
                <input
                  id="newPlaylistNameInput"
                  value={values.rename || ""}
                  name="rename"
                  onChange={handleInputChange}
                  placeholder="New Playlist Name"
                />
                <button
                  id="newPlaylistNameInputButton"
                  onClick={() =>
                    handleRenamePlaylist(playlistIndex, playlistName)
                  }
                >
                  rename
                </button>
              </div>
              <div id="newPlaylistButton">
                <button onClick={() => handleDeletePlaylist(playlistIndex)}>
                  delete playlist
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div id="playlists-page-newPlaylistButton">
        <p>+</p>
        <p>create new playlist</p>
        <input
          id="playlists-page-newPlaylistNameInput"
          // ref={inputRef}
          value={values.name || ""}
          name="name"
          onChange={handleInputChange}
          placeholder="Playlist Name"
        />
        <button
          id="playlists-page-newPlaylistNameInputButton"
          onClick={handleAddNewPlaylist}
        >
          create
        </button>
      </div>
    </>
  );
};

export default Playlists;
