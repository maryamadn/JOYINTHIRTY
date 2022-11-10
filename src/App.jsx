import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Pages/Account/SignIn";
import SignUp from "../Pages/Account/SignUp";
import Start from "../Pages/Account/Start";
import Layout from "../Pages/Music/Layout";
import Home from "../Pages/Music/Home";
import Playlists from "../Pages/Music/Playlists";
import EachPlaylist from "../Pages/Music/EachPlaylist";
import Search from "../Pages/Music/Search";
import SearchResults from "../Pages/Music/SearchResults";
import Stats from "../Pages/Music/Stats";
import Settings from "../Pages/Music/Settings";

function App() {
  const [userDetails, setUserDetails] = useState({});

  const [library, setLibrary] = useState([]);

  const [nowPlaying, setNowPlaying] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const [results, setResults] = useState([]);

  // localStorage.clear();
  // console.log(localStorage);
  // console.log(library)

  useEffect(() => {
    if (Object.keys(userDetails).length !== 0) {
      const updatedUserDetails = {...userDetails}
      updatedUserDetails.library = library
      localStorage.setItem(updatedUserDetails.username, JSON.stringify(updatedUserDetails))
    }
    }, [library])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}>
            <Route
              index
              element={
                <SignIn
                  setUserDetails={setUserDetails}
                  setLibrary={setLibrary}
                />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setUserDetails={setUserDetails} setLibrary={setLibrary} />}
            />
          </Route>
          <Route
            path="/user"
            element={
              <Layout
                userDetails={userDetails}
                library={library}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/user/playlists"
              element={<Playlists library={library} setLibrary={setLibrary} />}
            />
            <Route
              path={"/user/eachplaylist/:playlistIndex"}
              element={
                <EachPlaylist
                  library={library}
                  setLibrary={setLibrary}
                  nowPlaying={nowPlaying}
                  setNowPlaying={setNowPlaying}
                  setIsPlaying={setIsPlaying}
                  isPlaying={isPlaying}
                />
              }
            />
            <Route
              path="/user/search"
              element={<Search setResults={setResults} />}
            >
              <Route
                path="/user/search/results"
                element={
                  <SearchResults
                    results={results}
                    library={library}
                    setLibrary={setLibrary}
                    nowPlaying={nowPlaying}
                    setNowPlaying={setNowPlaying}
                    setIsPlaying={setIsPlaying}
                    isPlaying={isPlaying}
                  />
                }
              />
            </Route>
            <Route path="/user/stats" element={<Stats />} />
            <Route path="/user/settings" element={<Settings userDetails={userDetails} setUserDetails={setUserDetails}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
