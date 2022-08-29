import { Link } from "react-router-dom";

const Home = ({ userDetails }) => {
  console.log(userDetails);
  console.log(localStorage);

  return (
    <>
      <div id="home">
        <Link to="/user/search">
          <div>SEARCH</div>
        </Link>
        <Link to="/user/stats">
          <div>STATS</div>
        </Link>
        <Link to="/user/playlists">
          <div>PLAYLISTS</div>
        </Link>
        <Link to="/user/search">
          <div>TOP TRACKS</div>
        </Link>
      </div>
    </>
  );
};

export default Home;
