import { useState } from "react";

const SearchResults = ({ results }) => {
  // const [playlist, setPlaylist] = useState([]);
  const [library, setLibrary] = useState([]);

  const handleDropdown = (index) => {
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
  };

  const handleAddToNewPlaylist = (result) => {
    const newPlaylist = [];
    newPlaylist.push(result);
    console.log(newPlaylist);
    setLibrary([...library, newPlaylist]);
  };

  const handleAddToExistingPlaylist = () => {
    console.log("add to existing playlist");
  };

  return (
    <>
      <p>Track Name | Artist | Duration</p>
      {results.map((result, index) => (
        <div key={index}>
          <p>
            {result.title}, {result.artist}, {result.duration}
          </p>
          <audio src={result.url} controls />
          <img src={result.image} width="100px" />

          <div id="dropdown-container">
            <button onClick={() => handleDropdown(index)} id="dropdown-button">
              add to playlist
            </button>
            <div id={`dropdown-content-${index}`} className="dropdown-content">
              <ul>
                <li onClick={() => handleAddToNewPlaylist(result)}>
                  new playlist
                </li>
                {library.map}
                <li onClick={handleAddToExistingPlaylist}>playlist 1</li>
                <li onClick={handleAddToExistingPlaylist}>playlist 2</li>
              </ul>
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
