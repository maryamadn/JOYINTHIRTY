import { useState } from "react";

const SearchResults = ({ results, library, setLibrary }) => {
  const [values, setValues] = useState({});

  const handleDropdown = (index) => {
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleAddToNewPlaylist = (result, index) => {
    console.log("lib", library);
    const newPlaylistArray = [result];
    const newPlaylist = {};
    newPlaylist[values[index]] = newPlaylistArray;
    values[index] = ""; //reset input field

    setLibrary([...library, newPlaylist]);
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
    alert("added to new playlist");
  };

  const handleAddToExistingPlaylist = (result, index, playlistName, playlist) => {
    const withAddedTrack = playlist[playlistName]
    console.log(playlist)
    withAddedTrack.push(result)
    console.log(playlist)
    console.log(withAddedTrack)
    const updatedLibrary = library
    updatedLibrary[index][playlistName] = withAddedTrack
    setLibrary(updatedLibrary)
    // alert('added to playlist')
    document
    .getElementById(`dropdown-content-${index}`)
    .classList.toggle("dropdown-content");
  };

  return (
    <>
      <p>Track Name</p>
      <p>Artist</p>
      <p>Duration</p>
      {results.map((result, index) => (
        <div key={index}>
          <img src={result.image} width="100px" />
          <p>{result.title}</p>
          <p>{result.artist}</p>
          <p>{result.duration}</p>
          {/* <audio src={result.url} controls /> */}

          <div id="dropdown-container">
            <button onClick={() => handleDropdown(index)} id="dropdown-button">
              +
            </button>
            <div id={`dropdown-content-${index}`} className="dropdown-content">
              <div id="newPlaylistButton">
                <p>new playlist</p>
                <input
                  id="newPlaylistNameInput"
                  value={values[index] || ""}
                  name={index}
                  onChange={handleInputChange}
                  placeholder="Playlist Name"
                />
                <button
                  id="newPlaylistNameInputButton"
                  onClick={() => handleAddToNewPlaylist(result, index)}
                >
                  create
                </button>
              </div>
              <div id="newPlaylistButton">
                {library.map((playlist, index) => {
                  const playlistName = Object.keys(playlist)[0];
                  return <button key={index} onClick={() => handleAddToExistingPlaylist(result, index, playlistName, playlist)}>{playlistName}</button>;
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button>.. prev page</button>
      <button>next page ..</button>
    </>
  );
};

export default SearchResults;
