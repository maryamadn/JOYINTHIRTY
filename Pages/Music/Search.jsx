import { useRef, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Search = ({ setResults }) => {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState("?");

  // const [playlist, setPlaylist] = useState([]);

  const [libary, setLibrary] = useState([]); //refers to group of playlists

  const APIKEY = "YjZhOGJkYzYtMmY3Zi00ZjgxLTg4NmUtYWZmNDljY2UzZjcy";
  // const APIKEY = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
  const type = "track"; //diff categories of search gives diff. if not specified(dropdown) just get track?/all?

  const queryRef = useRef();

  const handleSearch = () => {
    const query = queryRef.current.value;
    const fetchSearch = `http://api.napster.com/v2.2/search/verbose?apikey=${APIKEY}&query=${query}&type=${type}&per_type_limit=200`;
    fetch(fetchSearch)
      .then((response) => response.json())
      .then((data) => {
        const a = [];
        console.log(data);
        data.search.data.tracks.map((track) => {
          const result = {};
          result["title"] = track.name;
          result["artist"] = track.artistName;
          result["url"] = track.previewURL;
          result["duration"] = track.playbackSeconds;
          result[
            "image"
          ] = `https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/500x500.jpg`;

          // console.log(result);
          if (a.length === 0) {
            a.push(result);
          } else {
            let isSame = false;
            for (let i = 0; i < a.length; i++) {
              if (
                a[i].track === result.track &&
                a[i].artist === result.artist
              ) {
                isSame = true;
              }
            }
            if (!isSame) {
              a.push(result);
            }
          }
        });
        console.log(a);
        setResults(a);
      });
    navigate("/user/search/results");
  };

  // // useEffect(() => {
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
