import { useState } from "react";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { ToastContainer } from "react-toastify";
import notifyInvalidPlaylistName from "../../Toastify/InvalidPlaylistName";
import notifyAddedToNewPlaylist from "../../Toastify/AddedToNewPlaylist";
import notifyTrackAlrInPlaylist from '../../Toastify/TrackAlrInPlaylist'
import notifyAddedToExistingPlaylist from "../../Toastify/AddedToExistingPlaylist";

momentDurationFormatSetup(moment);
// typeof moment.duration.fn.format === "function";
// // true
// typeof moment.duration.format === "function";
// // true

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
  const [currentIndexForEventListener, setCurrentIndexForEventListener] = useState("")

  const handleResultMenu = (index) => {
    document
    .getElementById(`resultMenuContent-${index}`)
    .classList.toggle("resultMenuContent-hidden");
    setCurrentIndexForEventListener(index)
  };

  const handleResultMenuNewPlaylist = (index) => {
    document
    .getElementById(`resultMenuNewPlaylistContent-${index}`)
    .classList.toggle("resultMenuNewPlaylistContent-hidden");
  }

  const menuIcon = document.getElementById(`resultMenuIcon-${currentIndexForEventListener}`);
  if (menuIcon !== null && currentIndexForEventListener !== null) {
    const menuContent = document.getElementById(`resultMenuContent-${currentIndexForEventListener}`)
    const menuAddToPlaylist = document.getElementById(`resultMenuAddToPlaylist-${currentIndexForEventListener}`)
    const menuNewPlaylist = document.getElementById(`resultMenuNewPlaylist-${currentIndexForEventListener}`);
    
    const menuNewPlaylistContent = document.getElementById(`resultMenuNewPlaylistContent-${currentIndexForEventListener}`)
    const input = document.getElementById(`newPlaylistNameInput-${currentIndexForEventListener}`)
    const button = document.getElementById(`newPlaylistNameInputButton-${currentIndexForEventListener}`)
    document.body.addEventListener("click", (event) => {
      if (currentIndexForEventListener !== "") {
        if (event.target !== menuNewPlaylistContent && event.target !== input && event.target !== button && event.target !== menuNewPlaylist && event.target !== menuContent && event.target !== menuAddToPlaylist && event.target !== menuIcon) {
          if (menuNewPlaylistContent !== null && menuContent !== null) {
            menuNewPlaylistContent.classList.remove("resultMenuNewPlaylistContent-hidden");
            menuContent.classList.remove("resultMenuContent-hidden");
          }
        }
      }
    });
    
    window.addEventListener("resize", () => {
      menuNewPlaylistContent.classList.remove("resultMenuNewPlaylistContent-hidden");
      menuContent.classList.remove("resultMenuContent-hidden");
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleAddToNewPlaylist = (result, index) => {
    if (values[index] === "" || values[index] === undefined) {
      notifyInvalidPlaylistName()
    } else {
      const newPlaylistArray = [result];
      const newPlaylist = {};
      newPlaylist[values[index]] = newPlaylistArray;
      values[index] = ""; //reset input field

      setLibrary([...library, newPlaylist]);
      document
        .getElementById(`resultMenuContent-${index}`)
        .classList.remove("resultMenuContent-hidden");
      notifyAddedToNewPlaylist();
    }
  };

  const handleAddToExistingPlaylist = (result, index, i, playlistName, playlist) => {
    if (!playlist[playlistName].includes(result)) {
      const withAddedTrack = [...playlist[playlistName]];
      withAddedTrack.push(result);

      const newNowPlaying = nowPlaying;
      if (parseInt(newNowPlaying.playlistIndex) === index) {
        newNowPlaying.array = withAddedTrack;
        setNowPlaying(newNowPlaying);
      }

      const updatedLibrary = library;
      updatedLibrary[i][playlistName] = withAddedTrack;
      setLibrary(updatedLibrary);
      notifyAddedToExistingPlaylist();
      // document
      //   .getElementById(`resultMenuContent-${index}`)
      //   .classList.remove("resultMenuContent-hidden");
    } else {
      notifyTrackAlrInPlaylist();
    }
  };

  return (
    <div className="searchResultsPage">
      <ToastContainer />
      <div className="searchResultsPage-legend">
        <div className="searchResultsPage-play">{""}</div>
        <div className="searchResultsPage-img">{""}</div>
        <p className="searchResultsPage-trackName">Title</p>
        <p className="searchResultsPage-trackArtist">Artist</p>
        <p className="searchResultsPage-trackDuration">Duration</p>
        <div className="searchResultsPage-options">{""}</div>
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
          <p className="result-trackDuration">{moment.duration(result.duration, "seconds").format("mm:ss", {trim: false})}</p>

          <div id="resultMenuContainer">
            <BsThreeDots
              id={`resultMenuIcon-${index}`}
              className="resultMenuIcon"
              onClick={() => handleResultMenu(index)}
            />
            <div id={`resultMenuContent-${index}`}>
              <p id={`resultMenuAddToPlaylist-${index}`} className='resultMenuAddToPlaylist'>add to playlist:</p>
              <button id={`resultMenuNewPlaylist-${index}`} onClick={() => handleResultMenuNewPlaylist(index)}>new playlist</button>
              <div id={`resultMenuNewPlaylistContent-${index}`}>
                <input
                  id={`newPlaylistNameInput-${index}`}
                  className="newPlaylistNameInput"
                  value={values[index] || ""}
                  name={index}
                  onChange={handleInputChange}
                  placeholder="Playlist Name"
                />
                <button
                id={`newPlaylistNameInputButton-${currentIndexForEventListener}`}
                  className="newPlaylistNameInputButton"
                  onClick={() => handleAddToNewPlaylist(result, index)}
                >
                  create
                </button>
              </div>
              <section id="newPlaylistButton">
                {library.map((playlist, i) => {
                  const playlistName = Object.keys(playlist)[0];
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        handleAddToExistingPlaylist(
                          result,
                          index,
                          i,
                          playlistName,
                          playlist
                        )
                      }
                    >
                      {playlistName}
                    </button>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      ))}

      <button className="prevPage">prev page</button>
      <button className="nextPage">next page</button>
    </div>
  );
};

export default SearchResults;
