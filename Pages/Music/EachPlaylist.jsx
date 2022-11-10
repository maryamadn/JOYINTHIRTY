import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { ToastContainer } from "react-toastify";
import notifyInvalidPlaylistName from "../../Toastify/InvalidPlaylistName";
import notifyAddedToNewPlaylist from "../../Toastify/AddedToNewPlaylist";
import notifyTrackAlrInPlaylist from "../../Toastify/TrackAlrInPlaylist";
import notifyAddedToExistingPlaylist from "../../Toastify/AddedToExistingPlaylist";
import notifyRemovedFromPlaylist from "../../Toastify/RemovedFromPlaylist";
import notifyRenameSuccessful from "../../Toastify/RenameSuccessful";
import notifyIdenticalRenameInput from "../../Toastify/IdenticalRenameInput";

momentDurationFormatSetup(moment);

const EachPlaylist = ({
  library,
  setLibrary,
  nowPlaying,
  setNowPlaying,
  isPlaying,
  setIsPlaying,
}) => {
  const navigate = useNavigate();
  const { playlistIndex } = useParams();

  const playlistName = Object.keys(library?.[playlistIndex])[0];
  const [playlist, setPlaylist] = useState(
    library[playlistIndex]
  );

  const handleSetNowPlaying = (index) => {
    const newNowPlaying = {};
    newNowPlaying.array = [...playlist[playlistName]];
    newNowPlaying.index = index;
    newNowPlaying.playlistIndex = playlistIndex;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    setNowPlaying(newNowPlaying);
  };

  const [values, setValues] = useState({});
  const [currentIndexForEventListener, setCurrentIndexForEventListener] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleRenamePlaylistMenu = () => {
    document
      .getElementById("playlistsPage-Rename")
      .classList.toggle("eachPlaylistsPage-Rename-shown");
  };

  const handleRenamePlaylist = () => {
    if (values.rename === "" || values.rename === undefined) {
      notifyInvalidPlaylistName();
    } else if (values.rename === playlistName) {
      notifyIdenticalRenameInput();
    } else {
      const updatedLibrary = [...library];
      updatedLibrary[playlistIndex][values.rename] =
        updatedLibrary[playlistIndex][playlistName];
      delete updatedLibrary[playlistIndex][playlistName];
      setPlaylist(updatedLibrary[playlistIndex])
      setLibrary(updatedLibrary);
      values.rename = ""; //reset input field
      notifyRenameSuccessful();
      handleRenamePlaylistMenu();
    }
  };

  const handleDeletePlaylist = () => {
    const updatedLibrary = [...library];
    updatedLibrary.splice(playlistIndex, 1);
    if (nowPlaying.playlistIndex === playlistIndex) {
      setNowPlaying({});
    }
    setLibrary(updatedLibrary);
    navigate("/user/playlists");
  };

  const handleResultMenuNewPlaylist = (index) => {
    document
      .getElementById(`resultMenuNewPlaylistContent-${index}`)
      .classList.toggle("resultMenuNewPlaylistContent-hidden");
  };

  const handleAddToNewPlaylist = (track, index) => {
    if (values[index] === "" || values[index] === undefined) {
      notifyInvalidPlaylistName();
    } else {
      const newPlaylistArray = [track];
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

  const handleAddToExistingPlaylist = (
    track,
    i,
    name,
    existingPlaylist
  ) => {
    if (!existingPlaylist[name].includes(track)) {
      //check if song alr in playlist
      const withAddedTrack = [...existingPlaylist[name]];
      withAddedTrack.push(track);
      if (parseInt(playlistIndex) === i) {
        setPlaylist({[name]: withAddedTrack});
      }
      const newNowPlaying = nowPlaying;
      if (parseInt(newNowPlaying.playlistIndex) === i) {
        newNowPlaying.array = withAddedTrack;
        setNowPlaying(newNowPlaying);
      }

      const updatedLibrary = [...library];
      updatedLibrary[i][name] = withAddedTrack;
      setLibrary(updatedLibrary);
      notifyAddedToExistingPlaylist();
    } else {
      notifyTrackAlrInPlaylist();
      // document
      // .getElementById(`resultMenuContent-${index}`)
      // .classList.remove("resultMenuContent-hidden");
    }
  };

  const handleRemoveFromPlaylist = (index) => {
    const withoutRemovedTrack = [...playlist[playlistName]];
    withoutRemovedTrack.splice(index, 1);
    setPlaylist({[playlistName]: withoutRemovedTrack});
    if (nowPlaying.playlistIndex === playlistIndex) {
      const newNowPlaying = { ...nowPlaying }
      newNowPlaying.array = withoutRemovedTrack;
      if (newNowPlaying.index >= newNowPlaying.array.length) {
        newNowPlaying.index = withoutRemovedTrack.length - 1;
      }
      setNowPlaying(newNowPlaying);
    }
    const updatedLibrary = [...library];
    updatedLibrary[playlistIndex][playlistName] = withoutRemovedTrack;
    setLibrary(updatedLibrary);
    document
      .getElementById(`resultMenuContent-${index}`)
      .classList.remove("resultMenuContent-hidden");
    notifyRemovedFromPlaylist();
  };

  const handleResultMenu = (index) => {
    document
      .getElementById(`resultMenuContent-${index}`)
      .classList.toggle("resultMenuContent-hidden");
    setCurrentIndexForEventListener(index)
  };

  const menuIcon = document.getElementById(`resultMenuIcon-${currentIndexForEventListener}`);
  if (menuIcon !== null && currentIndexForEventListener !== null) {
    const menuContent = document.getElementById(`resultMenuContent-${currentIndexForEventListener}`)
    const menuAddToPlaylist = document.getElementById(`resultMenuAddToPlaylist-${currentIndexForEventListener}`)
    const menuHr = document.getElementById(`hr-${currentIndexForEventListener}`)
    const menuNewPlaylist = document.getElementById(`resultMenuNewPlaylist-${currentIndexForEventListener}`);
    const menuRemove = document.getElementById(`resultMenuRemoveFromPlaylist-${currentIndexForEventListener}`)
    
    const menuNewPlaylistContent = document.getElementById(`resultMenuNewPlaylistContent-${currentIndexForEventListener}`)
    const input = document.getElementById(`newPlaylistNameInput-${currentIndexForEventListener}`)
    const button = document.getElementById(`newPlaylistNameInputButton-${currentIndexForEventListener}`)
    document.body.addEventListener("click", (event) => {
      if (currentIndexForEventListener !== "") {
        if (event.target !== menuRemove && event.target !== menuNewPlaylistContent && event.target !== input && event.target !== button && event.target !== menuNewPlaylist && event.target !== menuContent && event.target !== menuHr && event.target !== menuAddToPlaylist && event.target !== menuIcon) {
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

  const rename = document.getElementById(
    `playlistsPage-playlistRenameInputButton`
  );
  // const menuContent = document.getElementById(`resultMenuContent-${currentIndexForEventListener}`)

  if (rename !== null) {
      const renameContent = document.getElementById(
      "playlistsPage-Rename"
    );
    const renameInput = document.getElementById(
      "playlistsPage-playlistRenameInput"
    );
    const submitButton = document.getElementById(
      "playlistsPage-playlistSubmitButton"
    );

    document.body.addEventListener("click", (event) => {
        if (
          event.target !== rename &&
          event.target !== renameContent &&
          event.target !== renameInput &&
          event.target !== submitButton
        ) {
          if (renameContent !== null) {
            renameContent.classList.remove("eachPlaylistsPage-Rename-shown");
          }
        }
    });

    window.addEventListener("resize", () => {
      renameContent.classList.remove("eachPlaylistsPage-Rename-shown");
    });
  }

  return (
    <div className="eachPlaylistPage">
      <ToastContainer />
      <div className="eachPlaylistPage-header">
        <div className="eachPlaylist-title">
          <h1>{playlistName}</h1>
          <p className="eachPlaylist-length">
            {playlist.length} {playlist.length === 1 ? "track" : "tracks"}
          </p>
        </div>
        <button
          id={"playlistsPage-playlistRenameInputButton"}
          className="playlistsPage-playlistRenameInputButton"
          onClick={handleRenamePlaylistMenu}
        >
          rename
        </button>
        <div id={"playlistsPage-Rename"}>
          <input
            id={"playlistsPage-playlistRenameInput"}
            className="playlistsPage-playlistRenameInput"
            value={values.rename || ""}
            name="rename"
            onChange={handleInputChange}
            placeholder="Playlist Name"
          />
          <br />
          <button
            id={"playlistsPage-playlistSubmitButton"}
            className="playlistsPage-playlistSubmitButton"
            onClick={handleRenamePlaylist}
          >
            submit
          </button>
        </div>
        <button
          id="playlistsPage-playlistDeleteButton"
          onClick={handleDeletePlaylist}
        >
          delete
        </button>
      </div>
      <div className="searchResultsPage-legend">
        <div className="searchResultsPage-play">{""}</div>
        <div className="searchResultsPage-img">{""}</div>
        <p className="searchResultsPage-trackName">Title</p>
        <p className="searchResultsPage-trackArtist">Artist</p>
        <p className="searchResultsPage-trackDuration">Duration</p>
        <div className="searchResultsPage-options">{""}</div>
      </div>
      {playlist[playlistName].map((track, index) => (
        <div key={`eachplaylist-${index}`} className="result">
          <IconContext.Provider
            value={{ size: "30px", className: "resultPlayIcon" }}
          >
            <BsPlayFill onClick={() => handleSetNowPlaying(index)} />
          </IconContext.Provider>
          <img src={track.image} />
          <p>{track.title}</p>
          <p>{track.artist}</p>
          <p className="result-trackDuration">
            {moment
              .duration(track.duration, "seconds")
              .format("mm:ss", { trim: false })}
          </p>

          <div id="resultMenuContainer">
            <BsThreeDots
              id={`resultMenuIcon-${index}`}
              className="resultMenuIcon"
              onClick={() => handleResultMenu(index)}
            />
            <div id={`resultMenuContent-${index}`}>
              <button
                id={`resultMenuRemoveFromPlaylist-${index}`}
                className="resultMenuRemoveFromPlaylist"
                onClick={() => handleRemoveFromPlaylist(index)}
              >
                remove from playlist
              </button>
              <hr id={`hr-${index}`} />
              <p
                id={`resultMenuAddToPlaylist-${index}`}
                className="resultMenuAddToPlaylist"
              >
                add to playlist:
              </p>
              <button
                id={`resultMenuNewPlaylist-${index}`}
                onClick={() => handleResultMenuNewPlaylist(index)}
              >
                new playlist
              </button>
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
                  id={`newPlaylistNameInputButton-${index}`}
                  className="newPlaylistNameInputButton"
                  onClick={() => handleAddToNewPlaylist(track, index)}
                >
                  create
                </button>
              </div>
              <section id="newPlaylistButton">
                {library.map((existingPlaylist, i) => {
                  const name = Object.keys(existingPlaylist)[0];
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        handleAddToExistingPlaylist(
                          track,
                          i,
                          name,
                          existingPlaylist
                        )
                      }
                    >
                      {name}
                    </button>
                  );
                })}
              </section>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default EachPlaylist;
