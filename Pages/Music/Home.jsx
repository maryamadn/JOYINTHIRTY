import { Link } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import {RiPlayListFill} from 'react-icons/ri'
import { IconContext } from "react-icons";


const Home = () => {
  return (
    <>
      <div className="home">
        <Link to="/user/search" className="homeSearch">
          SEARCH
          <br />
          <IconContext.Provider value={{ size: "100px", className: 'homeIcons'}}>
            <IoMdSearch />
          </IconContext.Provider>
        </Link>
        <Link to="/user/stats" className="homeStats">
          STATS
          <br />
          <IconContext.Provider value={{ size: "100px", className: 'homeIcons'}}>
            <ImStatsBars />
          </IconContext.Provider>
        </Link>
        <Link to="/user/playlists" className="homePlaylists">
          PLAYLISTS
          <br />
          <IconContext.Provider value={{ size: "100px", className: 'homeIcons'}}>
            <RiPlayListFill />
          </IconContext.Provider>
        </Link>
      </div>
    </>
  );
};

export default Home;
