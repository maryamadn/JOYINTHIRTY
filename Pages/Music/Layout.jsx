import { useRef, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsThreeDots
} from "react-icons/bs";
import {AiOutlinePlusSquare, AiOutlineMinusSquare,} from 'react-icons/ai'
import { TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { IconContext } from "react-icons";

const Layout = ({
  userDetails,
  library,
  nowPlaying,
  setNowPlaying,
  isPlaying,
  setIsPlaying,
}) => {

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

  const handleHideWelcome = () => {
    document.getElementById("welcome").classList.add("hideWelcome");
    document.querySelector("body").classList.remove("hideOverflow");
  };

  const handleHeaderDropdown = () => {
    document
      .getElementById("headerDropdownContent")
      .classList.toggle("headerDropdownContent");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [isMaximised, setIsMaximised] = useState(false);

  const handleNowPlayingSize = () => {
    document.querySelector("body").classList.toggle("hideOverflow");
    document.getElementById("nowPlaying").classList.toggle("maximised");
    setIsMaximised(!isMaximised);
  };

  // for audioplayer
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooped, setIsLooped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isMuted, setIsMuted] = useState({ muted: false, prevVolume: 0 });

  // references to certain components
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar = useRef();

  // updating progressBar everytime current time of audio changes
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration); //get rid of decimals (round down)
    setDuration(seconds);
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
      setIsPlaying(!prevValue); //updates state
      if (!prevValue) {
        audioPlayer.current.play(); //if true, plays audio and update animation for progressBar
        // animationRef.current = requestAnimationFrame(whilePlaying)
      } else {
        audioPlayer.current.pause(); //if false, pauses audio and cancel animation for progressBar
        // cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const changePlayerCurrentTime = () => {
    //updates style (width) of the left side of progressBar (before slider)
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value); //updates state
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
      audioPlayer.current.currentTime = audioPlayer.current.duration;
    }
    audioPlayer.current.loop = false;
    setIsLooped(false); //updates state
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
    setIsLooped(false); //updates state
    changePlayerCurrentTime();
  };

  const handleRepeatCurrentTrack = () => {
    const prevValue = isLooped;
    if (!prevValue) {
      audioPlayer.current.loop = true;
    } else {
      audioPlayer.current.loop = false;
    }
    setIsLooped(!prevValue); //updates state
  };

  const handleShuffle = () => {
    //The Fisher-Yates algorith
    const prevValue = isShuffled;
    const newNowPlaying = nowPlaying;
    if (!prevValue) {
      const shuffledArray = [...newNowPlaying?.array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        //for each element in array
        const j = Math.floor(Math.random() * (i + 1)); //generate random number
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j]; //swap element in array with a random element in array
        shuffledArray[j] = temp; //swap
      }
      newNowPlaying.array = shuffledArray;
    } else {
      const originalArray = Object.values(
        library[nowPlaying?.playlistIndex]
      )[0];
      newNowPlaying.array = originalArray; //back to original array
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
    setIsMuted(volDetails); //updates state
  };

  return (
    <>
      <div id="welcome">
        <h1>
          WELCOME
          <br />
          {userDetails.username}!
        </h1>
        <button onClick={handleHideWelcome}>remove landing image</button>
      </div>

      <div id="header">
        <Link to="/user" className="headerLinks">
          HOME
        </Link>
        <Link to="/user/playlists" className="headerLinks">
          PLAYLISTS
        </Link>
        <Link to="/user/search" className="headerLinks">
          SEARCH
        </Link>
        <Link to="/user/stats" className="headerLinks">
          STATS
        </Link>

        <div className="headerDropdown">
          <IconContext.Provider value={{ size: "4vw", className: "menu" }}>
            <BsThreeDots onClick={handleHeaderDropdown} />
          </IconContext.Provider>
          <div id="headerDropdownContent" className="headerDropdownContent">
            <Link to="/user/account" className="menuOptions menuOption1">
              Account
            </Link>
            <br />
            <Link
              to="/"
              className="menuOptions menuOption2"
              onClick={() => setNowPlaying([])}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      <Outlet />

      <div id="nowPlaying">
        <audio
          ref={audioPlayer}
          src={nowPlaying?.array?.[nowPlaying.index]?.url}
          volume={0.5}
          autoPlay
          loop={nowPlaying?.array?.length === 1}
        />
        <div className="nowPlayingCol1">
          {
            <img
              className="trackImage"
              src={
                nowPlaying?.array?.[nowPlaying.index]?.image ||
                "default grey pic"
              }
              width="50px"
            />
          }
          <p className="trackArtist">
            {nowPlaying?.array?.[nowPlaying.index]?.artist}
          </p>
          <p className="trackName">
            {nowPlaying?.array?.[nowPlaying.index]?.title ||
              "No Track Selected"}
          </p>
        </div>

        <div className="nowPlayingCol2">
          <div className="controls">
            <IconContext.Provider value={{ size: "30px", className: "controls" }}>
              <TbArrowsShuffle onClick={handleShuffle} className="shuffle" />

              {/* 1) if currentime is more than 3 seconds, change currenttime to 0 (play song from start)
          2) else, if its first song in playlist, go to prev url. if first song, go to last song*/}
              <BsFillSkipStartFill
                onClick={handleSkipStart}
                className="skipStart"
              />

              {isPlaying ? (
                <BsPauseFill onClick={togglePlayPause} className="pause" />
              ) : (
                <BsPlayFill onClick={togglePlayPause} className="play" />
              )}

              {/* onclick: //currentime=max/duration// >>>> 1) if not last song in playlist, go to next url. if last song, go to first song*/}
              <BsFillSkipEndFill onClick={handleSkipEnd} className="skipEnd" />

              {/* onclick 1) toggle such that repeats/does not repeat current track. default repeat for playlists (even with one song inside)*/}
              <TbRepeatOnce
                onClick={handleRepeatCurrentTrack}
                className="repeat"
              />
            </IconContext.Provider>
          </div>

          {/* current time */}
          <p className="time1">{calculateTime(currentTime) || "00:00"}</p>

          {/* progress bar */}
          <input
            className="progressBar"
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />

          {/* total duration */}
          <p className="time2">
            {(duration && !isNaN(duration) && calculateTime(duration)) ||
              "00:00"}
          </p>
        </div>

        <div className="nowPlayingCol3">
          {isMaximised ? (
            ""
          ) : (
            <button onClick={handleScrollToTop} className="scroll">
              scroll to top
            </button>
          )}
            <IconContext.Provider value={{ size: "30px", className: "volume" }}>

          {/* onclick: 1) mute - audioPlayer.volume = 0 (0-1) 2) create progressbar, same concept*/}
          {isMuted.muted ? (
            <BsFillVolumeMuteFill onClick={handleMute} className="mute" />
            ) : (
              <BsFillVolumeUpFill onClick={handleMute} className="volume" />
              )}
              </IconContext.Provider>
          <input
            className="volumeBar"
            type="range"
            defaultValue="100"
            ref={volumeBar}
            onChange={changeRangeVolume}
          />

          {/* maximise/minimise */}
          <IconContext.Provider value={{ size: "30px", className: "minMax" }}>
            {isMaximised ? <AiOutlineMinusSquare onClick={handleNowPlayingSize}/> : <AiOutlinePlusSquare onClick={handleNowPlayingSize} />}
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};

export default Layout;
