import { useRef, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineUpSquare,
} from "react-icons/ai";
import { TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";

const Layout = ({
  userDetails,
  library,
  nowPlaying,
  setNowPlaying,
  isPlaying,
  setIsPlaying,
  isShuffled,
  setIsShuffled,
  isLooped,
  setIsLooped,
}) => {
  const handleHideWelcome = () => {
    document.getElementById("welcome").classList.add("hideWelcome");
    document.querySelector("body").classList.remove("hideOverflow");
  };

  const handleHeaderDropdown = () => {
    document
      .getElementById("headerDropdownContent")
      .classList.toggle("headerDropdownContent");
  };

  const openCollapsedHeader = () => {
    document
      .getElementById("collapsedHeader")
      .classList.toggle("collapsedHeader");
  };

  document.body.addEventListener("click", (event) => {
    const headerDropdown = document.getElementById("menu");
    const headerHamburger = document.getElementById("headerHamburger");
    if (event.target !== headerHamburger && event.target !== headerDropdown) {
      document
        .getElementById("headerDropdownContent")
        .classList.add("headerDropdownContent");
      document
        .getElementById("collapsedHeader")
        .classList.remove("collapsedHeader");
    }
  });

  window.addEventListener("resize", () => {
    document
      .getElementById("headerDropdownContent")
      .classList.add("headerDropdownContent");
    document
      .getElementById("collapsedHeader")
      .classList.remove("collapsedHeader");
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [isMaximised, setIsMaximised] = useState(false);

  const handleNowPlayingSize = () => {
    document.querySelector("body").classList.toggle("hideOverflow");
    document.getElementById("nowPlaying").classList.toggle("maximised");
    document
      .getElementById("nowPlayingCol1")
      .classList.toggle("nowPlayingCol1Max");
    document.getElementById("trackImage").classList.toggle("trackImageMax");
    document.getElementById("trackTitle").classList.toggle("trackTitleMax");
    document.getElementById("trackArtist").classList.toggle("trackArtistMax");
    document.getElementById("duration").classList.toggle("durationMax");
    document
      .getElementById("nowPlayingCol2")
      .classList.toggle("nowPlayingCol2Max");
    document.getElementById("minMax").classList.toggle("minMaxMax");
    document.getElementById("shuffle").classList.toggle("shuffleMax");
    document.getElementById("repeat").classList.toggle("repeatMax");
    document.getElementById("volume").classList.toggle("volumeMax");
    document.getElementById("time1").classList.toggle("time1Max");
    document.getElementById("time2").classList.toggle("time2Max");
    document.getElementById("volumeBar").classList.toggle("volumeBarMax");
    document.getElementById("skipStart").classList.toggle("skipStartMax");
    document.getElementById("skipEnd").classList.toggle("skipEndMax");
    setIsMaximised(!isMaximised);
  };

  // for audioplayer
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState({ muted: false, prevVolume: 0 });
  const [resultsUnshuffled, setResultsUnshuffled] = useState([]);

  // references to certain components
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar = useRef();

  // set default volume to 0.5
  useEffect(() => {
    audioPlayer.current.volume = 0.5;
  }, []);

  // updating progressBar everytime current time of audio changes
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration); //get rid of decimals (round down)
    progressBar.current.max = seconds; //states that the max of progress bar is .. seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); //occurs when audio has loaded and is ready?

  // convert playback seconds to ##:## time format
  const calculateTime = (seconds) => {
    const mins = Math.floor(seconds / 60); // convert seconds to mins
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`; //format minutes to ## or 0#
    const secs = Math.floor(seconds % 60); // calculate remaining seconds
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`; //format seconds to ## or 0#
    return `${formattedMins}:${formattedSecs}`;
  };

  // toggling between play and pause
  const togglePlayPause = () => {
    if (audioPlayer.current.src !== "") {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        audioPlayer.current.play(); //if true, plays audio and update animation for progressBar
      } else {
        audioPlayer.current.pause(); //if false, pauses audio and cancel animation for progressBar
      }
    }
  };

  const changePlayerCurrentTime = () => {
    //updates style (width) of the left side of progressBar (before slider)
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${
        (progressBar.current.value / Math.floor(audioPlayer.current.duration)) *
        100
      }%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const whilePlaying = () => {
    if (progressBar.current) {
      progressBar.current.value = audioPlayer?.current?.currentTime; //updates the progressBar to match audio's current time
      changePlayerCurrentTime(); //updates style of progressBar
      animationRef.current = requestAnimationFrame(whilePlaying); //constantly updates animation
    }
  };

  const changeRange = () => {
    //updates the audio's current to following progressBar when users seek own time
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime(); //updates style of progressBar
  };

  useEffect(() => {
    audioPlayer.current.addEventListener("error", (event) => {
      console.log(event.target.error);
    });
    audioPlayer.current.addEventListener("ended", () => {
      if (nowPlaying.index === nowPlaying?.array?.length - 1) {
        const newIndex = 0;
        const newNowPlaying = { ...nowPlaying };
        newNowPlaying.index = newIndex;
        setNowPlaying(newNowPlaying);
      } else {
        const newNowPlaying = { ...nowPlaying };
        newNowPlaying.index = newNowPlaying.index + 1;
        setNowPlaying(newNowPlaying);
      }
    });
    audioPlayer.current.addEventListener("playing", () => {
      animationRef.current = requestAnimationFrame(whilePlaying);
    });
    audioPlayer.current.addEventListener("pause", () => {
      cancelAnimationFrame(animationRef.current);
    });
    if (Object.keys(nowPlaying).length === 0) {
      audioPlayer.current.pause();
    }
  }, [nowPlaying]);

  const handleSkipEnd = () => {
    if (nowPlaying?.array?.length === 1) {
      audioPlayer.current.currentTime = 0;
    } else {
      if (nowPlaying.index === nowPlaying?.array?.length - 1) {
        const newIndex = 0;
        const newNowPlaying = { ...nowPlaying };
        newNowPlaying.index = newIndex;
        setNowPlaying(newNowPlaying);
      } else {
        const newNowPlaying = { ...nowPlaying };
        newNowPlaying.index = newNowPlaying.index + 1;
        setNowPlaying(newNowPlaying);
      }
    }
    audioPlayer.current.loop = false;
    setIsLooped(false);
    document.getElementById("repeat").classList.remove("isRepeating");
    changePlayerCurrentTime();
  };

  const handleSkipStart = () => {
    if (audioPlayer.current.currentTime > 3) {
      audioPlayer.current.currentTime = 0;
    } else {
      if (nowPlaying?.array?.length === 1) {
        audioPlayer.current.currentTime = 0;
      } else {
        let newIndex;
        if (nowPlaying.index === 0) {
          newIndex = nowPlaying.array.length - 1;
        } else {
          newIndex = nowPlaying.index - 1;
        }
        const newNowPlaying = { ...nowPlaying };
        newNowPlaying.index = newIndex;
        setNowPlaying(newNowPlaying);
      }
    }
    audioPlayer.current.loop = false;
    setIsLooped(false);
    document.getElementById("repeat").classList.remove("isRepeating");
    changePlayerCurrentTime();
  };

  const handleRepeatCurrentTrack = () => {
    const prevValue = isLooped;
    if (!prevValue) {
      audioPlayer.current.loop = true;
      document.getElementById("repeat").classList.add("isRepeating");
    } else {
      audioPlayer.current.loop = false;
      document.getElementById("repeat").classList.remove("isRepeating");
    }
    setIsLooped(!prevValue);
  };

  const handleShuffle = () => {
    //The Fisher-Yates algorith
    console.log(nowPlaying);
    const prevValue = isShuffled;
    const newNowPlaying = nowPlaying;
    if (!prevValue) {
      if (nowPlaying?.playlistIndex === "searchResultPlaylist") {
        setResultsUnshuffled(newNowPlaying?.array);
      }
      const shuffledArray = [...newNowPlaying?.array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        //for each element in array
        const j = Math.floor(Math.random() * (i + 1)); //generate random number
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j]; //swap element in array with a random element in array
        shuffledArray[j] = temp; //swap
      }
      newNowPlaying.index = shuffledArray.indexOf(
        nowPlaying.array[nowPlaying.index]
      );
      newNowPlaying.array = shuffledArray;
      document.getElementById("shuffle").classList.add("isShuffling");
    } else {
      let originalArray = [];
      if (nowPlaying?.playlistIndex === "searchResultPlaylist") {
        originalArray = resultsUnshuffled;
      } else {
        originalArray = Object.values(library[nowPlaying?.playlistIndex])[0];
      }
      newNowPlaying.index = originalArray.indexOf(
        nowPlaying.array[nowPlaying.index]
      );
      newNowPlaying.array = originalArray; //back to original array
      document.getElementById("shuffle").classList.remove("isShuffling");
    }
    setNowPlaying(newNowPlaying);
    setIsShuffled(!prevValue);
  };

  const changeRangeVolume = () => {
    //updates the audio's current volume to following volumeBar when users seek own volume
    audioPlayer.current.volume = volumeBar.current.value / 100;
    changePlayerCurrentVolume(); //updates style of progressBar
  };

  const changePlayerCurrentVolume = () => {
    //updates style (width) of the left side of volumeBar (before slider)
    volumeBar.current.style.setProperty(
      "--seek-before-width",
      `${(volumeBar.current.value / 100) * 100}%`
    );
  };

  // {muted: false, prevVolume: 0}
  const handleMute = () => {
    const prevValue = isMuted.muted;
    const volDetails = { ...isMuted };
    if (!prevValue) {
      volDetails.prevVolume = audioPlayer.current.volume;
      audioPlayer.current.volume = 0;
      volumeBar.current.value = 0;
    } else {
      audioPlayer.current.volume = volDetails.prevVolume;
      volumeBar.current.value = volDetails.prevVolume * 100;
    }
    volDetails.muted = !prevValue;
    setIsMuted(volDetails);
  };

  return (
    <div>
      <div id="welcome">
        <h1>
          WELCOME
          <br />
          {userDetails.username}!
        </h1>
        <button onClick={handleHideWelcome}>letsgoo</button>
      </div>

      <div id="header">
        <Link to="/user" className="brandHeader">
          JOY IN THIRTY
        </Link>
        <IconContext.Provider
          value={{ size: "30px", className: "headerHamburger" }}
        >
          <HiOutlineMenu onClick={openCollapsedHeader} id="headerHamburger" />
        </IconContext.Provider>
        <div id="collapsedHeader">
          <Link to="/user" className="headerLinks">
            HOME
          </Link>
          <Link to="/user/playlists" className="headerLinks">
            PLAYLISTS
          </Link>
          <Link to="/user/search" className="headerLinks">
            SEARCH
          </Link>

          <div className="headerDropdown">
            <p id="menu" className="menu" onClick={handleHeaderDropdown}>
              ACCOUNT
            </p>
            <div id="headerDropdownContent" className="headerDropdownContent">
              <Link to="/user/settings" className="menuOptions">
                SETTINGS
              </Link>
              <br />
              <br />
              <Link
                to="/"
                className="menuOptions"
                onClick={() => {
                  setNowPlaying([]);
                  document.body.removeEventListener("click");
                }}
              >
                LOGOUT
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="outlet">
        <Outlet />
      </div>

      <div id="nowPlaying">
        <audio
          ref={audioPlayer}
          src={nowPlaying?.array?.[nowPlaying.index]?.url}
          autoPlay
          loop={nowPlaying?.array?.length === 1}
        />
        <div id="nowPlayingCol1">
          <img
            id="trackImage"
            src={nowPlaying?.array?.[nowPlaying.index]?.image}
            width="50px"
          />
          <div>
            <p id="trackTitle">
              {nowPlaying?.array?.[nowPlaying.index]?.title ||
                "No Track Selected"}
            </p>
            <p id="trackArtist">
              {nowPlaying?.array?.[nowPlaying.index]?.artist}
            </p>
          </div>
        </div>

        <div id="nowPlayingCol2">
          <div id="controls">
            <IconContext.Provider value={{ size: "30px" }}>
              <TbArrowsShuffle onClick={handleShuffle} id="shuffle" />

              {/* 1) if currentime is more than 3 seconds, change currenttime to 0 (play song from start)
          2) else, if its first song in playlist, go to prev url. if first song, go to last song*/}
              <BsFillSkipStartFill onClick={handleSkipStart} id="skipStart" />

              {isPlaying ? (
                <BsPauseFill onClick={togglePlayPause} className="pause" />
              ) : (
                <BsPlayFill onClick={togglePlayPause} className="play" />
              )}

              {/* onclick: //currentime=max/duration// >>>> 1) if not last song in playlist, go to next url. if last song, go to first song*/}
              <BsFillSkipEndFill onClick={handleSkipEnd} id="skipEnd" />

              {/* onclick 1) toggle such that repeats/does not repeat current track. default repeat for playlists (even with one song inside)*/}
              <TbRepeatOnce onClick={handleRepeatCurrentTrack} id="repeat" />
            </IconContext.Provider>
          </div>

          <div id="duration">
            {/* current time */}
            <p id="time1">{calculateTime(currentTime) || "00:00"}</p>

            {/* progress bar */}
            {nowPlaying?.array ? (
              <input
                id="progressBar"
                type="range"
                defaultValue="0"
                ref={progressBar}
                onChange={changeRange}
              />
            ) : (
              <input
                id="progressBar"
                className="progressBarDisabled"
                type="range"
                disabled
                defaultValue="0"
                ref={progressBar}
                onChange={changeRange}
              />
            )}

            {/* total duration */}
            <p id="time2">
              {(Math.floor(audioPlayer?.current?.duration) &&
                !isNaN(Math.floor(audioPlayer?.current?.duration)) &&
                calculateTime(Math.floor(audioPlayer?.current?.duration))) ||
                "00:00"}
            </p>
          </div>
        </div>

        <div id="nowPlayingCol3">
          {isMaximised ? (
            ""
          ) : (
            <div id="scroll">
              <p>scroll to top</p>
              <IconContext.Provider
                value={{ size: "20px", className: "scrollIcon" }}
              >
                <AiOutlineUpSquare onClick={handleScrollToTop} />
              </IconContext.Provider>
            </div>
          )}

          <IconContext.Provider value={{ size: "20px", className: "volume" }}>
            {/* onclick: 1) mute - audioPlayer.volume = 0 (0-1) 2) create progressbar, same concept*/}
            {isMuted.muted ? (
              <BsFillVolumeMuteFill onClick={handleMute} className="mute" />
            ) : (
              <BsFillVolumeUpFill onClick={handleMute} id="volume" />
            )}
          </IconContext.Provider>
          <input
            id="volumeBar"
            type="range"
            defaultValue="50"
            ref={volumeBar}
            onChange={changeRangeVolume}
          />

          <div id="minMax">
            {isMaximised ? <p>minimise</p> : <p>maximise</p>}
            <IconContext.Provider
              value={{ size: "20px", className: "minMaxIcon" }}
            >
              {isMaximised ? (
                <AiOutlineMinusSquare onClick={handleNowPlayingSize} />
              ) : (
                <AiOutlinePlusSquare onClick={handleNowPlayingSize} />
              )}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
