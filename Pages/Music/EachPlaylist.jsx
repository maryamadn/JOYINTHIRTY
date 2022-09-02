import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";

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
    Object.values(library[playlistIndex])[0]
  );

  const handleSetNowPlaying = (index) => {
    const newNowPlaying = {};
    newNowPlaying.array = [...playlist];
    newNowPlaying.index = index;
    newNowPlaying.playlistIndex = playlistIndex;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    setNowPlaying(newNowPlaying);
  };

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
    if (values.rename === "" || values.rename === undefined) {
      console.log("alert tkle");
    } else if (values.rename === playlistName) {
      console.log("identical name entered");
    } else {
      console.log("renamed playlist");
      const updatedLibrary = [...library];
      updatedLibrary[playlistIndex][values.rename] =
        updatedLibrary[playlistIndex][playlistName];
      delete updatedLibrary[playlistIndex][playlistName];
      console.log(updatedLibrary);
      setLibrary(updatedLibrary);
      values.rename = ""; //reset input field
    }
  };

  const handleDeletePlaylist = () => {
    const updatedLibrary = [...library];
    updatedLibrary.splice(playlistIndex, 1);
    if (nowPlaying.playlistIndex === playlistIndex) {
      setNowPlaying({});
    }
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
    if (playlist[playlistName].indexOf(result) === -1) {
      //check if song alr in playlist
      const withAddedTrack = [...playlist[playlistName]];
      withAddedTrack.push(result);
      if (parseInt(playlistIndex) === index) {
        setPlaylist(withAddedTrack);
      }
      const newNowPlaying = nowPlaying;
      if (parseInt(newNowPlaying.playlistIndex) === index) {
        newNowPlaying.array = withAddedTrack;
        console.log(newNowPlaying);
        setNowPlaying(newNowPlaying);
      }

      const updatedLibrary = [...library];
      updatedLibrary[index][playlistName] = withAddedTrack;
      setLibrary(updatedLibrary);
      // alert('added to playlist')
      // document
      //   .getElementById(`dropdown-content-${index}`)
      //   .classList.toggle("dropdown-content");
    } else {
      console.log("track alr in playlist");
      //alert
    }
  };

  const handleRemoveFromPlaylist = (index) => {
    const withoutRemovedTrack = [...playlist];
    withoutRemovedTrack.splice(index, 1);
    setPlaylist(withoutRemovedTrack);
    if (nowPlaying.playlistIndex === playlistIndex) {
      const newNowPlaying = { ...nowPlaying };
      newNowPlaying.array = withoutRemovedTrack;
      if (newNowPlaying.index >= newNowPlaying.array.length) {
        console.log(withoutRemovedTrack);
        newNowPlaying.index = withoutRemovedTrack.length - 1;
      }
      setNowPlaying(newNowPlaying);
      console.log(newNowPlaying);
    }
    const updatedLibrary = [...library];
    updatedLibrary[playlistIndex][playlistName] = withoutRemovedTrack;
    setLibrary(updatedLibrary);
    document
      .getElementById(`dropdown-content-${index}`)
      .classList.toggle("dropdown-content");
    // alert("removed from playlist");
  };

  const handleResultMenu = (index) => {
    document
      .getElementById(`resultMenuContent-${index}`)
      .classList.toggle("resultMenuContent-hidden");
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
      <p>## hrs, ## mins</p>
      <div className='eachPlaylistPage-legend'>
      <p className="eachPlaylistPage-trackName">Track Name</p>
      <p className="eachPlaylistPage-trackArtist">Artist</p>
      <p className="eachPlaylistPage-trackDuration">Duration</p>
      </div>
      {playlist.map((track, index) => (
        <div key={`eachplaylist-${index}`} className='playlist'>
          <IconContext.Provider value={{ size: "30px", className: "resultPlayIcon" }}>
          <BsPlayFill onClick={() => handleSetNowPlaying(index)} />
          </IconContext.Provider>
          <img src={track.image}/>
          <p>{track.title}</p>
          <p>{track.artist}</p>
          <p>{track.duration}</p>

          <div id="resultMenuContainer">
          <BsThreeDots
              className="resultMenuIcon"
              onClick={() => handleResultMenu(index)}
            />
            <div id={`resultMenuContent-${index}`}>
              {/* <div id="newPlaylistButton"> */}
              <section >new playlist</section>
                <input
                  id="newPlaylistNameInput"
                  value={values[index] || ""}
                  name={index}
                  onChange={handleInputChange}
                  placeholder="Playlist Name"
                />
                <section
                  id="newPlaylistNameInputButton"
                  onClick={() => handleAddToNewPlaylist(track, index)}
                >
                  create
                </section>
              {/* </div> */}
              <section id="newPlaylistButton">
                {library.map((playlist, index) => {
                  const playlistName = Object.keys(playlist)[0];
                  return (
                    <section
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
                    </section>
                  );
                })}
              </section>
              <div id="newPlaylistButton">
                <button onClick={() => handleRemoveFromPlaylist(index)}>
                  remove from playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EachPlaylist;
