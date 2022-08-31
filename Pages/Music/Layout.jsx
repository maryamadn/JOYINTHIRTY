import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";

const Layout = ({ userDetails, nowPlaying }) => {
  const handleRemoveWelcomeDiv = () => {
    document.getElementById("welcomeDiv").classList.add("hideWelcomeDiv");
    document.querySelector("body").classList.remove("hideOverflow");
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

  return (
    <>
      <div id="welcomeDiv">
        <h1>WELCOME, {userDetails.username}!</h1>
        <button onClick={handleRemoveWelcomeDiv}>remove landing image</button>
      </div>

      <div id="header">
        <Link to="/user">
          <div>HOME</div>
        </Link>
        <Link to="/user/playlists">
          <div>PLAYLISTS</div>
        </Link>
        <Link to="/user/search">
          <div>SEARCH</div>
        </Link>
        <Link to="/user/stats">
          <div>STATS</div>
        </Link>

        <div id="dropdown">
          <p>img: user icon</p>
          <div className="dropdown-content">
            <Link to="/user/account">Account Info</Link>
            <Link to="/">Logout</Link>
          </div>
        </div>
      </div>

      <Outlet />

      <div id="footer">
        <img src="" alt="logo" />
        <h1>BRAND NAME</h1>
        <button onClick={handleScrollToTop}>scroll to top</button>

        <div id="nowPlaying">
          <p>Track Name</p>
          <p>Artist</p>
          <img src="" alt="result.image" />
          <p>00:00</p>
          <TbArrowsShuffle />
          <BsFillSkipStartFill />
          <BsPlayFill />
          <BsPauseFill />
          <BsFillSkipEndFill />
          <TbRepeatOnce />
          <BsFillVolumeUpFill />
          <input type="range" />
          <audio src={nowPlaying} controls />
          <p>00:30</p>
          <button onClick={handleNowPlayingSize}>
            {isMaximised ? "minimise" : "maximise"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Layout;

//HTMLMediaElement.duration
//HTMLMediaElement.ended
//HTMLMediaElement.loop (on repeat)
//HTMLMediaElement.muted (check if muted)
//HTMLMediaElement.paused
//HTMLMediaElement.played ---- Returns a TimeRanges object that contains the ranges of the media source that the browser has played, if any.
//HTMLMediaElement.src -- can be used to change the audio url?
//HTMLMediaElement.volume
//===================
//HTMLMediaElement.fastSeek() can skip to certain timings
//HTMLMediaElement.pause()
//HTMLMediaElement.play()
//===========events========
//canplay: ///possibly when this event happens: show loading image/// === Fired when the user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
//ended: Fired when playback stops when end of the media (<audio> or <video>) is reached or because no further data is available.
//error: Fired when the resource could not be loaded due to an error.
//pause: Fired when a request to pause play is handled and the activity has entered its paused state, most commonly occurring when the media's HTMLMediaElement.pause() method is called.
//play: Fired when the paused property is changed from true to false, as a result of the HTMLMediaElement.play() method, or the autoplay attribute.
//seeked:Fired when a seek operation completes.
//seeking: Fired when a seek operation begins.
//volumechange: Fired when the volume has changed.
//
//
//
//
//
