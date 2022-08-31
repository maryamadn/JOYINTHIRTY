import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EachPlaylist = ({ library, setLibrary }) => {
  const navigate = useNavigate();
  const { playlistIndex } = useParams();

  const playlistName = Object.keys(library[playlistIndex])[0];
  const [playlist, setPlaylist] = useState(
    Object.values(library[playlistIndex])[0]
  );

  const [values, setValues] = useState({});

  const handleDropdown = (index) => {
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
  };

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleRenamePlaylist = () => {
    console.log("renamed playlist");
    const updatedLibrary = [...library];
    updatedLibrary[playlistIndex][values.rename] =
      updatedLibrary[playlistIndex][playlistName];
    delete updatedLibrary[playlistIndex][playlistName]
    console.log(updatedLibrary)
    setLibrary(updatedLibrary)
    values.rename = ""; //reset input field
  };

  const handleDeletePlaylist = () => {
    const updatedLibrary = [...library];
    updatedLibrary.splice(playlistIndex, 1);
    setLibrary(updatedLibrary);
    console.log("deleted playlist");
    navigate("/user/playlists");
  };

  const handleAddToNewPlaylist = (track, index) => {
    const newPlaylistArray = [track];
    const newPlaylist = {};
    newPlaylist[values[index]] = newPlaylistArray;
    values[index] = ""; //reset input field

    setLibrary([...library, newPlaylist]);
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
    alert("added to new playlist");
  };

  const handleAddToExistingPlaylist = (
    result,
    index,
    playlistName,
    playlist
  ) => {
    const withAddedTrack = [...playlist[playlistName]];
    console.log("1", withAddedTrack);
    withAddedTrack.push(result);
    console.log("2", withAddedTrack);
    setPlaylist(withAddedTrack);
    const updatedLibrary = [...library];
    updatedLibrary[index][playlistName] = withAddedTrack;
    setLibrary(updatedLibrary);
    // alert('added to playlist')
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
  };

  const handleRemoveFromPlaylist = (index) => {
    console.log(playlist);
    const withoutRemovedTrack = [...playlist];
    withoutRemovedTrack.splice(index, 1);
    console.log(withoutRemovedTrack);
    setPlaylist(withoutRemovedTrack);
    const updatedLibrary = [...library];
    updatedLibrary[playlistIndex][playlistName] = withoutRemovedTrack;
    setLibrary(updatedLibrary);
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
    // alert("removed from playlist");
  };

  return (
    <>
      <h1>{playlistName}</h1>
      <div
        id={"dropdown-content-playlist"}
        className="dropdown-content-playlist"
      >
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
            onClick={handleRenamePlaylist}
          >
            rename
          </button>
        </div>
        <div id="newPlaylistButton">
          <button onClick={handleDeletePlaylist}>delete playlist</button>
        </div>
      </div>
      {playlist.length} {playlist.length === 1 ? "track" : "tracks"}
      <h2>## hrs, ## mins</h2>
      <p>Track Name</p>
      <p>Artist</p>
      <p>Duration</p>
      {playlist.map((track, index) => (
        <div key={`eachplaylist-${index}`}>
          <h2></h2>
          <img src={track.image} width="100px" />
          <p>{track.title}</p>
          <p>{track.artist}</p>
          <p>{track.duration}</p>
          {/* <audio src={result.url} controls /> */}

          <div id="dropdown-container">
            <button onClick={() => handleDropdown(index)} id="dropdown-button">
              options
            </button>
            <div id={`dropdown-content-${index}`} className="dropdown-content">
              <div id="newPlaylistButton">
                <p>add to new playlist</p>
                <input
                  id="newPlaylistNameInput"
                  value={values[index] || ""}
                  name={index}
                  onChange={handleInputChange}
                  placeholder="Playlist Name"
                />
                <button
                  id="newPlaylistNameInputButton"
                  onClick={() => handleAddToNewPlaylist(track, index)}
                >
                  create
                </button>
              </div>
              <div id="newPlaylistButton">
                {library.map((playlist, index) => {
                  const playlistName = Object.keys(playlist)[0];
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        handleAddToExistingPlaylist(
                          track,
                          index,
                          playlistName,
                          playlist
                        )
                      }
                    >
                      {playlistName}
                    </button>
                  );
                })}
              </div>
              <div id="newPlaylistButton">
                <button onClick={() => handleRemoveFromPlaylist(index)}>
                  remove from playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <div class="dropdown">
        <p>3 dots</p>
        <div class="dropdown-content">
          <p>edit playlist name</p>
          <Link to="/playlists">
            <p>delete playlist n back to playlists page</p>
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default EachPlaylist;
