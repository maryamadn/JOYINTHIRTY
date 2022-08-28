import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
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

      <div className="dropdown">
        <p>img: user icon</p>
        <div className="dropdown-content">
          <Link to="/user/account">Account Info</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>

      <Outlet />

      <img src="" alt="logo" />
      <h1>BRAND NAME</h1>
      <button>scroll to top</button>

      <hr />

      <div className="nowplaying">
        <h1>maximised</h1>
        <h1>NOW PLAYING</h1>
        <p>Track Name</p>
        <p>Artist</p>
        <p>track image</p>
        <p>control icons</p>
        <audio src={''} autoPlay controls />
        <p>minimize button</p>
        <p>duration</p>
        <p>slider</p>
        <p>volume</p>

        <h1>minimised</h1>
        <p>track image</p>
        <p>Track Name</p>
        <p>Artist</p>
        <p>control icons</p>
        <audio src={''} autoPlay controls />
        <p>maximise button</p>
        <p>duration</p>
        <p>slider</p>
        <p>volume</p>
      </div>
    </>
  );
};

export default Layout;
