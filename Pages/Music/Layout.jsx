import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = ({ userDetails }) => {
  const handleRemoveWelcomeDiv = () => {
    document.getElementById("welcomeDiv").classList.add("hideWelcomeDiv");
    document.querySelector("body").classList.remove("hideOverflow");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };


  const [isMaximised, setIsMaximised] = useState(false)

  const handleNowPlayingSize = () => {
      document.querySelector("body").classList.toggle("hideOverflow");
      document.getElementById('nowPlaying').classList.toggle('maximised')
      // document.getElementById('nowPlaying').classList.add('minimised')
    setIsMaximised(!isMaximised)
  }

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
          <p>track image</p>
          <p>control icons</p>
          <audio
            src={"https://listen.hs.llnwd.net/g3/prvw/9/2/8/0/7/2636470829.mp3"}
            controls
          />
          <p>duration</p>
          <p>slider</p>
          <p>volume</p>
          <button onClick={handleNowPlayingSize}>{isMaximised ? 'minimise' : 'maximise'}</button>

        </div>
      </div>
    </>
  );
};

export default Layout;
