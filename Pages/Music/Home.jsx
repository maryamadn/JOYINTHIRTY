import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <Link to="/user/search" className="homeSearch">SEARCH</Link>
        <Link to="/user/stats" className="homeStats">STATS</Link>
        <Link to="/user/playlists" className="homePlaylists">PLAYLISTS</Link>
        <Link to="/user/search" className="homeTopTracks">TOP TRACKS</Link>
      </div>
    </>
  );
};

export default Home;
