import {Link} from 'react-router-dom'

const EachPlaylist = () => {
  return (
    <>
      <h1>Playlist name</h1>
      <h2>## tracks</h2>
      <h2>## hrs, ## mins</h2>

      <div class="dropdown">
        <p>3 dots</p>
        <div class="dropdown-content">
          <p>edit playlist name</p>
          <Link to="/playlists">
            <p>delete playlist</p>
          </Link>
        </div>
      </div>

      <h3>Track Name</h3>
      <h3>Artist</h3>
      <h3>Duration</h3>
      <div>
        <img src="" alt="track image" />
        <p>track name</p>
        <p>artist</p>
        <p>00:30</p>
        <div class="dropdown">
          <p>3 dots</p>
          <div class="dropdown-content">
            <p>remove from playlist</p>
            <p>add to other/new playlist</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachPlaylist