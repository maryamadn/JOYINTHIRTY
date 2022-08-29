import { Link, Outlet } from "react-router-dom";

const Layout = ({ userDetails }) => {
  const handleRemoveWelcomeDiv = () => {
    document.getElementById("welcomeDiv").classList.add("hideWelcomeDiv");
    document.querySelector("body").classList.remove("hideOverflow");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

        <hr />

        <div id="nowPlaying">
          <h1>maximised</h1>
          <h1>NOW PLAYING</h1>
          <p>Track Name</p>
          <p>Artist</p>
          <p>track image</p>
          <p>control icons</p>
          <audio
            src={"https://listen.hs.llnwd.net/g3/prvw/9/2/8/0/7/2636470829.mp3"}
            autoPlay
            controls
          />
          <p>minimize button</p>
          <p>duration</p>
          <p>slider</p>
          <p>volume</p>

          <h1>minimised</h1>
          <p>track image</p>
          <p>Track Name</p>
          <p>Artist</p>
          <p>control icons</p>
          <audio src={""} autoPlay controls />
          <p>maximise button</p>
          <p>duration</p>
          <p>slider</p>
          <p>volume</p>
        </div>
      </div>
    </>
  );
};

export default Layout;
