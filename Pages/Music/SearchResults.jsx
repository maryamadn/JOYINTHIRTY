import { useState } from "react";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";

const SearchResults = ({
  results,
  library,
  setLibrary,
  nowPlaying,
  setNowPlaying,
  isPlaying,
  setIsPlaying,
}) => {
  const handleSetNowPlaying = (index) => {
    const newNowPlaying = {};
    newNowPlaying.array = [...results];
    newNowPlaying.index = index;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    setNowPlaying(newNowPlaying);
  };

  const [values, setValues] = useState({});

  const handleResultMenu = (index) => {
    document
      .getElementById(`resultMenuContent-${index}`)
      .classList.toggle("resultMenuContent-hidden");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleAddToNewPlaylist = (result, index) => {
    if (values[index] === "" || values[index] === undefined) {
      console.log("alert tkle");
    } else {
      const newPlaylistArray = [result];
      const newPlaylist = {};
      newPlaylist[values[index]] = newPlaylistArray;
      values[index] = ""; //reset input field

      setLibrary([...library, newPlaylist]);
      document
        .getElementById(`dropdown-content-${index}`)
        .classList.toggle("dropdown-content");
      alert("added to new playlist");
    }
  };

  const handleAddToExistingPlaylist = (
    result,
    index,
    playlistName,
    playlist
  ) => {
    if (playlist[playlistName].indexOf(result) === -1) {
      const withAddedTrack = [...playlist[playlistName]];
      withAddedTrack.push(result);

      const newNowPlaying = nowPlaying;
      if (parseInt(newNowPlaying.playlistIndex) === index) {
        newNowPlaying.array = withAddedTrack;
        console.log(newNowPlaying);
        setNowPlaying(newNowPlaying);
      }

      const updatedLibrary = library;
      updatedLibrary[index][playlistName] = withAddedTrack;
      setLibrary(updatedLibrary);
      // alert('added to playlist')
      document
        .getElementById(`dropdown-content-${index}`)
        .classList.toggle("dropdown-content");
    } else {
      console.log("track alr in playlist");
      //alert
    }
  };

  return (
    <>
      <div className="searchResultsPage-legend">
        <p className="searchResultsPage-trackName">Track Name</p>
        <p className="searchResultsPage-trackArtist">Artist</p>
        <p className="searchResultsPage-trackDuration">Duration</p>
      </div>
      {results.map((result, index) => (
        <div key={index} className="result">
          <IconContext.Provider
            value={{ size: "30px", className: "resultPlayIcon" }}
          >
            <BsPlayFill onClick={() => handleSetNowPlaying(index)} />
          </IconContext.Provider>
          <img src={result.image} />
          <p>{result.title}</p>
          <p>{result.artist}</p>
          <p>{result.duration}</p>

          <div id="resultMenuContainer">
            <BsThreeDots
              className="resultMenuIcon"
              onClick={() => handleResultMenu(index)}
            />
            <div id={`resultMenuContent-${index}`} >
              {/* <div id="newPlaylistButton"> */}
                <section >new playlist</section>
                <section>
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
                </section>
                <section id="newPlaylistButton">
                  {library.map((playlist, index) => {
                    const playlistName = Object.keys(playlist)[0];
                    return (
                      <section
                        key={index}
                        onClick={() =>
                          handleAddToExistingPlaylist(
                            result,
                            index,
                            playlistName,
                            playlist
                          )
                        }
                      >
                        {playlistName}
                      </section>
                    );
                  })}
                </section>
              {/* </div> */}
            </div>
          </div>
        </div>
      ))}

      <button className="prevPage">prev page</button>
      <button className="nextPage">next page</button>
    </>
  );
};

export default SearchResults;
