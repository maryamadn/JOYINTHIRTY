import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPw from "../Pages/Account/ForgotPw";
import SignIn from "../Pages/Account/SignIn";
import SignUp from "../Pages/Account/SignUp";
import Start from "../Pages/Account/Start";
import Layout from "../Pages/Music/Layout";
import Home from "../Pages/Music/Home";
import Playlists from "../Pages/Music/Playlists";
import EachPlaylist from "../Pages/Music/EachPlaylist";
import Search from "../Pages/Music/Search";
import SearchDefault from "../Pages/Music/SearchDefault";
import SearchResults from "../Pages/Music/SearchResults";
import Stats from "../Pages/Music/Stats";
import Account from "../Pages/Music/Account";

function App() {
  const [userDetails, setUserDetails] = useState({});

  // localStorage.clear();
  console.log(localStorage);
  console.log(userDetails);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}>
            <Route
              index
              element={
                <SignIn
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setUserDetails={setUserDetails} />}
            />
            <Route path="/forgotpw" element={<ForgotPw />} />
          </Route>
          <Route path="/user" element={<Layout userDetails={userDetails} />}>
            <Route index element={<Home userDetails={userDetails} />} />
            <Route path="/user/playlists" element={<Playlists />}>
              <Route
                path={`/user/playlists/playlistname`}
                element={<EachPlaylist />}
              />
            </Route>
            <Route path="/user/search" element={<Search />}>
              <Route index element={<SearchDefault />} />
              <Route path="/user/search/results" element={<SearchResults />} />
            </Route>
            <Route path="/user/stats" element={<Stats />} />
            <Route path="/user/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
