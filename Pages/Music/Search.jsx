import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
  const [nowPlaying, setNowPlaying] = useState("?");

  const [playlist, setPlaylist] = useState({});

  const [libary, setLibrary] = useState([]); //refers to group of playlists

  const APIKEY = "YjZhOGJkYzYtMmY3Zi00ZjgxLTg4NmUtYWZmNDljY2UzZjcy";
  const type = "track"; //diff categories of search gives diff. if not specified(dropdown) just get track?/all?
  
  const queryRef = useRef();
  
  
  const handleSearch = () => {
      const query = queryRef.current.value;
      const fetchSearch = `http://api.napster.com/v2.2/search?apikey=${APIKEY}&query=${query}&type=${type}&limit=10`;
    fetch(
      fetchSearch
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  // // useEffect(() => {
  // fetch(
  //   `https://api.napster.com/v2.2/search?apikey=${api_key}&query=${input}${type}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  // // }, [input])

  return (
    <>
      <input ref={queryRef} placeholder="search tracks or artists" />
      <button onClick={handleSearch}>search</button>
      <Outlet />
    </>
  );
};

export default Search;
